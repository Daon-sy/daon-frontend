import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { checkUsernameApi } from "api/member"

const validateUsername = (inputUsername: string) => {
  const usernameRegex = /^[a-zA-Z0-9]{6,20}$/
  return usernameRegex.test(inputUsername)
}

const useCheckUsername = (username: string) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [isValid, setIsValid] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  React.useEffect(() => {
    setIsValid(false)
    setErrorMessage("")
  }, [username])

  const fetch = async () => {
    setIsValid(false)
    if (!username) {
      setErrorMessage("아이디를 입력해주세요")
      return
    }

    if (!validateUsername(username)) {
      setErrorMessage("영어, 숫자만으로 6~20자리의 아이디를 입력해주세요")
      return
    }

    try {
      setIsFetching(true)
      await checkUsernameApi(username)
      setIsValid(true)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        const errorResponse = response?.data as ErrorResponse
        setError(errorResponse)
        // 로그인 아이디 중복일 경우
        if (errorResponse.errorCode === 1001) {
          setErrorMessage("아이디를 입력해주세요")
          return
        }
        if (errorResponse.errorCode === 2001) {
          setErrorMessage("중복된 아이디입니다")
          return
        }
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { isValid, fetch, isFetching, error, errorMessage }
}

export default useCheckUsername
