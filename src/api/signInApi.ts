import axios from "axios"
import { API_SERVER_URL } from "env"

export interface SignInRequest {
  email: string
  password: string
}

export const signInApi = async (signInRequest: SignInRequest) => {
  return axios.post(`${API_SERVER_URL}/api/sign-in`, signInRequest)
}
