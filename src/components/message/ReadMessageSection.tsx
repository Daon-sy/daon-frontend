import React from "react"
import { Avatar, Box, Button, Divider, Typography } from "@mui/material"
import { MessageSender, MessageSummary } from "_types/workspace"
import { TEST_IMAGE_URL } from "env"
import { deleteMessageApi } from "api/workspace"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

interface ReadMessageSectionProps {
  workspaceId: number | undefined
  message: MessageSummary | null
  onBackButtonClick: () => void
  onReplyClick: (sender: MessageSender) => void
}

const ReadMessageSection = ({
  workspaceId,
  message,
  onBackButtonClick,
  onReplyClick,
}: ReadMessageSectionProps) => {
  const handleReplyClick = () => {
    if (message) {
      onReplyClick(message.sender)
    }
  }

  const handleDeleteClick = async () => {
    if (message && workspaceId) {
      await deleteMessageApi(workspaceId, message?.messageId)
    }
    onBackButtonClick()
  }

  return (
    <Box>
      <Box sx={{ height: 30, mb: 2, display: "flex", alignItems: "center" }}>
        <Button sx={{ minWidth: 0 }} onClick={onBackButtonClick}>
          <ArrowBackIosIcon sx={{ color: "#1F4838" }} />
        </Button>
        <Typography variant="h6" sx={{ color: "#1F4838" }}>
          쪽지 확인
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ m: 2, my: 2, display: "flex", alignItems: "center" }}>
        <Avatar src={message?.sender.imageUrl || TEST_IMAGE_URL} />
        <Typography>{message?.sender.name}</Typography>
      </Box>
      <Typography sx={{ m: 2, pl: 1, fontSize: 18, fontWeight: "bold" }}>
        {message?.title}
      </Typography>
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          my: 1,
          mx: 2,
          minHeight: 300,
          maxHeight: 300,
          borderRadius: 2,
          backgroundColor: "#F6F7F9",
        }}
      >
        <Typography sx={{ m: 1 }}>{message?.content}</Typography>
      </Box>
      <Typography
        sx={{
          mx: 2,
          position: "absolute",
          right: 30,
          fontSize: 14,
          color: "lightGray",
        }}
      >
        {message?.createdAt}
      </Typography>
      <Box sx={{ mt: 7, display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            m: 1.5,
            color: "white",
            backgroundColor: "#1F4838",
            border: 1,
            borderColor: "#1F4838",
            ":hover": {
              backgroundColor: "#FFBE00",
              borderColor: "#FFBE00",
            },
          }}
          onClick={handleReplyClick}
        >
          답장하기
        </Button>
        <Button
          sx={{ m: 1.5, color: "#1F4838", border: 1, borderColor: "lightGray" }}
          onClick={handleDeleteClick}
        >
          삭제하기
        </Button>
      </Box>
    </Box>
  )
}

export default ReadMessageSection
