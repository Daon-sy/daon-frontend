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
import { useAlert } from "hooks/useAlert"
import { ConfirmMemberWithdrawalComponent } from "components/common/confirm/withdrawal/ConfirmMemberWithdrawal"

const WithdrawSection: React.FC = () => {
  const tokenState = getTokenStore()
  const navigate = useNavigate()
  const { addSuccess, addError } = useAlert()

  const [withdrawMemberModalOpen, setWithdrawMemberModalOpen] =
    React.useState<boolean>(false)
  const [checkAgreement, setCheckAgreement] = React.useState<boolean>(false)

  const handleCheckboxChange = () => {
    setCheckAgreement(!checkAgreement)
  }

  const withdraw = async () => {
    if (!checkAgreement) {
      addError("탈퇴 동의 버튼을 클릭해 주세요.")
      return
    }
    await withdrawApi()
    addSuccess("회원 탈퇴가 정상 처리되었습니다.")
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
          <ConfirmMemberWithdrawalComponent />
        </DialogTitle>
        <DialogContent>
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
