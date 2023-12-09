import React, { useState } from "react"
import { Container, Stack, Box, Button } from "@mui/material"
import TitleDialog from "components/common/TitleDialog"
import { useParams } from "react-router-dom"
import { getWorkspaceNoticesStore } from "store/userStore"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"
import WorkspaceNoticeTitle from "../notice/WorkspaceNoticeTitle"
import WorkspaceNoticeList from "../notice/WorkspaceNoticeList"
import WorkspaceNoticeDetailView from "../notice/WorkspaceNoticeDetailView"
import CreateWorkspaceNotice from "../notice/CreateWorkspaceNotice"

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
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)
  const [notice, setNotice] = useState<WorkspaceNoticeDetail>()
  const handleNoticeClick = (noticeId: number) => {
    setSelectedNoticeId(noticeId)
    const selectedNotice = workspaceNotices.find(
      workspaceNotice => workspaceNotice.noticeId === noticeId,
    )
    setNotice(selectedNotice)
  }

  const handleCreateNotice = () => {
    setIsCreateMode(true)
  }

  return (
    <TitleDialog
      title={<WorkspaceNoticeTitle />}
      open={open}
      handleClose={() => {
        setSelectedNoticeId(null)
        setIsCreateMode(false)
        handleClose()
      }}
      height={500}
      maxWidth="lg"
      minWidth={1200}
    >
      {isCreateMode && workspaceId ? (
        <CreateWorkspaceNotice
          workspaceId={+workspaceId}
          onCancel={() => setIsCreateMode(false)}
        />
      ) : (
        <Stack direction="row" spacing={2} width="100%" height="100%">
          <Button
            sx={{ position: "absolute", right: 30 }}
            onClick={handleCreateNotice}
          >
            공지사항 생성
          </Button>
          <Container sx={{ border: 1, width: "35%" }}>
            <WorkspaceNoticeList
              workspaceNotices={workspaceNotices}
              onNoticeClick={handleNoticeClick}
            />
          </Container>
          <Container sx={{ border: 1, width: "65%" }}>
            {workspaceId && selectedNoticeId && notice ? (
              <WorkspaceNoticeDetailView
                workspaceId={+workspaceId}
                noticeId={selectedNoticeId}
                notice={notice}
              />
            ) : (
              <Box>
                공지사항 목록에서 상세보기 할 공지사항을 선택해주세요 😄
              </Box>
            )}
          </Container>
        </Stack>
      )}
    </TitleDialog>
  )
}

export default WorkspaceNoticeModal
