import React from "react"
import { Box, Button, TextField, Typography, Stack } from "@mui/material"
import {
  checkEmailApi,
  checkVerificationEmailApi,
  sendVerificationEmailApi,
  signUpApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import InputLabel from "@mui/material/InputLabel"
import { useNavigate } from "react-router-dom"
import SignUpPageImage from "../assets/img/sign-up.png"

interface SignUpForm {
  username: string
  email: string
  password: string
  passwordCheck: string
  name: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const { addSuccess, addError } = useAlert()
  const [sendEmail, setSendEmail] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>("")
  const [checkCode, setCheckCode] = React.useState<boolean | null>(null)
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [emailVerificationError, setEmailVerificationError] = React.useState<
    string | null
  >(null)
  const [isUsername, setIsUsername] = React.useState<boolean | null>(null)
  const [usernameError, setUsernameError] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState<SignUpForm>({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  })

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      username: e.target.value,
    })
  }

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      password: e.target.value,
    })
  }

  const onPasswordCheckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      passwordCheck: e.target.value,
    })
  }

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }

  const MINUTES_IN_MS = 60 * 1000
  const INTERVAL = 1000
  const [timeLeft, setTimeLeft] = React.useState<number>(MINUTES_IN_MS)
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0",
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0")

  const validateEmail = (typedEmail: string) => {
    const emailRegex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
    return emailRegex.test(typedEmail)
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - INTERVAL)
    }, INTERVAL)

    if (timeLeft <= 0) {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])

  const checkUsernameSameClick = async () => {
    const { username } = formData
    // const response = await checkUsernameApi({ username })
    // console.log(response)

    // 요청값
    if (!username) {
      setIsUsername(false)
      setUsernameError("아이디를 입력해주세요.")
      return
    }
    /* if (response.data.exists) {
      setIsUsername(false)
      setUsernameError("중복된 아이디입니다.")
      return
    } */

    try {
      setIsUsername(true)
      setUsernameError(null)
    } catch (error) {
      setIsUsername(false) // 사용 불가능한 아이디로 설정
      setUsernameError("아이디 중복 확인에 실패했습니다. 다시 시도해주세요.") // 에러 메시지 설정
    }
  }

  const sendEmailClick = async () => {
    const { email } = formData
    // const response = await checkEmailApi({ email })

    if (!email) {
      setEmailError("이메일을 입력해주세요.")
      return
    }
    if (!validateEmail(email)) {
      setEmailError("올바르지 않은 이메일 양식입니다.")
      return
    }
    /* if (???) {
      setEmailError("이미 존재하는 이메일입니다.")
      return
    } */

    try {
      setEmailError(null)
      setSendEmail(true)
      setTimeLeft(MINUTES_IN_MS)
      setCheckCode(null)
      await sendVerificationEmailApi({ email })
    } catch (e) {
      setEmailError("이메일 전송에 실패했습니다. 다시 요청해주세요.")
    }
  }

  const resendEmailClick = () => {
    setFormData({
      ...formData,
      email: "",
    })
    setSendEmail(false)
    setCheckCode(null)
    setEmailVerificationError(null)
    setCode("")
  }

  const checkVerificationCodeClick = async () => {
    const { email } = formData
    const verifiedData = await checkVerificationEmailApi({ email, code })

    if (timeLeft <= 0) {
      setCheckCode(false)
      setCode("")
      setEmailVerificationError(
        "이메일 인증시간이 만료되었습니다. 다시 전송해주세요.",
      )
    } else if (code.length !== 0) {
      if (verifiedData.data.verified) {
        setCheckCode(true)
        setEmailVerificationError(null)
      } else {
        setCheckCode(false)
        setCode("")
        setEmailVerificationError(
          "이메일 인증에 실패하였습니다. 다시 입력해주세요.",
        )
      }
    } else {
      setCheckCode(false)
      setEmailVerificationError("인증번호를 입력해주세요.")
    }
  }

  const recheckVerificationCodeClick = async () => {
    const { email } = formData
    try {
      setEmailError(null)
      setSendEmail(true)
      setTimeLeft(MINUTES_IN_MS)
      setCheckCode(null)
      setCode("")
      setEmailVerificationError(null)
      await sendVerificationEmailApi({ email })
    } catch (e) {
      setEmailError("이메일 전송에 실패했습니다. 다시 요청해 주세요.")
    }
  }

  const onCancelButtonClick = () => {
    navigate(-1)
  }

  // 유효성 검사
  const checkFormData = (): boolean =>
    !(
      !formData.email ||
      !formData.password ||
      !formData.passwordCheck ||
      !formData.name
    )

  const onSignUpButtonClick = () => {
    // 1. 빈칸이 있는지
    if (!checkFormData()) {
      addError("입력값을 확인해주세요")
      return
    }

    signUpApi({
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
    })
      .then(() => {
        addSuccess("회원가입 성공! 로그인 버튼을 통해 로그인 해주세요.")
        navigate("/")
      })
      .catch(err => {
        if (err.response) {
          const { status } = err.response
          if (status === 400) {
            // TODO
            addError("입력값 오류입니다. 확인해주세요.")
          }

          if (status >= 500) {
            addError("서버 오류입니다. 다시 시도해주세요.")
          }
        } else {
          console.error(err)
          addError("unknown error... 문의 부탁드립니다.")
        }
      })
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        m: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
        scrollbarWidth: "0.5em",
      }}
    >
      <Stack direction="row">
        <Box
          sx={{
            width: 350,
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            src={SignUpPageImage}
          />
        </Box>
        <Box
          sx={{
            width: 350,
            padding: 5,
            boxShadow: 1,
            borderWidth: 1,
          }}
        >
          <Stack spacing={1}>
            <Box>
              <Typography
                component="h2"
                sx={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginBottom: 3,
                  fontWeight: 900,
                }}
              >
                회원가입
              </Typography>
            </Box>
            <Stack spacing={1}>
              <InputLabel htmlFor="username">
                <Box style={{ display: "flex" }}>
                  <Box style={{ width: "85%" }}>
                    <span
                      style={{
                        fontWeight: "900",
                        fontSize: "14px",
                      }}
                    >
                      아이디
                    </span>
                  </Box>
                  <Box style={{ width: "15%" }}>
                    <Button
                      sx={{
                        textAlign: "left",
                        color: "#ecb317",
                        fontWeight: "550",
                        fontSize: "10px",
                        textDecorationColor: "#ecb317",
                      }}
                      onClick={checkUsernameSameClick}
                    >
                      중복 확인
                    </Button>
                  </Box>
                </Box>
              </InputLabel>
              <TextField
                value={formData.username}
                onChange={onUsernameChanged}
                placeholder="아이디"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
              {isUsername ? (
                <span style={{ fontSize: "10px", color: "#dda600" }}>
                  사용 가능한 아이디 입니다
                </span>
              ) : (
                <span style={{ fontSize: "10px", color: "#dda600" }}>
                  {usernameError}
                </span>
              )}
            </Stack>
            <Stack spacing={1}>
              <InputLabel htmlFor="password">
                <span
                  style={{
                    fontWeight: "900",
                    fontSize: "14px",
                  }}
                >
                  비밀번호
                </span>
              </InputLabel>
              <TextField
                type="password"
                value={formData.password}
                onChange={onPasswordChanged}
                placeholder="비밀번호"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
              <span style={{ fontSize: "10px", color: "#dda600" }}>
                6자리 이상 영문,숫자,특수기호 조합
              </span>
            </Stack>
            <Stack spacing={1}>
              <InputLabel htmlFor="passwordCheck">
                <span
                  style={{
                    fontWeight: "900",
                    fontSize: "14px",
                  }}
                >
                  비밀번호 확인
                </span>
              </InputLabel>
              <TextField
                type="password"
                value={formData.passwordCheck}
                onChange={onPasswordCheckChanged}
                placeholder="비밀번호 확인"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
              <span style={{ fontSize: "10px", color: "#dda600" }}>
                6자리 이상 영문,숫자,특수기호 조합
              </span>
            </Stack>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">
                <span
                  style={{
                    fontWeight: "900",
                    fontSize: "14px",
                  }}
                >
                  이름
                </span>
              </InputLabel>
              <TextField
                value={formData.name}
                onChange={onNameChanged}
                placeholder="실명 기입"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">
                <Box style={{ display: "flex" }}>
                  <Box style={{ width: "80%" }}>
                    <span
                      style={{
                        width: "100%",
                        fontWeight: "900",
                        fontSize: "14px",
                      }}
                    >
                      이메일
                    </span>
                  </Box>
                  {!sendEmail ? (
                    <Box style={{ width: "20%" }}>
                      <Button
                        sx={{
                          textAlign: "left",
                          color: "#ecb317",
                          fontWeight: "550",
                          fontSize: "10px",
                          textDecorationColor: "#ecb317",
                        }}
                        onClick={sendEmailClick}
                      >
                        인증번호 전송
                      </Button>
                    </Box>
                  ) : (
                    <Box style={{ width: "20%" }}>
                      <Button
                        sx={{
                          textAlign: "left",
                          color: "#3c8869",
                          fontWeight: "550",
                          fontSize: "10px",
                          textDecorationColor: "#ecb317",
                        }}
                        onClick={resendEmailClick}
                      >
                        이메일 재입력
                      </Button>
                    </Box>
                  )}
                </Box>
              </InputLabel>
              <TextField
                value={formData.email}
                onChange={onEmailChanged}
                placeholder="email@email.com"
                variant="outlined"
                margin="none"
                size="small"
                error={!!emailError}
                inputProps={{
                  style: { fontSize: 12 },
                  readOnly: sendEmail === true,
                }}
              />
              {sendEmail ? (
                <span style={{ fontSize: "10px", color: "#dda600" }}>
                  입력하신 이메일로 6자리 코드가 전송되었습니다.
                </span>
              ) : (
                <span style={{ fontSize: "10px", color: "#dda600" }}>
                  {emailError}
                </span>
              )}
            </Stack>
            {sendEmail ? (
              <Stack spacing={1}>
                <InputLabel htmlFor="emailCheck">
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "28%" }}>
                      <span
                        style={{
                          width: "100%",
                          fontWeight: "900",
                          fontSize: "14px",
                        }}
                      >
                        이메일 인증하기
                      </span>
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "550",
                          color: "#3A4CA8",
                        }}
                      >
                        {minutes} : {second}
                      </span>
                    </Box>
                    {!checkCode && timeLeft <= 0 ? (
                      <Box style={{ width: "22%" }}>
                        <Button
                          sx={{
                            textAlign: "right",
                            color: "#F14336",
                            fontWeight: "550",
                            fontSize: "10px",
                            textDecorationColor: "#ecb317",
                          }}
                          onClick={recheckVerificationCodeClick}
                        >
                          인증번호 재전송
                        </Button>
                      </Box>
                    ) : (
                      <Box style={{ width: "15%" }}>
                        <Button
                          sx={{
                            textAlign: "right",
                            color: "#ecb317",
                            fontWeight: "550",
                            fontSize: "10px",
                            textDecorationColor: "#ecb317",
                          }}
                          onClick={checkVerificationCodeClick}
                        >
                          인증번호 확인
                        </Button>
                      </Box>
                    )}
                  </Box>
                </InputLabel>
                <TextField
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  variant="outlined"
                  margin="none"
                  size="small"
                  error={checkCode === false}
                  inputProps={{
                    style: { fontSize: 12 },
                    readOnly: checkCode === true,
                  }}
                />
                {checkCode ? (
                  <span style={{ fontSize: "10px", color: "#3c8869" }}>
                    이메일 인증이 완료되었습니다.
                  </span>
                ) : (
                  <span style={{ fontSize: "10px", color: "#F14336" }}>
                    {emailVerificationError}
                  </span>
                )}
              </Stack>
            ) : null}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 300,
                  marginTop: 5,
                }}
              >
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{
                    height: 40,
                  }}
                >
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={onSignUpButtonClick}
                  >
                    회원가입
                  </Button>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    onClick={onCancelButtonClick}
                  >
                    취소
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
export default SignUp
