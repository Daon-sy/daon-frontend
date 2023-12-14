import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputLabel,
  CircularProgress,
} from "@mui/material"
import signUpPageImage from "assets/img/sign_up.webp"
import useSignUp from "hooks/member/useSignUp"

const SignUp = () => {
  const navigate = useNavigate()

  const {
    signUp,
    signUpForm,
    setSignUpForm,
    sendEmailCode,
    checkEmailCode,
    timeLeftEmailCheck,
    emailCheckErrorMessage,
    checkUsername,
    checkUsernameErrorMessage,
    isSendEmailCodeFetching,
  } = useSignUp()
  const minutes = String(
    Math.floor((timeLeftEmailCheck / (1000 * 60)) % 60),
  ).padStart(2, "0")
  const seconds = String(Math.floor((timeLeftEmailCheck / 1000) % 60)).padStart(
    2,
    "0",
  )

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      username: e.target.value,
    })
  }
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      email: e.target.value,
    })
  }
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      password: e.target.value,
    })
  }
  const onPasswordCheckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      passwordCheck: e.target.value,
    })
  }
  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      name: e.target.value,
    })
  }

  const { emailCodeSent, emailCodeChecked, usernameCheck, emailCheckCode } =
    signUpForm

  const resendEmailClick = () => {
    setSignUpForm({
      ...signUpForm,
      email: "",
      emailCodeSent: false,
      emailCodeChecked: "NOT_CHECKED",
      emailCheckCode: "",
    })
  }

  const [openEmailCodeInput, setOpenEmailCodeInput] = React.useState(false)

  const renderEmailCodeInput = () => {
    if (openEmailCodeInput) {
      if (isSendEmailCodeFetching)
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "83.25px",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )

      return (
        <Stack spacing={1}>
          <InputLabel htmlFor="emailCheck">
            <Box style={{ display: "flex" }}>
              <Box flexGrow={1} style={{ display: "flex" }}>
                <Box sx={{ fontWeight: 900, fontSize: 14 }}>
                  이메일 인증하기
                </Box>
                {emailCodeChecked === "VALID" ? null : (
                  <Box
                    sx={{
                      ml: 2,
                      fontWeight: 500,
                      fontSize: 10,
                      color: "#3A4CA8",
                    }}
                  >
                    {minutes} : {seconds}
                  </Box>
                )}
              </Box>
              {emailCodeChecked !== "VALID" && timeLeftEmailCheck <= 0 ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    p: 0,
                    px: 1,
                    minWidth: 0,
                    textAlign: "right",
                    fontWeight: 500,
                    fontSize: 10,
                  }}
                  onClick={() => {
                    sendEmailCode()
                    setSignUpForm({ ...signUpForm, emailCheckCode: "" })
                  }}
                >
                  인증번호 재전송
                </Button>
              ) : null}
              {emailCodeChecked !== "VALID" && timeLeftEmailCheck > 0 ? (
                <Button
                  disableElevation
                  variant="contained"
                  color="secondary"
                  sx={{
                    p: 0,
                    px: 1,
                    minWidth: 0,
                    textAlign: "right",
                    fontWeight: 500,
                    fontSize: 10,
                  }}
                  onClick={() => checkEmailCode()}
                >
                  인증번호 확인
                </Button>
              ) : null}
            </Box>
          </InputLabel>
          <TextField
            value={emailCheckCode}
            onChange={e =>
              setSignUpForm({
                ...signUpForm,
                emailCheckCode: e.target.value,
              })
            }
            variant="outlined"
            margin="none"
            size="small"
            // error={emailCodeChecked === "INVALID"}
            error={!!emailCheckErrorMessage.emailCheckCode}
            inputProps={{
              style: { fontSize: 12 },
              readOnly: emailCodeChecked === "VALID" || timeLeftEmailCheck <= 0,
            }}
          />
          <Box
            style={{
              height: 12,
              fontSize: 10,
              color: emailCodeChecked === "VALID" ? "#3c8869" : "#F14336",
            }}
          >
            {/* {renderEmailCodeCheckMessage()} */}
            {emailCodeChecked === "VALID"
              ? "이메일 인증이 완료되었습니다"
              : emailCheckErrorMessage.emailCheckCode}
          </Box>
        </Stack>
      )
    }

    return null
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
        <Box sx={{ width: 350 }}>
          <Box component="img" sx={{ width: "100%" }} src={signUpPageImage} />
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
                  fontSize: 24,
                  marginBottom: 3,
                  fontWeight: 900,
                }}
              >
                회원가입
              </Typography>
            </Box>
            <Stack spacing={1}>
              <InputLabel htmlFor="username">
                <Box display="flex">
                  <Box flexGrow={1} fontWeight={900} fontSize={14}>
                    아이디
                  </Box>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    sx={{
                      p: 0,
                      px: 1,
                      minWidth: 0,
                      fontWeight: 500,
                      fontSize: 10,
                    }}
                    onClick={checkUsername}
                  >
                    중복 확인
                  </Button>
                </Box>
              </InputLabel>
              <TextField
                value={signUpForm.username}
                onChange={onUsernameChanged}
                placeholder="아이디"
                variant="outlined"
                margin="none"
                size="small"
                error={!!checkUsernameErrorMessage}
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
              <Box
                height={12}
                fontSize={10}
                color={usernameCheck ? "#3c8869" : "#F14336"}
              >
                {usernameCheck
                  ? "사용 가능한 아이디 입니다"
                  : checkUsernameErrorMessage}
              </Box>
            </Stack>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="password"
                sx={{ fontWeight: 900, fontSize: 14 }}
              >
                비밀번호
              </InputLabel>
              <TextField
                type="password"
                value={signUpForm.password}
                onChange={onPasswordChanged}
                placeholder="비밀번호"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
              <Box height={12} sx={{ fontSize: 10, color: "#dda600" }}>
                6자리 이상 영문,숫자,특수기호 조합
              </Box>
            </Stack>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="passwordCheck"
                sx={{ fontWeight: 900, fontSize: 14 }}
              >
                비밀번호 확인
              </InputLabel>
              <TextField
                type="password"
                value={signUpForm.passwordCheck}
                onChange={onPasswordCheckChanged}
                placeholder="비밀번호 확인"
                variant="outlined"
                margin="none"
                size="small"
                inputProps={{
                  style: { fontSize: 12 },
                }}
              />
              <Box height={12} sx={{ fontSize: 10, color: "#dda600" }}>
                6자리 이상 영문,숫자,특수기호 조합
              </Box>
            </Stack>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="name"
                sx={{
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                이름
              </InputLabel>
              <TextField
                value={signUpForm.name}
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
                  <Box flexGrow={1} fontWeight={900} fontSize={14}>
                    이메일
                  </Box>
                  <Button
                    disableElevation
                    disabled={isSendEmailCodeFetching}
                    variant="contained"
                    color={!emailCodeSent ? "secondary" : "primary"}
                    sx={{
                      p: 0,
                      px: 1,
                      minWidth: 0,
                      fontWeight: 500,
                      fontSize: 10,
                    }}
                    onClick={
                      !emailCodeSent
                        ? () => {
                            setOpenEmailCodeInput(true)
                            sendEmailCode()
                          }
                        : () => {
                            setOpenEmailCodeInput(false)
                            resendEmailClick()
                          }
                    }
                  >
                    {!emailCodeSent ? "인증번호 전송" : "이메일 재입력"}
                  </Button>
                </Box>
              </InputLabel>
              <TextField
                value={signUpForm.email}
                onChange={onEmailChanged}
                placeholder="email@email.com"
                variant="outlined"
                margin="none"
                size="small"
                error={!!emailCheckErrorMessage.email}
                inputProps={{
                  style: { fontSize: 12 },
                  readOnly: emailCodeSent,
                }}
              />
              <Box
                sx={{
                  height: 12,
                  fontSize: 10,
                  color: emailCheckErrorMessage.email ? "#F14336" : "#dda600",
                }}
              >
                {emailCodeSent
                  ? "입력하신 이메일로 6자리 코드가 전송되었습니다."
                  : emailCheckErrorMessage.email}
              </Box>
            </Stack>
            {renderEmailCodeInput()}
            <Box display="flex" justifyContent="center">
              <Box width={300} mt={5}>
                <Stack height={40} direction="row" spacing={4}>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={() => signUp(() => navigate("/"))}
                  >
                    회원가입
                  </Button>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(-1)}
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
