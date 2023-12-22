import { Box, Chip, Stack, Typography } from "@mui/material"
import React from "react"
import { getWorkspaceNoticesStore, getWorkspaceStore } from "store/userStore"

const WorkspaceNoticeTitle: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { totalCount } = getWorkspaceNoticesStore()
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 2,
        color: "white",
      }}
    >
      <Stack direction="row">
        {workspace?.division === "PERSONAL" ? (
          <Typography fontSize={24} sx={{ fontWeight: 400, mr: 0.5 }}>
            메모장
          </Typography>
        ) : (
          <Typography fontSize={24} sx={{ fontWeight: 400, mr: 0.5 }}>
            공지사항
          </Typography>
        )}

        <Chip
          size="small"
          sx={{
            position: "relative",
            bottom: -8,
            color: "rgba(150, 150, 150)",
            backgroundColor: "rgb(229,229,229)",
          }}
          label={totalCount}
        />
        <Typography
          color="#FFFFFF"
          fontSize={12}
          position="absolute"
          left={25}
          top={16}
        >
          {workspace?.title}
        </Typography>
      </Stack>
    </Box>
  )
}

export default WorkspaceNoticeTitle
