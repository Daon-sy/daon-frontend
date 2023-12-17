import React from "react"
import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { sendMessageApi } from "api/workspace"
import { MessageSender, WorkspaceParticipant } from "_types/workspace"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { useAlert } from "hooks/useAlert"
import SelectReceiverButton from "./SelectReceiverButton"

interface SendMessageSectionProps {
  onBackButtonClick: () => void
  messageSender: MessageSender | null
  messageReceiver: WorkspaceParticipant | undefined | null
}

const SendMessageSection = ({
  onBackButtonClick,
  messageSender,
  messageReceiver,
}: SendMessageSectionProps) => {
  const { workspace, myProfile } = getWorkspaceStore()
  const { addSuccess, addError } = useAlert()

  React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>("")
  const [content, setContent] = React.useState<string>("")
  const [selectedReceiverId, setSelectedReceiverId] = React.useState<
    number | null
  >(null)

  const [isThrottled, setIsThrottled] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (messageSender) {
      setSelectedReceiverId(messageSender.workspaceParticipantId)
    } else if (messageReceiver) {
      setSelectedReceiverId(messageReceiver.workspaceParticipantId)
    }
  }, [])

  const handleSendMessageClick = async () => {
    if (!selectedReceiverId) {
      addError("받는이를 선택해 주세요.")
      return
    }

    if (workspace && workspace.workspaceId) {
      if (title.length === 0) {
        addError("쪽지 제목은 필수값입니다.")
        return
      }
      if (selectedReceiverId === myProfile?.workspaceParticipantId) {
        addError("본인에게는 쪽지를 전송할 수 없습니다.")
        return
      }
      if (isThrottled) {
        return
      }

      const requestBody = {
        title,
        content,
        workspaceParticipantId: selectedReceiverId,
      }

      setIsThrottled(true)

      sendMessageApi(workspace?.workspaceId, requestBody)
      setTimeout(() => {
        setIsThrottled(false)
      }, 3000)
      addSuccess("쪽지가 전송되었습니다.")
      onBackButtonClick()
    }
  }

  const handleBackButtonClick = () => {
    setSelectedReceiverId(null)
    onBackButtonClick()
  }

  return (
    <Box>
      <Box sx={{ height: 30, mb: 2, display: "flex", alignItems: "center" }}>
        <Button sx={{ minWidth: 0 }} onClick={handleBackButtonClick}>
          <ArrowBackIosIcon sx={{ color: "#1F4838" }} />
        </Button>
        <Typography variant="h6" sx={{ color: "#1F4838" }}>
          쪽지 보내기
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ m: 2 }}>
        <Box sx={{ mb: 2.5, display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "20%" }}>
            <Typography sx={{ fontWeight: "bold" }}>받는이</Typography>
          </Box>
          <SelectReceiverButton
            workspaceId={workspace?.workspaceId}
            messageSender={messageSender}
            messageReceiver={messageReceiver}
            onReceiverClick={workspaceParticipantId =>
              setSelectedReceiverId(workspaceParticipantId)
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "20%", fontWeight: "bold" }}>
            제목
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Box>
        <Typography
          sx={{
            position: "absolute",
            right: 40,
            fontSize: 14,
            color: "lightGray",
          }}
        >
          {title.length}/50
        </Typography>
        <Box sx={{ mt: 3.5, mb: 1 }}>
          <Typography sx={{ fontWeight: "bold" }}>내용</Typography>
        </Box>
        <Box>
          <TextField
            sx={{ border: 0 }}
            fullWidth
            multiline
            rows={10}
            value={content}
            onChange={e => setContent(e.target.value)}
            inputProps={{
              maxLength: 500,
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              right: 40,
              fontSize: 14,
              color: "lightGray",
            }}
          >
            {content.length}/500
          </Typography>
        </Box>
        <Box sx={{ mt: 6.4, display: "flex", justifyContent: "center" }}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{
              border: 1,
              color: "white",
              backgroundColor: "#1F4838",
            }}
            onClick={handleSendMessageClick}
          >
            쪽지 보내기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SendMessageSection
