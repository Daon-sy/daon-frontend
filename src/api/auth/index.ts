import { AxiosResponse } from "axios"
import { authAxios, basicAxios } from "api/index"

export const SIGN_IN_URI = "/api/auth/sign-in"

export interface SignInRequestBody {
  username: string
  password: string
}

export const signInApi = async (
  requestBody: SignInRequestBody,
): Promise<AxiosResponse> => {
  return basicAxios.post(SIGN_IN_URI, requestBody)
}

export const LOGOUT_URI = "/api/auth/logout"

export const logoutApi = async (): Promise<AxiosResponse> => {
  return authAxios.post(LOGOUT_URI)
}
