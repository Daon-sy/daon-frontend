import { basicAxios } from "api/index"

export interface SignInRequest {
  email: string
  password: string
}

export const signInApi = async (signInRequest: SignInRequest) => {
  return basicAxios.post("/api/sign-in", signInRequest)
}
