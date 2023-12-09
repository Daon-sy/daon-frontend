import React, { useEffect } from "react"
import { Box, Button } from "@mui/material"
import useRemoveWorkspaceNotice from "hooks/workspace/useRemoveWorkspaceNotice"
import { getWorkspaceStore } from "store/userStore"
import useFetchWorkspaceNoticeDetail from "hooks/workspace/useFetchWorkspaceNoticeDetail"
import ModifyWorkspaceNotice from "./ModifyWorkspaceNotice"

interface Props {
  workspaceId: number
  noticeId: number
}

const WorkspaceNoticeDetailView: React.FC<Props> = ({
  workspaceId,
  noticeId,
}: Props) => {
  const { myProfile } = getWorkspaceStore()
  const { workspaceNotice, fetchWorkspaceNoticeDetail } =
    useFetchWorkspaceNoticeDetail(workspaceId, noticeId)
  const { removeNotice } = useRemoveWorkspaceNotice(workspaceId, noticeId)
  const [noData, setIsNoData] = React.useState(false)
  const [isModifyMode, setIsModifyMode] = React.useState(false)

  const handleRemoveNotice = () => {
    removeNotice()
    setIsNoData(true)
  }

  const handleModifyNotice = () => {
    setIsModifyMode(true)
  }

  useEffect(() => {
    setIsNoData(false)
  }, [noticeId])

  useEffect(() => {
    fetchWorkspaceNoticeDetail()
  }, [isModifyMode])

  return (
    <Box>
      {noData ? (
        <Box>삭제</Box>
      ) : (
        <Box>
          {myProfile?.role === "WORKSPACE_ADMIN" ? (
            <Box>
              <Button onClick={handleModifyNotice}>공지사항 수정</Button>
              <Button onClick={handleRemoveNotice}>공지사항 삭제</Button>
            </Box>
          ) : null}
          {isModifyMode && workspaceNotice ? (
            <ModifyWorkspaceNotice
              workspaceId={workspaceId}
              noticeId={noticeId}
              notice={workspaceNotice}
              onCancel={() => setIsModifyMode(false)}
            />
          ) : (
            workspaceNotice && (
              <Box>
                <Box>{workspaceNotice.writer?.name}</Box>
                <Box>title: {workspaceNotice.title}</Box>
                <Box>content: {workspaceNotice.content}</Box>
                <Box>createdAt: {workspaceNotice.createdAt}</Box>
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  )
}

export default WorkspaceNoticeDetailView
