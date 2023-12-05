import React from "react"
import Typography from "@mui/material/Typography"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useAlert } from "hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { signInApi, SignInRequestBody } from "api/auth"

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { addSuccess, addError } = useAlert()

  const [signInRequest, setSignInRequest] = React.useState<SignInRequestBody>({
    username: "",
    password: "",
  })

  const inUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInRequest({
      ...signInRequest,
      username: e.target.value,
    })
  }

  const inPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInRequest({
      ...signInRequest,
      password: e.target.value,
    })
  }

  const checkRequest = (): boolean =>
    !(!signInRequest.username || !signInRequest.password)

  const onCancelButtonClick = () => {
    navigate(-1)
  }

  const onLoginButtonClick = () => {
    if (!checkRequest()) {
      addError("아이디, 비밀번호를 입력해주세요.")

      return
    }

    signInApi(signInRequest)
      .then(() => {
        addSuccess("로그인에 성공하였습니다.")
        navigate("/")
      })
      .catch(err => {
        if (err.response) {
          const { status } = err.response
          if (status === 400) {
            addError("아이디 또는 비밀번호가 정확하지 않습니다.")
          }

          if (status >= 500) {
            addError("서버 오류입니다. 다시 시도해주세요.")
          }
        }
      })
  }

  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onLoginButtonClick()
    }
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
              로그인
            </Typography>
          </Box>
          <Stack spacing={2}>
            <TextField
              required
              label="아이디"
              variant="outlined"
              value={signInRequest.username}
              onChange={inUsernameChanged}
              helperText="usermail@email.com"
              onKeyDown={onEnterKeyDown}
            />
            <TextField
              required
              type="password"
              label="비밀번호"
              variant="outlined"
              value={signInRequest.password}
              onChange={inPasswordChanged}
              helperText="6자리 이상. 영문,숫자,특수기호 조합."
              onKeyDown={onEnterKeyDown}
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
                  onClick={onLoginButtonClick}
                >
                  로그인
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default SignIn
