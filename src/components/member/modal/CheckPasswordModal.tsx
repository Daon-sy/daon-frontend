import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material"
import { modifyMyMemberInfoApi } from "api/member"
import { useAlert } from "hooks/useAlert"

interface Props {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
  modalInfo: {
    name: string | undefined
    newPassword: string
  }
}

const CheckPasswordModal = ({
  open,
  handleClose,
  onSuccess,
  modalInfo,
}: Props) => {
  const { addSuccess } = useAlert()
  const [prevPassword, setPrevPassword] = React.useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleConfirmClick = async () => {
    if (!prevPassword) {
      setError("* 비밀번호를 입력해 주세요.")
      return
    }

    const { name, newPassword } = modalInfo
    try {
      await modifyMyMemberInfoApi({ name, prevPassword, newPassword })
      onSuccess()
      handleClose()
      setError(null)
      addSuccess("회원 정보가 수정되었습니다.")
    } catch (e) {
      setError("* 비밀번호가 일치하지 않습니다.")
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ pb: 1 }}>
        <Typography>현재 비밀번호 입력</Typography>
        <TextField
          size="small"
          type="password"
          required
          value={prevPassword}
          onChange={e => setPrevPassword(e.target.value)}
          inputProps={{ maxLength: 30 }}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          sx={{
            height: 30,
            borderRadius: 1,
            color: "white",
            backgroundColor: "#1F4838",
          }}
          onClick={handleConfirmClick}
        >
          확인
        </Button>
        <Button
          sx={{
            height: 30,
            ml: 1.5,
            border: 1,
            borderRadius: 1,
            color: "#1F4838",
          }}
          onClick={handleClose}
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CheckPasswordModal
