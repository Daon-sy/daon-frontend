import React from "react"
import { Box, Typography } from "@mui/material"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"

interface Props {
  workspaceNotice: WorkspaceNoticeDetail
  onClick: () => void
  isSelected: boolean
}

const WorkspaceNoticeCard: React.FC<Props> = ({
  workspaceNotice,
  onClick,
  isSelected,
}: Props) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        mb: "10px",
        cursor: "pointer",
        border: "1px solid #d3d3d3",
        borderRadius: 1,
        height: "20%",
        paddingY: "2%",
        paddingX: "4%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "relative",
        fontSize: 12,
        bgcolor: isSelected ? "white" : "#f6f7f9",
        boxShadow: isSelected ? "3px 3px 3px 1px #d8d8d7" : "none",
      }}
    >
      <Typography sx={{ color: "#1f4838", fontSize: 12 }}>
        {workspaceNotice.writer.name}
      </Typography>
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 700,
          height: 24,
          lineHeight: "24px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          wordBreak: "break-word",
          WebkitBoxOrient: "vertical",
          color: "#595959",
        }}
      >
        📌 {workspaceNotice.title}
      </Box>
      <Box
        sx={{
          display: "-webkit-box",
          height: 32,
          lineHeight: "15px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: 2,
          wordBreak: "break-word",
          WebkitBoxOrient: "vertical",
          color: "#595959",
        }}
      >
        {workspaceNotice.content}
      </Box>
      <Box sx={{ position: "absolute", top: 14, right: 16, color: "#bababa" }}>
        {workspaceNotice.createdAt}
      </Box>
    </Box>
  )
}

export default WorkspaceNoticeCard
