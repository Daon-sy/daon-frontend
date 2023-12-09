import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material"
import { withdrawApi } from "api/member"
import React from "react"
import { useNavigate } from "react-router-dom"
import { getTokenStore } from "store/tokenStore"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"

const WithdrawSection: React.FC = () => {
  const tokenState = getTokenStore()
  const navigate = useNavigate()

  const [withdrawMemberModalOpen, setWithdrawMemberModalOpen] =
    React.useState<boolean>(false)
  const [checkAgreement, setCheckAgreement] = React.useState<boolean>(false)

  const handleCheckboxChange = () => {
    setCheckAgreement(!checkAgreement)
  }

  const withdraw = async () => {
    if (!checkAgreement) {
      return
    }
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
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <WarningAmberIcon sx={{ mr: 1, color: "red" }} />
            <Typography sx={{ color: "red" }}>회원 탈퇴</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 300,
              p: 1,
              border: 1,
              borderRadius: 1,
              color: "lightGray",
            }}
          >
            <Typography sx={{ color: "#787878", lineHeight: 2 }}>
              회원 탈퇴가 진행되면 복구가 불가능합니다. 동의하시면 아래
              체크버튼을 클릭해 주세요.
            </Typography>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkAgreement}
                  onChange={handleCheckboxChange}
                />
              }
              label="동의합니다."
            />
          </FormGroup>
        </DialogContent>
        <DialogActions
          sx={{ mb: 1, display: "flex", justifyContent: "center" }}
        >
          <Button sx={{ color: "red" }} onClick={withdraw}>
            회원 탈퇴
          </Button>
          <Button onClick={() => setWithdrawMemberModalOpen(false)}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WithdrawSection
