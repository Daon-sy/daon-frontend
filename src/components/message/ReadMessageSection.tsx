import React from "react"
import { Avatar, Box, Button, Divider, Typography } from "@mui/material"
import { MessageSender, MessageSummary } from "_types/workspace"
import { TEST_IMAGE_URL } from "env"
import { deleteMessageApi } from "api/workspace"

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
      <Box>
        <Button onClick={onBackButtonClick}>뒤로가기</Button>
        <Typography>쪽지 확인</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex" }}>
        <Avatar src={message?.sender.imageUrl || TEST_IMAGE_URL} />
        <Typography>{message?.sender.name}</Typography>
      </Box>
      <Typography>{message?.title}</Typography>
      <Typography>{message?.content}</Typography>
      <Typography>{message?.createdAt}</Typography>
      <Box>
        <Button onClick={handleReplyClick}>답장하기</Button>
        <Button onClick={handleDeleteClick}>삭제하기</Button>
      </Box>
    </Box>
  )
}

export default ReadMessageSection
