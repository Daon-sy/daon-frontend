import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { signUpApi, SignUpRequestBody } from "api/member"
import useEmailCheck from "hooks/member/useEmailCheck"
import useCheckUsername from "hooks/member/useCheckUsername"
import { useAlert } from "hooks/useAlert"

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}$/
  return passwordRegex.test(password)
}

const useSignUp = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [signUpForm, setSignUpForm] = React.useState<
    SignUpRequestBody & {
      emailCheckCode: string
      usernameCheck: boolean
      passwordCheck: string
      emailCodeSent: boolean
      emailCodeChecked: "VALID" | "INVALID" | "NOT_CHECKED"
    }
  >({
    username: "",
    usernameCheck: false,
    email: "",
    emailCheckCode: "",
    password: "",
    passwordCheck: "",
    name: "",
    emailCodeSent: false,
    emailCodeChecked: "NOT_CHECKED",
  })
  const { addSuccess, addError } = useAlert()

  const {
    username,
    password,
    passwordCheck,
    name,
    email,
    emailCheckCode,
    emailCodeSent,
    emailCodeChecked,
    usernameCheck,
  } = signUpForm

  const {
    isValid: isValidUsername,
    fetch: checkUsername,
    errorMessage: checkUsernameErrorMessage,
  } = useCheckUsername(username)

  React.useEffect(() => {
    setSignUpForm({
      ...signUpForm,
      usernameCheck: isValidUsername,
    })
  }, [isValidUsername])

  const {
    codeSent,
    checked,
    sendEmailCode,
    checkEmailCode,
    timeLeft,
    setCodeSent,
    setChecked,
    errorMessage: emailCheckErrorMessage,
    isSendEmailCodeFetching,
  } = useEmailCheck(email, emailCheckCode)

  React.useEffect(() => {
    setCodeSent(emailCodeSent)
    setChecked(emailCodeChecked)
  }, [emailCodeSent, emailCodeChecked])

  React.useEffect(() => {
    setSignUpForm({
      ...signUpForm,
      emailCodeSent: codeSent,
      emailCodeChecked: checked,
    })
  }, [codeSent, checked])

  const fetch = async (callback?: () => void) => {
    // form 입력값 검사
    if (!username) {
      addError("아이디를 입력해주세요")
      return
    }

    if (!usernameCheck) {
      addError("아이디 중복확인을 해주세요")
      return
    }

    if (!password) {
      addError("비밀번호를 입력해주세요")
      return
    }

    if (!validatePassword(password)) {
      addError("비밀번호 양식에 맞게 입력해주세요")
      return
    }

    if (passwordCheck !== password) {
      addError("비밀번호와 확인 값이 일치하지 않습니다")
      return
    }

    if (!name) {
      addError("이름을 입력해주세요")
      return
    }

    if (emailCodeChecked !== "VALID") {
      addError("이메일을 인증해주세요")
      return
    }

    try {
      setIsFetching(true)
      await signUpApi({ username, password, name, email })
      addSuccess("회원가입 성공! 로그인 버튼을 통해 로그인 해주세요")
      if (callback) callback()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return {
    signUp: fetch,
    sendEmailCode,
    checkEmailCode,
    signUpForm,
    setSignUpForm,
    isFetching,
    error,
    timeLeftEmailCheck: timeLeft,
    emailCheckErrorMessage,
    checkUsername,
    checkUsernameErrorMessage,
    isSendEmailCodeFetching,
  }
}

export default useSignUp
