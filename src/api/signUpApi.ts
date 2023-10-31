import axios from "axios"
import env from "env"

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export const signUpApi = async (signUpRequest: SignUpRequest) => {
  return axios.post(
    `${env.REACT_APP_API_SERVER_URL}/api/sign-up`,
    signUpRequest,
  )
}
