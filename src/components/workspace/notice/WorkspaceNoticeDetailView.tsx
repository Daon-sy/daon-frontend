import React, { useEffect } from "react"
import { Box, Button } from "@mui/material"
import useRemoveWorkspaceNotice from "hooks/workspace/useRemoveWorkspaceNotice"
import { getWorkspaceStore } from "store/userStore"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"
import ModifyWorkspaceNotice from "./ModifyWorkspaceNotice"

interface Props {
  workspaceId: number
  noticeId: number
  notice: WorkspaceNoticeDetail
}

const WorkspaceNoticeDetailView: React.FC<Props> = ({
  workspaceId,
  noticeId,
  notice,
}: Props) => {
  const { myProfile } = getWorkspaceStore()
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
          {isModifyMode ? (
            <ModifyWorkspaceNotice
              workspaceId={workspaceId}
              noticeId={noticeId}
              notice={notice}
              onCancel={() => setIsModifyMode(false)}
            />
          ) : (
            <Box>
              <Box>{notice.writer?.name}</Box>
              <Box>title: {notice.title}</Box>
              <Box>content: {notice.content}</Box>
              <Box>createdAt: {notice.createdAt}</Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default WorkspaceNoticeDetailView
