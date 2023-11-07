import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/getTokenStore"
import mem from "mem"

export interface ApiResponse<T = object> {
  data: T
  message: string
}

export const basicAxios = axios.create({
  baseURL: `${API_SERVER_URL}`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
})

export const authAxios = axios.create({
  baseURL: `${API_SERVER_URL}`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
})

const BEARER_TYPE = "Bearer "

const reissue = mem(
  async (config: InternalAxiosRequestConfig) => {
    const { headers: confHeaders } = config

    return basicAxios.post("/api/auth/reissue").then((res: AxiosResponse) => {
      const { headers } = res
      const authHeader: string = headers.authorization
      if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
        const accessToken = authHeader.substring(BEARER_TYPE.length)
        getTokenStore.getState().setToken(accessToken)
        confHeaders.Authorization = `Bearer ${accessToken}`
      }

      // 재발급 성공시 기존 요청 재호출
      return basicAxios.request(config)
    })
  },
  { maxAge: 1000 },
)

basicAxios.interceptors.response.use((res: AxiosResponse) => {
  // 인증 헤더에 토큰이 있으면 꺼내서 store에 저장
  const authHeader: string = res.headers.authorization
  if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
    const accessToken = authHeader.substring(BEARER_TYPE.length)
    getTokenStore.getState().setToken(accessToken)
  }

  return res
})

// 요청 인터셉터: 인증 헤더 자동 설정
authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { headers } = config
  if (getTokenStore.getState().token) {
    headers.Authorization = `Bearer ${getTokenStore.getState().token}`
  }

  return config
})

// 응답 인터셉터: 응답에 따른 callback 처리
authAxios.interceptors.response.use(
  (res: AxiosResponse) => {
    // 인증 헤더에 토큰이 있으면 꺼내서 store에 저장
    const authHeader: string = res.headers.authorization
    if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
      const accessToken = authHeader.substring(BEARER_TYPE.length)
      getTokenStore.getState().setToken(accessToken)
    }

    return res
  },
  err => {
    if (axios.isAxiosError<ApiResponse>(err) && err.response) {
      if (err.response.status === 401) {
        const { config } = err
        // 401: 인증되지 않은 사용자 -> 토큰 재발급 시도
        if (config) return reissue(config)
      }
    }

    return Promise.reject(err)
  },
)

export default { basicAxios, authAxios }
