import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from "axios"
import mem from "mem"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/tokenStore"
import { getAlertStore } from "store/alertStore"

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
  content: Array<T>
}

export interface PageResponse<T> extends SliceResponse<T> {
  totalPage: number
  totalCount: number
}

export interface PageParams {
  page?: number
  size?: number
  sort?: string
}

export interface PageInfo {
  first: boolean
  last: boolean
  pageSize: number
  pageNumber: number
  contentSize: number
  totalPage: number
  totalCount: number
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

const parseToken = async (
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders,
) => {
  // 인증 헤더에 토큰이 있으면 꺼내서 store에 저장
  const authHeader: string = headers.authorization
  if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
    const accessToken = authHeader.substring(BEARER_TYPE.length)
    getTokenStore.getState().setToken(accessToken)
  }
}

const reissue = mem(
  async () => {
    const { headers: respHeaders } = await basicAxios.post("/api/auth/reissue")
    await parseToken(respHeaders)
  },
  { maxAge: 1000 },
)

const onSuccess = (res: AxiosResponse) => {
  // 인증 헤더에 토큰이 있으면 꺼내서 store에 저장
  const { headers } = res
  parseToken(headers)
  return res
}

basicAxios.interceptors.response.use(onSuccess)

// 요청 인터셉터: 인증 헤더 자동 설정
authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { headers } = config
  if (getTokenStore.getState().token) {
    headers.Authorization = `Bearer ${getTokenStore.getState().token}`
  }

  return config
})

// 응답 인터셉터: 응답에 따른 callback 처리
authAxios.interceptors.response.use(onSuccess, async err => {
  if (
    axios.isAxiosError<ErrorResponse>(err) &&
    err.response &&
    err.response.status === 401 &&
    err.config
  ) {
    const { config } = err
    // 401: 인증되지 않은 사용자 -> 토큰 재발급 시도
    const { headers: confHeaders } = config
    // 토큰 재발급 시도
    try {
      await reissue()
      confHeaders.Authorization = `Bearer ${getTokenStore.getState().token}`
      return basicAxios.request(config)
    } catch (e) {
      // 재발급 실패시
      // 토큰 저장소 비우기
      getAlertStore.getState().setAlertProps({
        children: "로그인이 필요한 서비스입니다.",
        handleConfirm: () => {
          getTokenStore.getState().clear()
          // 로그인 페이지로 보내기
          location.href = "/sign-in"
        },
      })
      return Promise.reject(e)
    }
  }

  return Promise.reject(err)
})

export default { basicAxios, authAxios }
