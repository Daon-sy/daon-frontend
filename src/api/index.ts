import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/tokenStore"

export interface ErrorResponse {
  errorCode: number
  errorDescription: string
}

export interface SliceResponse<T> {
  first: boolean
  last: boolean
  pageSize: number
  pageNumber: number
  contentSize: number
  totalPage: number
  content: Array<T>
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
// authAxios.interceptors.response.use(
//   (res: AxiosResponse) => {
//     // 인증 헤더에 토큰이 있으면 꺼내서 store에 저장
//     const authHeader: string = res.headers.authorization
//     if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
//       const accessToken = authHeader.substring(BEARER_TYPE.length)
//       getTokenStore.getState().setToken(accessToken)
//     }
//
//     return res
//   },
//   err => {
//     if (axios.isAxiosError<ApiResponse>(err) && err.response) {
//       if (err.response.status === 401) {
//         const { config } = err
//         // 401: 인증되지 않은 사용자 -> 토큰 재발급 시도
//         if (config) return reissue(config)
//       }
//     }
//
//     return Promise.reject(err)
//   },
// )

export default { basicAxios, authAxios }
