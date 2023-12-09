import React, { useState } from "react"
import { Container, Stack, Box } from "@mui/material"
import TitleDialog from "components/common/TitleDialog"
import { useParams } from "react-router-dom"
import { getWorkspaceNoticesStore } from "store/userStore"
import WorkspaceNoticeTitle from "../notice/WorkspaceNoticeTitle"
import WorkspaceNoticeList from "../notice/WorkspaceNoticeList"
import WorkspaceNoticeDetailView from "../notice/WorkspaceNoticeDetailView"

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceNoticeModal: React.FC<Props> = ({
  open,
  handleClose,
}: Props) => {
  const { workspaceId } = useParams()
  const { workspaceNotices } = getWorkspaceNoticesStore()
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null)

  const handleNoticeClick = (noticeId: number) => {
    setSelectedNoticeId(noticeId)
  }

  return (
    <TitleDialog
      title={<WorkspaceNoticeTitle />}
      open={open}
      handleClose={() => {
        setSelectedNoticeId(null)
        handleClose()
      }}
      height={500}
      maxWidth="lg"
      minWidth={1200}
    >
      <Stack direction="row" spacing={2} width="100%" height="100%">
        <Container sx={{ border: 1, width: "35%" }}>
          <WorkspaceNoticeList
            workspaceNotices={workspaceNotices}
            onNoticeClick={handleNoticeClick}
          />
        </Container>
        <Container sx={{ border: 1, width: "65%" }}>
          {workspaceId && selectedNoticeId ? (
            <WorkspaceNoticeDetailView
              workspaceId={+workspaceId}
              noticeId={selectedNoticeId}
            />
          ) : (
            <Box>공지사항 목록에서 상세보기 할 공지사항을 선택해주세요 😄</Box>
          )}
        </Container>
      </Stack>
    </TitleDialog>
  )
}

export default WorkspaceNoticeModal
