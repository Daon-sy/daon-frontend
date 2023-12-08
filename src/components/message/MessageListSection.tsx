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
  findMessageApi,
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
  const [allMessages, setAllMessages] = React.useState<MessageSummary[]>([])
  const [searchOption, setSearchOption] = React.useState<string>("title")
  const [searchText, setSearchText] = React.useState<string>("")
  const [filteredMessages, setFilterMessages] = React.useState<
    MessageSummary[]
  >([])

  const filterMessages = (
    option: string,
    text: string,
    messages: MessageSummary[],
  ) => {
    const filtered = messages.filter(message => {
      switch (option) {
        case "title":
          return message.title
            .toLowerCase()
            .trim()
            .includes(text.toLowerCase().trim())
        case "sender":
          return message.sender.name
            .toLowerCase()
            .trim()
            .includes(text.toLowerCase().trim())
        default:
          return null
      }
    })
    setFilterMessages(filtered)
  }

  const fetchMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      const response = await findMessageListApi(workspace?.workspaceId)
      const messages = response.data.content
      setAllMessages(messages)
      filterMessages(searchOption, searchText, messages)
    }
  }

  React.useEffect(() => {
    if (workspace && workspace.workspaceId) {
      fetchMessages()
    }
  }, [])

  React.useEffect(() => {
    filterMessages(searchOption, searchText, allMessages)
  }, [searchOption, searchText, allMessages])

  const handleDeleteMessageClick = async (messageId: number) => {
    if (workspace?.workspaceId !== undefined) {
      await deleteMessageApi(workspace?.workspaceId, messageId)
      fetchMessages()
    }
  }

  const handleReadMessageClick = async (
    message: MessageSummary,
    workspaceId: number | undefined,
  ) => {
    if (workspaceId) {
      await findMessageApi(workspaceId, message.messageId)
      onReadMessageClick(message, workspaceId)
    }
  }

  const handleReadAllMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      await readAllMessageListApi(workspace.workspaceId)
      fetchMessages()
    }
  }

  return (
    <Box>
      <Box sx={{ height: 30, mb: 2, display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: "#1F4838" }}>
          다온 쪽지
        </Typography>
        <Chip
          label={allMessages.length}
          variant="outlined"
          size="small"
          sx={{
            border: 0,
            marginLeft: 1,
            fontSize: 10,
            fontWeight: 900,
            color: "rgba(150, 150, 150)",
            backgroundColor: "rgb(229,229,229)",
          }}
        />
        <Button
          sx={{ pt: 2, fontSize: 12 }}
          onClick={() => handleReadAllMessages()}
        >
          쪽지 모두 읽기
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "29%" }}>
            <Select
              size="small"
              value={searchOption}
              onChange={e => setSearchOption(e.target.value as string)}
            >
              <MenuItem value="title">제목</MenuItem>
              <MenuItem value="sender">보낸이</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoComplete="off"
            size="small"
            sx={{
              width: "45%",
              fontSize: 14,
            }}
            placeholder="쪽지 검색"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              border: 1,
              backgroundColor: "#1F4838",
              color: "white",
              ":hover": {
                backgroundColor: "#FFBE00",
                borderColor: "#FFBE00",
              },
            }}
            onClick={onSendMessageClick}
          >
            쪽지 보내기
          </Button>
        </Box>
        <Box>
          {filteredMessages.map(message => (
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
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Typography m={1}>1</Typography>
          <Typography m={1}>2</Typography>
          <Typography m={1}>3</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default MessageListSection
