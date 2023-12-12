import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputLabel,
} from "@mui/material"
import SignUpPageImage from "assets/img/sign-up.png"
import useSignUp from "hooks/member/useSignUp"
import useCheckUsername from "hooks/member/useCheckUsername"

const SignUp = () => {
  const navigate = useNavigate()
  const [code, setCode] = React.useState<string>("")

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

  const { emailCodeSent, emailCodeChecked, usernameCheck } = signUpForm

  const resendEmailClick = () => {
    setSignUpForm({
      ...signUpForm,
      email: "",
      emailCodeSent: false,
      emailCodeChecked: "NOT_CHECKED",
    })
    setCode("")
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
          <Box component="img" sx={{ width: "100%" }} src={SignUpPageImage} />
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
                    sx={{
                      p: 0,
                      minWidth: 0,
                      color: "#ecb317",
                      fontWeight: 500,
                      fontSize: 10,
                      textDecorationColor: "#ecb317",
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
                    sx={{
                      p: 0,
                      minWidth: 0,
                      color: !emailCodeSent ? "#ecb317" : "#3c8869",
                      fontWeight: 500,
                      fontSize: 10,
                      textDecorationColor: "#ecb317",
                    }}
                    onClick={!emailCodeSent ? sendEmailCode : resendEmailClick}
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
                  fontSize: 10,
                  color: emailCheckErrorMessage.email ? "#F14336" : "#dda600",
                }}
              >
                {emailCodeSent
                  ? "입력하신 이메일로 6자리 코드가 전송되었습니다."
                  : emailCheckErrorMessage.email}
              </Box>
            </Stack>
            {emailCodeSent ? (
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
                        sx={{
                          p: 0,
                          minWidth: 0,
                          textAlign: "right",
                          color: "#F14336",
                          fontWeight: 500,
                          fontSize: 10,
                          textDecorationColor: "#ecb317",
                        }}
                        onClick={sendEmailCode}
                      >
                        인증번호 재전송
                      </Button>
                    ) : null}
                    {emailCodeChecked !== "VALID" && timeLeftEmailCheck > 0 ? (
                      <Button
                        sx={{
                          p: 0,
                          minWidth: 0,
                          textAlign: "right",
                          color: "#ecb317",
                          fontWeight: 500,
                          fontSize: 10,
                          textDecorationColor: "#ecb317",
                        }}
                        onClick={() => checkEmailCode(code)}
                      >
                        인증번호 확인
                      </Button>
                    ) : null}
                  </Box>
                </InputLabel>
                <TextField
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  variant="outlined"
                  margin="none"
                  size="small"
                  error={emailCodeChecked === "INVALID"}
                  inputProps={{
                    style: { fontSize: 12 },
                    readOnly: emailCodeChecked === "VALID",
                  }}
                />
                <Box
                  style={{
                    fontSize: 10,
                    color: emailCodeChecked === "VALID" ? "#3c8869" : "#F14336",
                  }}
                >
                  {emailCodeChecked === "VALID"
                    ? "이메일 인증이 완료되었습니다."
                    : null}
                  {emailCodeChecked === "INVALID"
                    ? emailCheckErrorMessage.emailCheckCode
                    : null}
                </Box>
              </Stack>
            ) : null}
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
