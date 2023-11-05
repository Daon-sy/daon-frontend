import { ApiResponse, basicAxios } from "api/index"
import { AxiosResponse } from "axios"

export interface SignInRequest {
  email: string
  password: string
}

export const signInApi = async (
  signInRequest: SignInRequest,
): Promise<AxiosResponse<ApiResponse>> => {
  return basicAxios.post("/api/sign-in", signInRequest)
}
