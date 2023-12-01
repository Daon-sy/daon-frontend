import React from "react"
import TitleModal from "components/common/TitleModal"
import { Box, Button, TextField, Typography } from "@mui/material"

interface Props {
  open: boolean
  handleClose: () => void
}

const CheckPasswordModal = ({ open, handleClose }: Props) => {
  const [prevPassword, setPrevPassword] = React.useState<string>("")
  const [newPassword, setNewPassword] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      maxWidth="xs"
      height={350}
    >
      <Box sx={{ height: 85, mt: 5 }}>
        <Typography sx={{ mb: 0.5, color: "#1F4838", fontSize: 14 }}>
          새 비밀번호 입력
        </Typography>
        <TextField
          size="small"
          type="password"
          helperText="* 비밀번호는 30자 이내여야 합니다."
          fullWidth
          required
          autoComplete="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
      </Box>
      <Box sx={{ height: 85 }}>
        <Typography sx={{ mt: 1.5, mb: 0.5, color: "#1F4838", fontSize: 14 }}>
          새 비밀번호 확인
        </Typography>
        <TextField
          size="small"
          type="password"
          fullWidth
          required
          error={newPassword !== confirmPassword}
          helperText={
            newPassword !== confirmPassword
              ? "* 비밀번호가 일치하지 않습니다."
              : undefined
          }
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          inputProps={{ maxLength: 30 }}
          color={newPassword !== confirmPassword ? "error" : undefined}
        />
      </Box>
      <Box>
        <Typography sx={{ mt: 1.5, mb: 0.5, color: "#1F4838", fontSize: 14 }}>
          현재 비밀번호 입력 *
        </Typography>
        <TextField
          size="small"
          type="password"
          fullWidth
          required
          autoComplete="password"
          value={prevPassword}
          onChange={e => setPrevPassword(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button sx={{ height: 30, minWidth: 10, border: 1 }}>수정</Button>
      </Box>
    </TitleModal>
  )
}

export default CheckPasswordModal
