import axios from "axios"
import { API_SERVER_URL } from "env"

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export const signUpApi = async (signUpRequest: SignUpRequest) => {
  return axios.post(`${API_SERVER_URL}/api/sign-up`, signUpRequest)
}
