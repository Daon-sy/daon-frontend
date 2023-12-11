import { Box, Chip, Stack, Typography } from "@mui/material"
import React from "react"
import { getWorkspaceNoticesStore, getWorkspaceStore } from "store/userStore"
import { useTheme } from "@mui/system"

const WorkspaceNoticeTitle: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { totalCount } = getWorkspaceNoticesStore()
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 2,
      }}
    >
      <Stack direction="row">
        <Typography
          color={theme.palette.primary.main}
          fontSize={24}
          sx={{ fontWeight: 400, mr: 0.5 }}
        >
          공지사항
        </Typography>
        <Chip
          size="small"
          sx={{
            position: "relative",
            bottom: -8,
          }}
          label={totalCount}
        />
      </Stack>
      <Typography color="#8d8d8d" fontSize={12} position="relative" right={-4}>
        {workspace?.title}
      </Typography>
    </Box>
  )
}

export default WorkspaceNoticeTitle
