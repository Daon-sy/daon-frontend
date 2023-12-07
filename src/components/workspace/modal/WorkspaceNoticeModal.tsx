import { Box } from "@mui/material"
import TitleDialog from "components/common/TitleDialog"
import React from "react"

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceNoticeModal: React.FC<Props> = ({
  open,
  handleClose,
}: Props) => {
  return (
    <TitleDialog title="공지사항" open={open} handleClose={handleClose}>
      <Box>ㅎ</Box>
    </TitleDialog>
  )
}

export default WorkspaceNoticeModal
