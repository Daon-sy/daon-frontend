import React from "react"

import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Typography from "@mui/material/Typography"
import { Button, Stack, TextField } from "@mui/material"
import { signInApi, SignInRequest } from "api/signInApi"
import { useAlert } from "hooks/useAlert"
import { useTokenStore } from "store/store"

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
}

interface LoginModalProps {
  open: boolean
  handleClose: () => void
}

const LoginModal = (props: LoginModalProps) => {
  const { addSuccess, addError } = useAlert()
  const { open, handleClose } = props
  const tokenState = useTokenStore()
  const [signInRequest, setSignInRequest] = React.useState<SignInRequest>({
    email: "",
    password: "",
  })

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInRequest({
      ...signInRequest,
      email: e.target.value,
    })
  }

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInRequest({
      ...signInRequest,
      password: e.target.value,
    })
  }

  const checkRequest = (): boolean =>
    !(!signInRequest.email || !signInRequest.password)

  const onLoginButtonClick = () => {
    if (!checkRequest()) {
      addError("이메일, 비밀번호를 입력해주세요.")

      return
    }

    signInApi(signInRequest)
      .then(res => {
        // TODO 토큰으로 변경되면 Bearer 제거
        const authHeaderValue = res.headers.authorization

        tokenState.setToken(authHeaderValue)
        // TODO 로그인 성공하면 유저 정보 가져와야 한다.

        addSuccess("로그인에 성공하였습니다.")
        handleClose()
      })
      .catch(err => {
        const { status } = err.response
        if (status === 400) {
          addError("이메일 또는 비밀번호가 정확하지 않습니다.")
        }

        if (status >= 500) {
          addError("서버 오류입니다. 다시 시도해주세요.")
        }
      })
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
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
                label="이메일"
                variant="outlined"
                value={signInRequest.email}
                onChange={onEmailChanged}
                helperText="usermail@email.com"
              />
              <TextField
                required
                type="password"
                label="비밀번호"
                variant="outlined"
                value={signInRequest.password}
                onChange={onPasswordChanged}
                helperText="6자리 이상. 영문,숫자,특수기호 조합."
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
                    onClick={handleClose}
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
      </Fade>
    </Modal>
  )
}

export default LoginModal
