import React from "react"
import { Box, Button } from "@mui/material"
import useFetchWorkspaceNoticeDetail from "hooks/workspace/useFetchWorkspaceNoticeDetail"
import useRemoveWorkspaceNotice from "hooks/workspace/useRemoveWorkspaceNotice"
import { getWorkspaceStore } from "store/userStore"

interface Props {
  workspaceId: number
  noticeId: number
}

const WorkspaceNoticeDetailView: React.FC<Props> = ({
  workspaceId,
  noticeId,
}: Props) => {
  const { myProfile } = getWorkspaceStore()
  const { workspaceNotice } = useFetchWorkspaceNoticeDetail(
    workspaceId,
    noticeId,
  )
  const { removeNotice } = useRemoveWorkspaceNotice(workspaceId, noticeId)

  const handleRemoveNotice = () => {
    removeNotice()
  }

  return (
    <Box>
      {myProfile?.role === "WORKSPACE_ADMIN" ? (
        <Box>
          <Button>공지사항 생성</Button>
          <Button>공지사항 수정</Button>
          <Button onClick={handleRemoveNotice}>공지사항 삭제</Button>
        </Box>
      ) : null}
      {workspaceNotice ? (
        <Box>
          <Box>{workspaceNotice.writer?.name}</Box>
          <Box>title: {workspaceNotice.title}</Box>
          <Box>content: {workspaceNotice.content}</Box>
          <Box>createdAt: {workspaceNotice.createdAt}</Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default WorkspaceNoticeDetailView
