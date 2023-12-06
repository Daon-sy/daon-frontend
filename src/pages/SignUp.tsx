import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material"
import {
  addEmailApi,
  checkUsernameApi,
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

  const [isUsernameDuplicate, setIsUsernameDuplicate] = React.useState<
    boolean | null
  >(null)
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true)

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

  // 유효성 검사

  // 1. 빈칸이 있는지
  const checkFormData = (): boolean =>
    !(
      !formData.email ||
      !formData.password ||
      !formData.passwordCheck ||
      !formData.name
    )

  // 2. '아이디'가 이미 존재하는지
  const checkUsername = async () => {
    try {
      const response = await checkUsernameApi({
        username: formData.username,
      })
      setIsUsernameDuplicate(response.data.isDuplicate)
    } catch (error) {
      console.error(error)
    }
  }

  // 3. '비밀번호'가 6자리 이상인지
  const checkPassword = () => formData.password.length >= 6

  // 4. '비밀번호'와 '비밀번호 확인'의 값이 똑같은지
  const checkPasswordMatching = () =>
    formData.password === formData.passwordCheck

  // 5. '이름'이 한국어로 기입되었는지
  const checkNameKorean = () => /^[가-힣]+$/.test(formData.name)

  // 6. '이메일'이 이메일 형식에 맞는지
  const checkEmailValid = () =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)

  const onSignUpButtonClick = () => {
    // 1. 빈칸이 있는지
    if (!checkFormData()) {
      addError("입력값을 확인해주세요")
      return
    }

    // 2. '아이디'가 이미 존재하는지
    if (isUsernameDuplicate === true) {
      addError("이미 사용 중인 아이디입니다.")
      return
    }

    // 3. '비밀번호'가 6자리 이상인지
    if (!checkPassword()) {
      addError("비밀번호는 6자리 이상이어야 합니다.")
      return
    }

    // 4. '비밀번호'와 '비밀번호 확인'의 값이 똑같은지
    if (!checkPasswordMatching()) {
      addError("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
      return
    }

    // 5. '이름'이 한국어로 기입되었는지
    if (!checkNameKorean()) {
      addError("이름은 한글로 기입해주세요.")
      return
    }

    // 6. '이메일'이 이메일 형식에 맞는지
    if (!checkEmailValid()) {
      addError("올바른 이메일 형식이 아닙니다.")
      return
    }

    // 7. '이메일'인증을 했는지
    if (!checkCode) {
      addError("이메일을 인증해주세요.")
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
        height: "calc(100vh - 70px);",
        boxShadow: "border-box",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          marginX: "auto",
          justifyContent: "space-evenly",
          width: 500,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 2,
          }}
        >
          회원가입
        </Typography>
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
          <Box
            component="form"
            sx={{
              display: "flex",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              label="이메일"
              variant="outlined"
              value={formData.email}
              onChange={onEmailChanged}
              helperText="usermail@email.com"
              sx={{ flexGrow: 1 }}
            />
            <Button
              sx={{
                color: "white",
                backgroundColor: "#FFBE00",
                width: 120,
                ml: 1,
                height: "56px",
                postion: "relative",
                top: 0,
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
              <Typography sx={{ m: 0.5, fontSize: 14, color: "#787878" }}>
                입력하신 이메일로 6자리 코드가 전송되었습니다.
              </Typography>
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
                  label="인증번호 입력"
                  error={checkCode === false}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  inputProps={{ maxLength: 6 }}
                />
                <Typography sx={{ color: "#3A4CA8" }}>
                  {minutes} : {second}
                </Typography>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "#1F4838",
                    width: 120,
                    ml: 1,
                    height: "56px",
                    postion: "relative",
                    top: 0,
                  }}
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
                  variant="contained"
                  onClick={onSignUpButtonClick}
                >
                  가입
                </Button>
                <Button
                  fullWidth
                  size="large"
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
    </Box>
  )
}

export default SignUp
