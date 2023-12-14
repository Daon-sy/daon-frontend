import React from "react"
import axios from "axios"
import TitleModal from "components/common/TitleModal"
import { Box, Button, TextField, Typography } from "@mui/material"
import {
  addEmailApi,
  checkVerificationEmailApi,
  sendVerificationEmailApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { ErrorResponse } from "api"
import CircularProgress from "@mui/material/CircularProgress"

interface Props {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const AddEmailModal = ({ open, handleClose, onSuccess }: Props) => {
  const { addSuccess } = useAlert()
  const [email, setEmail] = React.useState<string>("")
  const [sendEmail, setSendEmail] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>("")
  const [checkCode, setCheckCode] = React.useState<boolean | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isThrottledForSend, setIsThrottledForSend] =
    React.useState<boolean>(false)
  const [isThrottledForCheck, setIsThrottledForCheck] =
    React.useState<boolean>(false)
  const [isSending, setIsSending] = React.useState(false)

  const MINUTES_IN_MS = 10 * 60 * 1000
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

    if (checkCode || timeLeft <= 0) {
      clearInterval(timer)
      setTimeLeft(0)
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])

  const handleSendEmailClick = async () => {
    if (!email) {
      setError("* 이메일을 입력해 주세요.")
      return
    }
    if (!validateEmail(email)) {
      setError("* 올바르지 않은 이메일 양식입니다.")
      return
    }

    if (isThrottledForSend) {
      return
    }

    try {
      setError(null)
      setIsSending(true)
      await sendVerificationEmailApi({ email })
      setSendEmail(true)
      setTimeLeft(MINUTES_IN_MS)
      setCode("")
      setCheckCode(null)
      setIsThrottledForSend(true)
      setTimeout(() => {
        setIsThrottledForSend(false)
      }, 3000)
    } catch (e) {
      setSendEmail(false)
      if (axios.isAxiosError(e)) {
        const { response } = e
        const errorResponse = response?.data as ErrorResponse
        if (errorResponse.errorCode === 2004) {
          setIsThrottledForSend(false)
          setError("이미 사용중인 이메일입니다.")
        } else {
          setError("이메일 전송에 실패했습니다. 다시 입력해 주세요.")
        }
      }
    } finally {
      setIsSending(false)
    }
  }

  const handleRewriteEmailClick = () => {
    setEmail("")
    setSendEmail(false)
  }

  const handleCheckVerificationCodeClick = async () => {
    if (checkCode) {
      addSuccess("이미 인증 처리 되었습니다.")
      return
    }
    if (!code) {
      setCheckCode(false)
      return
    }
    try {
      if (!isThrottledForCheck) {
        setIsThrottledForCheck(true)
        await checkVerificationEmailApi({ email, code })
        setCheckCode(true)
        setTimeout(() => {
          setIsThrottledForCheck(false)
        }, 500)
      }
    } catch (e) {
      setError("인증번호 확인에 실패했습니다.")
      setCheckCode(false)
    }
  }

  const handleAddEmailClick = async () => {
    if (!checkCode || !validateEmail) {
      return
    }
    await addEmailApi({ email })
    addSuccess("이메일이 추가되었습니다.")
    onSuccess()
    handleClose()
  }

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="이메일 추가"
      maxWidth="xs"
      height={300}
    >
      <Typography
        sx={{ mb: 2, fontSize: 18, color: "#1F4838", fontWeight: "bold" }}
      >
        추가할 이메일 입력
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          sx={{ width: 265 }}
          required
          size="small"
          placeholder="gildong@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          inputProps={{
            maxLength: 100,
            readOnly: sendEmail,
          }}
          error={!!error}
          helperText={error}
        />
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          sx={{
            width: 120,
            height: 40,
          }}
          onClick={sendEmail ? handleRewriteEmailClick : handleSendEmailClick}
        >
          {sendEmail ? "이메일 재입력" : "인증번호 전송"}
        </Button>
      </Box>
      {sendEmail ? (
        <Box>
          <Typography sx={{ mt: 0.5, fontSize: 14, color: "#787878" }}>
            입력하신 이메일로 6자리 코드가 전송되었습니다.
          </Typography>
          <Box sx={{ display: "flex", mt: 2.5, mb: 2, alignItems: "center" }}>
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
              sx={{ width: 180 }}
              required
              size="small"
              error={checkCode === false}
              value={code}
              onChange={e => setCode(e.target.value)}
              inputProps={{
                maxLength: 6,
                readOnly: checkCode,
              }}
            />
            <Typography sx={{ fontSize: 13, color: "#3A4CA8" }}>
              {minutes} : {second}
            </Typography>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              sx={{
                width: 140,
                ml: 3,
              }}
              onClick={
                timeLeft === 0
                  ? handleSendEmailClick
                  : handleCheckVerificationCodeClick
              }
            >
              {timeLeft === 0 && !checkCode
                ? "인증번호 재전송"
                : "인증번호 확인"}
            </Button>
          </Box>
          {timeLeft === 0 && !checkCode ? (
            <Typography sx={{ mt: 0.5, fontSize: 14, color: "#787878" }}>
              인증 시간이 초과되었습니다.
            </Typography>
          ) : null}
          {checkCode !== null && timeLeft !== 0 && (
            <Typography sx={{ mt: 0.5, fontSize: 14, color: "#787878" }}>
              {checkCode
                ? "이메일 인증이 완료되었습니다."
                : "이메일 인증에 실패하였습니다. 다시 입력해 주세요."}
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          display={isSending ? "flex" : "none"}
          justifyContent={isSending ? "center" : "none"}
          mt={isSending ? "20px" : "none"}
        >
          <CircularProgress />
        </Box>
      )}
      <Button
        disableElevation
        variant="contained"
        color="primary"
        onClick={handleAddEmailClick}
        sx={{
          position: "absolute",
          width: 100,
          left: 190,
          bottom: 13,
          border: 1,
          color: checkCode ? "none" : "#787878",
          backgroundColor: checkCode ? "none" : "#F6F7F9",
        }}
      >
        추 가
      </Button>
    </TitleModal>
  )
}

export default AddEmailModal
