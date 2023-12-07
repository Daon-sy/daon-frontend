import React from "react"
import { Container, Stack } from "@mui/material"
import TitleDialog from "components/common/TitleDialog"
import WorkspaceNoticeTitle from "../notice/WorkspaceNoticeTitle"

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceNoticeModal: React.FC<Props> = ({
  open,
  handleClose,
}: Props) => {
  return (
    <TitleDialog
      title={<WorkspaceNoticeTitle />}
      open={open}
      handleClose={handleClose}
      height={500}
      maxWidth="lg"
      minWidth={1200}
    >
      <Stack direction="row" spacing={2} width="100%" height="100%">
        <Container sx={{ border: 1, width: "35%" }}>이건 목록</Container>
        <Container sx={{ border: 1, width: "65%" }}>이건 상세보기</Container>
      </Stack>
    </TitleDialog>
  )
}

export default WorkspaceNoticeModal
