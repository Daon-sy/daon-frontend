import React from "react"
import { Box } from "@mui/material"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"

interface Props {
  workspaceNotice: WorkspaceNoticeDetail
  onClick: () => void
}

const WorkspaceNoticeCard: React.FC<Props> = ({
  workspaceNotice,
  onClick,
}: Props) => {
  return (
    <Box onClick={onClick} style={{ cursor: "pointer" }}>
      <Box>{workspaceNotice.writer.name}</Box>
      <Box>{workspaceNotice.title}</Box>
      <Box>{workspaceNotice.content}</Box>
      <Box>{workspaceNotice.createdAt}</Box>
    </Box>
  )
}

export default WorkspaceNoticeCard
