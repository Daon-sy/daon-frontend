import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { signInApi, SignInRequestBody } from "api/auth"
import { useAlert } from "hooks/useAlert"

interface Props {
  requestBody: SignInRequestBody
}

const useSignIn = ({ requestBody }: Props) => {
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess, addError } = useAlert()

  const { username, password } = requestBody

  const checkRequest = (): boolean => !!username && !!password

  const fetch = async () => {
    if (!checkRequest()) {
      addError("아이디, 비밀번호를 입력해주세요")
      return
    }

    try {
      setIsFetching(true)
      await signInApi(requestBody)
      addSuccess("로그인에 성공하였습니다.")
      navigate("/")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        const errorResponse = response?.data as ErrorResponse
        setError(errorResponse)
        const { errorCode } = errorResponse

        if (errorCode === 2000 || errorCode === 2002) {
          addError("아이디 비밀번호를 확인해주세요")
        }
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { fetch, isFetching, error }
}

export default useSignIn
