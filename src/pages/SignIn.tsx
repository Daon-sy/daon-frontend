import React from "react"
import Typography from "@mui/material/Typography"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useAlert } from "hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { signInApi, SignInRequestBody } from "api/auth"
import InputLabel from "@mui/material/InputLabel"

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
        scrollbarWidth: "0.5em",
      }}
    >
      <Box
        sx={{
          width: 400,
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
              로그인
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Stack spacing={1}>
              <InputLabel htmlFor="username">
                <span
                  style={{
                    fontWeight: "900",
                    fontSize: "14px",
                  }}
                >
                  아이디
                </span>
              </InputLabel>
              <TextField
                value={signInRequest.username}
                onChange={inUsernameChanged}
                onKeyDown={onEnterKeyDown}
                placeholder="아이디"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
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
                value={signInRequest.password}
                onChange={inPasswordChanged}
                onKeyDown={onEnterKeyDown}
                placeholder="비밀번호"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
            </Stack>
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
                  onClick={onLoginButtonClick}
                >
                  로그인
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
    </Box>
  )
}

export default SignIn
