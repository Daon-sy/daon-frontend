import { basicAxios } from "api/index"

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export const signUpApi = async (signUpRequest: SignUpRequest) => {
  return basicAxios.post("/api/sign-up", signUpRequest)
}
