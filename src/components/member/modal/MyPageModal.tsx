import React from "react"
import TitleDialog from "components/common/TitleDialog"
import { Box, Divider } from "@mui/material"
import MemberInfoSection from "../MemberInfoSection"
import EmailInfoSection from "../EmailInfoSection"
import WithdrawSection from "../WithdrawSection"

interface MyPageProps {
  open: boolean
  handleClose: () => void
}

const MyPageModal = ({ open = false, handleClose }: MyPageProps) => {
  return (
    <TitleDialog
      title="마이페이지"
      open={open}
      handleClose={handleClose}
      maxWidth={720}
      minWidth={720}
      height={600}
    >
      <Box>
        <MemberInfoSection />
        <Divider />
        <EmailInfoSection />
        <Divider />
        <WithdrawSection />
      </Box>
    </TitleDialog>
  )
}

export default MyPageModal
