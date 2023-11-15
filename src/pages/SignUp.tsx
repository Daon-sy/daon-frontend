import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container, Stack, TextField } from "@mui/material"
import { signUpApi } from "api/member"
import { useAlert } from "hooks/useAlert"

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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 500,
          marginTop: 10, // 상단 공백 임시
          padding: 5,
          backgroundColor: "gray", // 임시 색상
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2}>
            <TextField
              required
              label="아이디"
              variant="outlined"
              value={formData.username}
              onChange={onUsernameChanged}
              helperText="usermail@email.com"
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
            <TextField
              required
              label="이메일"
              variant="outlined"
              value={formData.email}
              onChange={onEmailChanged}
              helperText="usermail@email.com"
            />
          </Stack>
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
      </Box>
    </Container>
  )
}

export default SignUp
