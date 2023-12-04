import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { withdrawApi } from "api/member"
import React from "react"
import { useNavigate } from "react-router-dom"
import { getTokenStore } from "store/tokenStore"

const WithdrawSection: React.FC = () => {
  const tokenState = getTokenStore()
  const navigate = useNavigate()
  const [withdrawMemberModalOpen, setWithdrawMemberModalOpen] =
    React.useState<boolean>(false)

  const withdraw = async () => {
    await withdrawApi()
    tokenState.clear()
    navigate("/")
  }

  return (
    <Box sx={{ mt: 13 }}>
      <Button
        sx={{ color: "#AE3A1E", fontSize: 12 }}
        onClick={() => setWithdrawMemberModalOpen(true)}
      >
        회원 탈퇴
      </Button>
      <Dialog
        open={withdrawMemberModalOpen}
        onClose={() => setWithdrawMemberModalOpen(false)}
      >
        <DialogTitle>회원 탈퇴</DialogTitle>
        <DialogContent>회원 탈퇴가 진행되면 복구가 불가능합니다.</DialogContent>
        <DialogActions>
          <Button onClick={withdraw}>회원 탈퇴</Button>
          <Button onClick={() => setWithdrawMemberModalOpen(false)}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WithdrawSection
