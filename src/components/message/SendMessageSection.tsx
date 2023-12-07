import React from "react"
import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { sendMessageApi } from "api/workspace"
import WorkspaceParticipantsModal from "components/workspace/modal/WorkspaceParticipantsModal"
import { MessageSender } from "_types/workspace"
import SelectReceiverButton from "./SelectReceiverButton"

interface SendMessageSectionProps {
  onBackButtonClick: () => void
  messageSender: MessageSender | null
}

const SendMessageSection = ({
  onBackButtonClick,
  messageSender,
}: SendMessageSectionProps) => {
  const { workspace } = getWorkspaceStore()

  const [workspaceParticipantsModalOpen, setWorkspaceParticipantsModalOpen] =
    React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>("")
  const [content, setContent] = React.useState<string>("")
  const [selectedReceiverId, setSelectedReceiverId] = React.useState<
    number | null
  >(null)

  React.useEffect(() => {
    if (messageSender) {
      setSelectedReceiverId(messageSender.workspaceParticipantId)
    }
  }, [])

  const handleSendMessageClick = async () => {
    if (workspace && workspace.workspaceId && selectedReceiverId !== null) {
      const requestBody = {
        title,
        content,
        workspaceParticipantId: selectedReceiverId,
      }
      sendMessageApi(workspace?.workspaceId, requestBody)
      onBackButtonClick()
    }
  }

  return (
    <Box>
      <Box>
        <Button onClick={onBackButtonClick}>뒤로가기</Button>
        <Typography>쪽지 보내기</Typography>
      </Box>
      <Divider />
      <Box sx={{ m: 2, mt: 4 }}>
        <Box sx={{ display: "flex" }}>
          <Typography>받는이</Typography>
          <SelectReceiverButton
            workspaceId={workspace?.workspaceId}
            messageSender={messageSender}
            onReceiverClick={workspaceParticipantId =>
              setSelectedReceiverId(workspaceParticipantId)
            }
          />
        </Box>
        <WorkspaceParticipantsModal
          open={workspaceParticipantsModalOpen}
          handleClose={() => setWorkspaceParticipantsModalOpen(false)}
        />
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ width: 50 }}>제목</Typography>
          <TextField
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Box>
        <Typography>{title.length}/50</Typography>
        <Box>
          <Typography>내용</Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Typography>{content.length}/500</Typography>
        </Box>
        <Button onClick={handleSendMessageClick}>쪽지 보내기</Button>
      </Box>
    </Box>
  )
}

export default SendMessageSection
