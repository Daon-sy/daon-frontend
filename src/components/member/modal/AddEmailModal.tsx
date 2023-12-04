import React from "react"
import TitleModal from "components/common/TitleModal"
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material"
import {
  addEmailApi,
  checkVerificationEmailApi,
  sendVerificationEmailApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"

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
  const [progress, setProgress] = React.useState<number>(-1)

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
      await sendVerificationEmailApi({ email })
    } finally {
      clearInterval(progressInterval)
      setProgress(100)
    }
    setSendEmail(true)
    setTimeLeft(MINUTES_IN_MS)
  }

  const handleCheckVerificationCodeClick = async () => {
    const verifiedData = await checkVerificationEmailApi({ email, code })
    if (verifiedData.data.verified) {
      setCheckCode(true)
    } else {
      setCheckCode(false)
    }
  }

  const handleAddEmailClick = async () => {
    if (!checkCode) {
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
          sx={{ width: 285 }}
          required
          size="small"
          placeholder="gildong@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          inputProps={{ maxLength: 20 }}
        />
        <Button
          sx={{ color: "white", backgroundColor: "#FFBE00" }}
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
      {checkCode ? (
        <Button
          onClick={handleAddEmailClick}
          sx={{
            position: "absolute",
            width: 100,
            left: 190,
            bottom: 13,
            border: 1,
            color: "white",
            backgroundColor: "#1F4838",
          }}
        >
          추 가
        </Button>
      ) : (
        <Button
          onClick={handleAddEmailClick}
          sx={{
            position: "absolute",
            width: 100,
            left: 190,
            bottom: 13,
            border: 1,
            color: "#787878",
            backgroundColor: "#F6F7F9",
          }}
        >
          추 가
        </Button>
      )}
    </TitleModal>
  )
}

export default AddEmailModal
