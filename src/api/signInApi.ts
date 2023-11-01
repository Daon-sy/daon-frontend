import axios from "axios"
import env from "env"

export interface SignInRequest {
  email: string
  password: string
}

export const signInApi = async (signInRequest: SignInRequest) => {
  return axios.post(
    `${env.REACT_APP_API_SERVER_URL}/api/sign-in`,
    signInRequest,
  )
}
