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
  mainNoticeId?: number | null
}

const WorkspaceNoticeModal: React.FC<Props> = ({
  open,
  handleClose,
  mainNoticeId = null,
}: Props) => {
  const { myProfile, workspace } = getWorkspaceStore()
  const { workspaceId } = useParams()
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null)
  const [mainId, setMainId] = useState<number | null>(mainNoticeId)
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)
  const [isManageMode, setManageMode] = useState<boolean>(false)
  const { fetchWorkspaceNoticeList } = useFetchWorkspaceNoticeList(
    Number(workspaceId),
  )

  React.useEffect(() => {
    if (mainId) {
      setSelectedNoticeId(mainId)
    }
    setMainId(null)
  }, [mainId])

  const handleNoticeClick = (noticeId: number) => {
    setSelectedNoticeId(noticeId)
    setManageMode(false)
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
      top={22}
      right={28}
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
                top: 24,
              }}
              onClick={handleCreateNotice}
            >
              +추가
            </Button>
          ) : null}
          {isManageMode && (
            <Box sx={{ width: "35%", padding: 0 }}>
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
                <NoData content="수정 및 삭제 중입니다." />
              </Box>
            </Box>
          )}
          {workspaceId && !isManageMode && (
            <Box sx={{ width: "35%", padding: 0 }}>
              <WorkspaceNoticeList
                workspaceId={+workspaceId}
                mainId={mainId}
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
                onManageMode={() => setManageMode(true)}
                offManageMode={() => setManageMode(false)}
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
                {workspace?.division === "PERSONAL" ? (
                  <NoData content="메모장을 선택해 주세요." />
                ) : (
                  <NoData content="공지사항을 선택해 주세요." />
                )}
              </Box>
            )}
          </Container>
        </Stack>
      )}
    </TitleDialog>
  )
}

export default WorkspaceNoticeModal
