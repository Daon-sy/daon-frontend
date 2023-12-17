import React from "react"
import { MessageSummary } from "_types/workspace"
import { Box, Button, Tooltip, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ColorAvatar from "components/common/ColorAvatar"
import { ConfirmDialog } from "components/common/ConfirmDialog"
import { ConfirmDeleteComponent } from "../common/confirm/ConfirmDelete"

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
  const [deleteMessageModalOpen, setDeleteMessageModalOpen] =
    React.useState<boolean>(false)

  const handleReadMessageClick = async () => {
    onReadMessageClick(message)
  }

  const deleteMessage = () => {
    onDeleteMessageClick(message.messageId)
  }

  return (
    <Box
      sx={{
        width: 394,
        display: "flex",
        border: 1,
        borderRadius: 1,
        borderColor: "lightGray",
        backgroundColor: message.readed ? "white" : "#FFF8DC",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ ml: 1, width: 39 }}>
        <ColorAvatar
          sx={{ width: 27, height: 27 }}
          src={message.sender?.imageUrl}
          id={message.sender?.workspaceParticipantId}
        />
      </Box>
      <Box>
        <Tooltip
          title={message.sender ? message.sender.name : "탈퇴한 사용자"}
          disableInteractive
        >
          <Typography
            sx={{ ml: 0.5, width: 121 }}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {message.sender ? message.sender.name : "탈퇴한 사용자"}
          </Typography>
        </Tooltip>
      </Box>
      <Box>
        <Typography
          sx={{ ml: 0.5, width: 181, cursor: "pointer" }}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          onClick={handleReadMessageClick}
        >
          {message.title}
        </Typography>
      </Box>
      <Box>
        <Button onClick={() => setDeleteMessageModalOpen(true)}>
          <DeleteIcon sx={{ color: "lightGray" }} />
        </Button>
        <ConfirmDialog
          open={deleteMessageModalOpen}
          handleClose={() => setDeleteMessageModalOpen(false)}
          handleConfirm={deleteMessage}
        >
          <ConfirmDeleteComponent
            title="해당 쪽지를 삭제하시겠습니까"
            contents="한번 삭제된 쪽지는 복구가 불가능합니다"
          />
        </ConfirmDialog>
      </Box>
    </Box>
  )
}

export default MessageCard
