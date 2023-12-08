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
  const handleReadMessageClick = async () => {
    onReadMessageClick(message)
  }
  return (
    <Box
      sx={{
        my: 1,
        display: "flex",
        border: 1,
        borderRadius: 1,
        borderColor: "lightGray",
        backgroundColor: message.readed ? "#FFF8DC" : "white",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box width="10%">
        <Avatar src={message.sender.imageUrl || TEST_IMAGE_URL} />
      </Box>
      <Box width="30%">
        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {message.sender.name}
        </Typography>
      </Box>
      <Box width="50%">
        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          onClick={handleReadMessageClick}
        >
          {message.title}
        </Typography>
      </Box>
      <Box width="10%" sx={{ pr: 1.5 }}>
        <Button onClick={() => onDeleteMessageClick(message.messageId)}>
          <DeleteIcon sx={{ color: "lightGray" }} />
        </Button>
      </Box>
    </Box>
  )
}

export default MessageCard
