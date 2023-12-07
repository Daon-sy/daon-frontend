import { Box, Chip, Typography } from "@mui/material"
import React from "react"
import { getWorkspaceStore } from "store/userStore"

const WorkspaceNoticeTitle: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Typography> 공지사항</Typography>
      <Chip label="개수" />
      <Typography> {workspace?.title} </Typography>
    </Box>
  )
}

export default WorkspaceNoticeTitle
