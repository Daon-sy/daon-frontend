import React from "react"
import { MessageSummary } from "_types/workspace"
import { TEST_IMAGE_URL } from "env"
import { Avatar, Box, Button, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

interface MessageCardProps {
  message: MessageSummary
  onDeleteMessageClick: (messageId: number) => void
  onReadMessageClick: (message: MessageSummary) => void
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onDeleteMessageClick,
  onReadMessageClick,
}) => {
  const handleReadMessageClick = () => {
    onReadMessageClick(message)
  }
  return (
    <Box sx={{ display: "flex", border: 1 }}>
      <Avatar src={message.sender.imageUrl || TEST_IMAGE_URL} />
      <Typography>{message.sender.name}</Typography>
      <Typography onClick={handleReadMessageClick}>
        {message.content}
      </Typography>
      <Button onClick={() => onDeleteMessageClick(message.messageId)}>
        <DeleteIcon sx={{ color: "lightGray" }} />
      </Button>
    </Box>
  )
}

export default MessageCard
