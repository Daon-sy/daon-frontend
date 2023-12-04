import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material"
import { modifyMyMemberInfoApi } from "api/member"

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
  const [prevPassword, setPrevPassword] = React.useState<string>("")

  const handleConfirmClick = async () => {
    const { name, newPassword } = modalInfo
    await modifyMyMemberInfoApi({ name, prevPassword, newPassword })
    onSuccess()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography>현재 비밀번호 입력</Typography>
        <TextField
          size="small"
          type="password"
          required
          value={prevPassword}
          onChange={e => setPrevPassword(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
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
