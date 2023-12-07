import React from "react"
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { MessageSummary, Workspace } from "_types/workspace"
import {
  deleteMessageApi,
  findMessageListApi,
  readAllMessageListApi,
} from "api/workspace"
import MessageCard from "./MessageCard"

interface MessageListSectionProps {
  workspace: Workspace | null | undefined
  onSendMessageClick: () => void
  onReadMessageClick: (
    message: MessageSummary,
    workspaceId: number | undefined,
  ) => void
}

const MessageListSection = ({
  workspace,
  onSendMessageClick,
  onReadMessageClick,
}: MessageListSectionProps) => {
  const [messages, setMessages] = React.useState<MessageSummary[]>([])

  const fetchMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      const response = await findMessageListApi(workspace?.workspaceId)
      setMessages(response.data.content)
    }
  }

  React.useEffect(() => {
    if (workspace && workspace.workspaceId) {
      fetchMessages()
    }
  }, [])

  const handleDeleteMessageClick = async (messageId: number) => {
    if (workspace?.workspaceId !== undefined) {
      await deleteMessageApi(workspace?.workspaceId, messageId)
      fetchMessages()
    }
  }

  const handleReadMessageClick = (
    message: MessageSummary,
    workspaceId: number | undefined,
  ) => {
    onReadMessageClick(message, workspaceId)
  }

  const handleReadAllMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      await readAllMessageListApi(workspace.workspaceId)
      fetchMessages()
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Typography>다온 쪽지</Typography>
        <Chip
          label="2"
          variant="outlined"
          size="small"
          sx={{
            border: 0,
            marginLeft: 1,
            fontSize: 16,
            fontWeight: 900,
            color: "rgba(150, 150, 150)",
            backgroundColor: "rgb(229,229,229)",
          }}
        />
        <Button onClick={() => handleReadAllMessages()}>쪽지 모두 읽기</Button>
      </Box>
      <Divider />
      <Box>
        <Box sx={{ display: "flex" }}>
          <FormControl>
            <Select size="small">
              <MenuItem>제목</MenuItem>
              <MenuItem>내용</MenuItem>
              <MenuItem>보낸이</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoComplete="off"
            size="small"
            sx={{
              fontSize: 14,
            }}
            placeholder="쪽지 검색"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button onClick={onSendMessageClick}>쪽지 보내기</Button>
        </Box>
        <Box>
          {messages.map(message => (
            <MessageCard
              key={message.messageId}
              message={message}
              onDeleteMessageClick={() =>
                handleDeleteMessageClick(message.messageId)
              }
              onReadMessageClick={() =>
                handleReadMessageClick(message, workspace?.workspaceId)
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default MessageListSection
