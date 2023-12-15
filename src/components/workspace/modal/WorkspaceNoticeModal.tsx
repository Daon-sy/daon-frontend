import React, { useState } from "react"
import { Container, Stack, Box, Button } from "@mui/material"
import TitleDialog from "components/common/TitleDialog"
import { useParams } from "react-router-dom"
import { getWorkspaceStore } from "store/userStore"
import useFetchWorkspaceNoticeList from "hooks/workspace/useFetchWorkspaceNoticeList"
import NoData from "components/common/NoData"
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
  const { myProfile } = getWorkspaceStore()
  const { workspaceId } = useParams()
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null)
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)
  const { fetchWorkspaceNoticeList } = useFetchWorkspaceNoticeList(
    Number(workspaceId),
  )

  const handleNoticeClick = (noticeId: number) => {
    setSelectedNoticeId(noticeId)
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
        fetchWorkspaceNoticeList(0)
        handleClose()
      }}
      height={560}
      maxWidth="lg"
      minWidth={1200}
      top={24}
      right={32}
    >
      {isCreateMode && workspaceId ? (
        <CreateWorkspaceNotice
          workspaceId={+workspaceId}
          onCancel={() => setIsCreateMode(false)}
        />
      ) : (
        <Stack direction="row" width="100%" height="100%">
          {myProfile?.role === "WORKSPACE_ADMIN" ? (
            <Button
              variant="contained"
              color="yellow"
              sx={{
                position: "absolute",
                right: 76,
                top: 33,
                height: 20,
              }}
              onClick={handleCreateNotice}
            >
              +추가
            </Button>
          ) : null}
          {workspaceId && (
            <Box sx={{ width: "35%", padding: 0 }}>
              <WorkspaceNoticeList
                workspaceId={+workspaceId}
                onNoticeClick={handleNoticeClick}
              />
            </Box>
          )}

          <Container sx={{ width: "65%", overflow: "hidden" }}>
            {workspaceId && selectedNoticeId ? (
              <WorkspaceNoticeDetailView
                workspaceId={+workspaceId}
                noticeId={selectedNoticeId}
                onCancel={() => setSelectedNoticeId(null)}
              />
            ) : (
              <Box
                sx={{
                  border: "2px solid #dcdcdc",
                  height: "98%",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoData content="공지사항을 선택해 주세요." />
              </Box>
            )}
          </Container>
        </Stack>
      )}
    </TitleDialog>
  )
}

export default WorkspaceNoticeModal
