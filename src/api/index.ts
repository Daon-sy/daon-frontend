import axios, { InternalAxiosRequestConfig } from "axios"
import { API_SERVER_URL } from "env"
import { useTokenStore } from "store/tokenStore"

export const basicAxios = axios.create({
  baseURL: `${API_SERVER_URL}`,
  headers: {
    "Content-type": "application/json",
  },
})

export const authAxios = axios.create({
  baseURL: `${API_SERVER_URL}`,
  headers: {
    "Content-type": "application/json",
  },
})

// 요청 인터셉터: 인증 헤더 자동 설정
authAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { headers } = config
    const { token } = useTokenStore()

    if (token) {
      // TODO Bearer Token
      headers.Authorization = `${token}`
      // TODO 토큰 없을 경우 재발급 진행
    }

    return config
  },
  err => {
    console.error(err)

    return Promise.reject(err)
  },
)

// 응답 인터셉터: 응답에 따른 callback 처리
authAxios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    console.error(err)
    if (err.response.status === 401) {
      // TODO 401: 인증되지 않은 사용자 -> 토큰 재발급 시도
    }
  },
)

export default { basicAxios, authAxios }
