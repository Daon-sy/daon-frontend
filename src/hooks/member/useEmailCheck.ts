import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { checkVerificationEmailApi, sendVerificationEmailApi } from "api/member"
import { useAlert } from "hooks/useAlert"

const MINUTES_IN_MS = 10 * 60 * 1000
const INTERVAL_MS = 1000

const validateEmail = (email: string) => {
  const emailRegex =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
  return emailRegex.test(email)
}

interface ErrorMessage {
  email?: string
  emailCheckCode?: string
}

const useEmailCheck = (email: string, code: string) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [isSendEmailCodeFetching, setIsSendEmailCodeFetching] =
    React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [codeSent, setCodeSent] = React.useState(false)
  const [checked, setChecked] = React.useState<
    "VALID" | "INVALID" | "NOT_CHECKED"
  >("NOT_CHECKED")
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessage>({})
  const { addSuccess } = useAlert()

  const [timeLeft, setTimeLeft] = React.useState<number>(MINUTES_IN_MS)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - INTERVAL_MS)
    }, INTERVAL_MS)

    if (timeLeft <= 0) {
      if (checked !== "VALID") {
        setErrorMessage({
          ...errorMessage,
          emailCheckCode: "이메일 인증시간이 만료되었습니다. 다시 전송해주세요",
        })
      }
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [timeLeft])

  React.useEffect(() => {
    setCodeSent(false)
    setChecked("NOT_CHECKED")
    setErrorMessage({})
  }, [email])

  React.useEffect(() => {
    setErrorMessage({ ...errorMessage, emailCheckCode: undefined })
  }, [code])

  const sendEmailCode = async (onInputValid: () => void) => {
    if (!validateEmail(email)) {
      // addError("올바르지 않은 이메일 양식입니다")
      setErrorMessage({
        ...errorMessage,
        email: "올바르지 않은 이메일 양식입니다",
      })
      return
    }
    onInputValid()

    if (errorMessage.email) return
    try {
      setIsSendEmailCodeFetching(true)
      await sendVerificationEmailApi({ email })
      setCodeSent(true)
      setErrorMessage({})
      setTimeLeft(MINUTES_IN_MS)
      addSuccess("이메일 인증 코드를 발송했습니다")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        const errorResponse = response?.data as ErrorResponse
        setError(errorResponse)
        if (errorResponse.errorCode === 2004) {
          setTimeout(
            () =>
              setErrorMessage({
                ...errorMessage,
                email: "이미 사용중인 이메일입니다",
              }),
            1000,
          )
          // setErrorMessage({
          //   ...errorMessage,
          //   email: "이미 사용중인 이메일입니다",
          // })
        }
      }
    } finally {
      setTimeout(() => setIsSendEmailCodeFetching(false), 1000)
    }
  }

  const checkEmailCode = async () => {
    if (timeLeft <= 0) {
      // addError("이메일 인증시간이 만료되었습니다. 다시 전송해주세요")
      setErrorMessage({
        ...errorMessage,
        emailCheckCode: "이메일 인증시간이 만료되었습니다. 다시 전송해주세요",
      })
      return
    }

    if (!code) {
      // addError("이메일 인증번호를 입력해주세요")
      setErrorMessage({
        ...errorMessage,
        emailCheckCode: "이메일 인증번호를 입력해주세요",
      })
      return
    }

    try {
      setIsFetching(true)
      await checkVerificationEmailApi({
        email,
        code,
      })
      addSuccess("이메일 인증에 성공했습니다")
      setChecked("VALID")
      setErrorMessage({})
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
        setErrorMessage({
          ...errorMessage,
          emailCheckCode: "인증번호가 일치하지 않습니다",
        })
        setChecked("INVALID")
      }
    } finally {
      setIsFetching(false)
    }
  }

  return {
    codeSent,
    checked,
    sendEmailCode,
    checkEmailCode,
    isFetching,
    error,
    timeLeft,
    setCodeSent,
    setChecked,
    errorMessage,
    isSendEmailCodeFetching,
  }
}

export default useEmailCheck
