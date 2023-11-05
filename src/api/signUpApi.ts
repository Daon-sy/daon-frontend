import { ApiResponse, basicAxios } from "api/index"
import { AxiosResponse } from "axios"

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export const signUpApi = async (
  signUpRequest: SignUpRequest,
): Promise<AxiosResponse<ApiResponse>> => {
  return basicAxios.post("/api/sign-up", signUpRequest)
}
