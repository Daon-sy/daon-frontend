import React from "react"

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { API_SERVER_URL } from "env"
import { useTokenStore } from "store/tokenStore"

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

export const AxiosInterceptor = ({ children }: React.PropsWithChildren) => {
  const BEARER_TYPE = "Bearer "
  const tokenStore = useTokenStore()

  const reissue = React.useCallback((config: InternalAxiosRequestConfig) => {
    const { headers: confHeaders } = config
    basicAxios
      .post("/api/auth/reissue")
      .then((res: AxiosResponse) => {
        const { headers } = res.headers
        const authHeader: string = headers.authorization
        if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
          const accessToken = authHeader.substring(BEARER_TYPE.length)
          tokenStore.setToken(accessToken)
        }
        confHeaders.Authorization = `Bearer ${tokenStore.token}`

        // 재발급 성공시 기존 요청 재호출
        return basicAxios.request(config)
      })
      .catch(error => error)
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    basicAxios.interceptors.response.use((res: AxiosResponse) => {
      // 인증 헤더에 토큰이 있으면 꺼내서 store에 저장
      const authHeader: string = res.headers.authorization
      if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
        const accessToken = authHeader.substring(BEARER_TYPE.length)
        tokenStore.setToken(accessToken)
      }

      return res
    })

    // 요청 인터셉터: 인증 헤더 자동 설정
    authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const { headers } = config
      if (tokenStore.token) {
        headers.Authorization = `Bearer ${tokenStore.token}`
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
          tokenStore.setToken(accessToken)
        }

        return res
      },
      err => {
        if (
          axios.isAxiosError<ApiResponse>(err) &&
          err.response &&
          err.response.status === 401
        ) {
          const { config } = err.request
          // 401: 인증되지 않은 사용자 -> 토큰 재발급 시도
          reissue(config)
        }
      },
    )
  }, [reissue, tokenStore])

  return <div>{children}</div>
}

export default { basicAxios, authAxios, AxiosInterceptor }
