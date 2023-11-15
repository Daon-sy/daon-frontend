import { AxiosResponse } from "axios"
import { basicAxios } from "api/index"

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
