import React from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import { MessageParticipantProfile, MessageSummary } from "_types/workspace"
import { deleteMessageApi } from "api/workspace"
import { useAlert } from "hooks/useAlert"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ConfirmDialog from "components/common/ConfirmDialog"
import ColorAvatar from "components/common/ColorAvatar"
import { ConfirmDeleteComponent } from "../common/confirm/ConfirmDelete"

interface ReadMessageSectionProps {
  workspaceId: number | undefined
  message: MessageSummary | null
  isSend: boolean
  onBackButtonClick: () => void
  onReplyClick: (sender: MessageParticipantProfile) => void
}

const ReadMessageSection = ({
  workspaceId,
  message,
  isSend,
  onBackButtonClick,
  onReplyClick,
}: ReadMessageSectionProps) => {
  const { addSuccess, addError } = useAlert()

  const [deleteMessageModalOpen, setDeleteMessageModalOpen] =
    React.useState<boolean>(false)

  const handleReplyClick = () => {
    if (message) {
      if (!message.profile) {
        addError("탈퇴한 사용자에게 쪽지를 보낼 수 없습니다.")
        return
      }
      onReplyClick(message.profile)
    }
  }

  const handleDeleteClick = async () => {
    setDeleteMessageModalOpen(true)
  }

  const deleteMessage = async () => {
    if (message && workspaceId) {
      await deleteMessageApi(workspaceId, message?.messageId)
      addSuccess("쪽지가 삭제되었습니다.")
      onBackButtonClick()
    }
  }

  return (
    <Box>
      <Box sx={{ height: 30, mb: 2, display: "flex", alignItems: "center" }}>
        <Button sx={{ minWidth: 0 }} onClick={onBackButtonClick}>
          <ArrowBackIosIcon sx={{ color: "#1F4838" }} />
        </Button>
        <Typography variant="h6" sx={{ color: "#1F4838" }}>
          {isSend ? "보낸 쪽지 확인" : "받은 쪽지 확인"}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ m: 2, my: 1, display: "flex", alignItems: "center" }}>
        <ColorAvatar
          sx={{ width: 20, height: 20 }}
          src={message?.profile?.imageUrl}
          id={message?.profile?.workspaceParticipantId}
        />
        <Typography sx={{ fontSize: 14 }}>
          {message?.profile ? message.profile.name : "탈퇴한 사용자"}
        </Typography>
      </Box>
      <Box sx={{ width: 380, display: "flex" }}>
        <Typography
          sx={{
            width: "100%",
            ml: 2,
            mt: 1,
            fontSize: 15,
            fontWeight: "bold",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {message?.title}
        </Typography>
      </Box>
      <Box
        sx={{
          border: 1,
          borderColor: "white",
          my: 1,
          mx: 2,
          minHeight: 350,
          maxHeight: 350,
          borderRadius: 2,
          backgroundColor: "#F6F7F9",
        }}
      >
        <Typography
          sx={{
            m: 0.5,
            fontSize: 12,
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {message?.content}
        </Typography>
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
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        {isSend ? null : (
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{
              m: 1.5,
              color: "white",
              backgroundColor: "#1F4838",
              border: 1,
              borderColor: "#1F4838",
            }}
            onClick={handleReplyClick}
          >
            답장하기
          </Button>
        )}
        <Button
          disableElevation
          variant={isSend ? "contained" : "outlined"}
          color="primary"
          sx={{ m: 1.5 }}
          onClick={handleDeleteClick}
        >
          삭제하기
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

export default ReadMessageSection
