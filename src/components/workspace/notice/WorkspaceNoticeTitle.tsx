import { Box, Chip, Typography } from "@mui/material"
import React from "react"
import { getWorkspaceNoticesStore, getWorkspaceStore } from "store/userStore"

const WorkspaceNoticeTitle: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { totalCount } = getWorkspaceNoticesStore()
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Typography> 공지사항</Typography>
      <Chip label={totalCount} />
      <Typography> {workspace?.title} </Typography>
    </Box>
  )
}

export default WorkspaceNoticeTitle
