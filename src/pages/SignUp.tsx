import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material"
import {
  addEmailApi,
  checkVerificationEmailApi,
  sendVerificationEmailApi,
  signUpApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import Typography from "@mui/material/Typography"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"

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
  const [email, setEmail] = React.useState<string>("")
  const [sendEmail, setSendEmail] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>("")
  const [checkCode, setCheckCode] = React.useState<boolean | null>(null)
  const [progress, setProgress] = React.useState<number>(-1)

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

  const checkFormData = (): boolean =>
    !(
      !formData.email ||
      !formData.password ||
      !formData.passwordCheck ||
      !formData.name
    )

  const MINUTES_IN_MS = 30 * 60 * 1000
  const INTERVAL = 1000
  const [timeLeft, setTimeLeft] = React.useState<number>(MINUTES_IN_MS)
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0",
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0")

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

  const handleSendEmailClick = async () => {
    setProgress(0)
    const progressInterval = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 0 : prevProgress + 12.33,
      )
    }, 500)

    try {
      await sendVerificationEmailApi({ email: formData.email })
    } finally {
      clearInterval(progressInterval)
      setProgress(100)
    }
    setSendEmail(true)
    setTimeLeft(MINUTES_IN_MS)
  }

  const handleCheckVerificationCodeClick = async () => {
    const verifiedData = await checkVerificationEmailApi({
      email: formData.email,
      code,
    })
    if (verifiedData.data.verified) {
      setCheckCode(true)
    } else {
      setCheckCode(false)
    }
  }

  const onCancelButtonClick = () => {
    navigate(-1)
  }

  const onSignUpButtonClick = () => {
    // TODO 데이터 유효성 검사
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
      }}
    >
      <Box
        sx={{
          width: 500,
          marginTop: 10, // 상단 공백 임시
          padding: 5,
          backgroundColor: "white",
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: "center",
                marginBottom: 3,
              }}
            >
              회원가입
            </Typography>
          </Box>
          <Stack spacing={2}>
            <TextField
              required
              label="아이디"
              variant="outlined"
              value={formData.username}
              onChange={onUsernameChanged}
              helperText="usermail"
            />
            <TextField
              required
              type="password"
              label="비밀번호"
              variant="outlined"
              value={formData.password}
              onChange={onPasswordChanged}
              helperText="6자리 이상. 영문,숫자,특수기호 조합."
            />
            <TextField
              required
              type="password"
              label="비밀번호 확인"
              variant="outlined"
              value={formData.passwordCheck}
              onChange={onPasswordCheckChanged}
              helperText="6자리 이상. 영문,숫자,특수기호 조합."
            />
            <TextField
              required
              label="이름"
              variant="outlined"
              value={formData.name}
              onChange={onNameChanged}
              helperText="실명 입력"
            />
            <Box component="form" sx={{ display: "flex" }}>
              <TextField
                required
                label="이메일"
                variant="outlined"
                value={formData.email}
                onChange={onEmailChanged}
                helperText="usermail@email.com"
              />
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "#FFBE00",
                  width: 120,
                  height: 50,
                }}
                onClick={handleSendEmailClick}
              >
                인증번호 전송
              </Button>
            </Box>
            {!sendEmail && progress > 0 && progress <= 100 && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "90%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      mt: 2,
                      width: "100%",
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                </Box>
                <Box sx={{ minWitdh: 35 }}>
                  <Typography
                    mt={2}
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(progress)}`}</Typography>
                </Box>
              </Box>
            )}
            {sendEmail ? (
              <Box>
                <Typography sx={{ mt: 0.5, fontSize: 14, color: "#787878" }}>
                  입력하신 이메일로 6자리 코드가 전송되었습니다.
                </Typography>
                <Box
                  sx={{ display: "flex", mt: 2.5, mb: 2, alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: "#1F4838",
                      fontWeight: "bold",
                    }}
                  >
                    인증번호 입력
                  </Typography>
                  {checkCode !== null &&
                    (checkCode ? (
                      <CheckCircleIcon
                        sx={{ ml: 0.5, fontSize: "medium", color: "#3A4CA8" }}
                      />
                    ) : (
                      <ErrorIcon
                        sx={{ ml: 0.5, fontSize: "medium", color: "#AE3A1E" }}
                      />
                    ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{ width: 200 }}
                    required
                    size="small"
                    error={checkCode === false}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    inputProps={{ maxLength: 6 }}
                  />
                  <Typography sx={{ color: "#3A4CA8" }}>
                    {minutes} : {second}
                  </Typography>
                  <Button
                    sx={{ ml: 3, color: "white", backgroundColor: "#1F4838" }}
                    onClick={handleCheckVerificationCodeClick}
                  >
                    인증번호 확인
                  </Button>
                </Box>
                {checkCode !== null && (
                  <Typography sx={{ mt: 0.5, fontSize: 14, color: "#787878" }}>
                    {checkCode
                      ? "이메일 인증이 완료되었습니다."
                      : "이메일 인증에 실패하였습니다. 다시 입력해 주세요."}
                  </Typography>
                )}
              </Box>
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
                  marginTop: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    height: 50,
                  }}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    onClick={onCancelButtonClick}
                  >
                    취소
                  </Button>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={onSignUpButtonClick}
                  >
                    가입
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default SignUp
