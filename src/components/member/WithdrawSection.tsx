import { Box, Button } from "@mui/material"
import { withdrawApi } from "api/member"
import ConfirmDialog from "components/common/ConfirmDialog"
import React from "react"

const WithdrawSection: React.FC = () => {
  const [withdrawMemberModalOpen, setWithdrawMemberModalOpen] =
    React.useState<boolean>(false)

  const withdraw = async () => {
    await withdrawApi()
  }

  return (
    <Box>
      <Button onClick={() => setWithdrawMemberModalOpen(true)}>
        회원 탈퇴
      </Button>
      <ConfirmDialog
        open={withdrawMemberModalOpen}
        title="주의!!"
        content="회원 탈퇴가 진행되면 복구가 불가능합니다."
        handleConfirm={withdraw}
        handleClose={() => {
          setWithdrawMemberModalOpen(false)
        }}
      />
    </Box>
  )
}

export default WithdrawSection
