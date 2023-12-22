import React from "react"
import { MessageSummary } from "_types/workspace"
import { Box, Button, Tooltip, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ColorAvatar from "components/common/ColorAvatar"
import { ConfirmDialog } from "components/common/ConfirmDialog"
import { ConfirmDeleteComponent } from "../common/confirm/ConfirmDelete"

interface MessageCardProps {
  message: MessageSummary
  isSend: boolean
  onDeleteMessageClick: (messageId: number) => void
  onReadMessageClick: (message: MessageSummary, isSend: boolean) => void
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isSend,
  onDeleteMessageClick,
  onReadMessageClick,
}) => {
  const [deleteMessageModalOpen, setDeleteMessageModalOpen] =
    React.useState<boolean>(false)

  const handleReadMessageClick = async () => {
    onReadMessageClick(message, isSend)
  }

  const deleteMessage = () => {
    onDeleteMessageClick(message.messageId)
  }

  return (
    <Box>
      {isSend ? (
        <Box
          sx={{
            width: 394,
            display: "flex",
            border: 1,
            borderRadius: 1,
            borderColor: "lightGray",
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ ml: 1, width: 39 }}>
            <ColorAvatar
              sx={{ width: 27, height: 27 }}
              src={message.profile?.imageUrl}
              id={message.profile?.workspaceParticipantId}
            />
          </Box>
          <Box>
            <Tooltip
              title={message.profile ? message.profile.name : "탈퇴한 사용자"}
              disableInteractive
            >
              <Typography
                sx={{ ml: 0.5, width: 121 }}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {message.profile ? message.profile.name : "탈퇴한 사용자"}
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
      ) : (
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
              src={message.profile?.imageUrl}
              id={message.profile?.workspaceParticipantId}
            />
          </Box>
          <Box>
            <Tooltip
              title={message.profile ? message.profile.name : "탈퇴한 사용자"}
              disableInteractive
            >
              <Typography
                sx={{ ml: 0.5, width: 121 }}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {message.profile ? message.profile.name : "탈퇴한 사용자"}
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
      )}
    </Box>
  )
}

export default MessageCard
