import React from "react"
import Typography from "@mui/material/Typography"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SignInRequestBody } from "api/auth"
import InputLabel from "@mui/material/InputLabel"
import useSignIn from "hooks/auth/useSignIn"

const SignIn: React.FC = () => {
  const navigate = useNavigate()

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

  const onCancelButtonClick = () => {
    navigate(-1)
  }

  const { fetch: signIn } = useSignIn({ requestBody: signInRequest })

  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") signIn()
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
                  onClick={signIn}
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
