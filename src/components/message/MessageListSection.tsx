import React from "react"
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
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
import { Stack } from "@mui/system"
import { ConfirmDialog } from "components/common/ConfirmDialog"
import { useAlert } from "hooks/useAlert"
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
  const { addSuccess, addError } = useAlert()

  const [allMessages, setAllMessages] = React.useState<MessageSummary[]>([])
  const [searchOption, setSearchOption] = React.useState<string>("none")
  const [searchText, setSearchText] = React.useState<string>("")
  const [totalPage, setTotalPage] = React.useState<number>(1)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [readAllMessagesModalOpen, setReadAllMessagesModalOpen] =
    React.useState<boolean>(false)

  const [isThrottled, setIsThrottled] = React.useState<boolean>(false)

  const fetchMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      if (isThrottled) {
        return
      }
      setIsThrottled(true)

      const response = await findMessageListApi(
        workspace?.workspaceId,
        searchOption,
        searchText,
      )
      const messages = response.data.content
      setAllMessages(messages)
      setTotalPage(response.data.totalPage)

      setTimeout(() => {
        setIsThrottled(false)
      }, 500)
    }
  }

  React.useEffect(() => {
    if (workspace && workspace.workspaceId) {
      fetchMessages()
    }
  }, [])

  const handleSearchClick = () => {
    if (searchOption === "none") {
      addError("검색 카테고리를 선택해 주세요.")
      return
    }

    fetchMessages()
  }

  const handleDeleteMessageClick = async (messageId: number) => {
    if (workspace?.workspaceId !== undefined) {
      await deleteMessageApi(workspace?.workspaceId, messageId)
      addSuccess("쪽지가 삭제되었습니다.")
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

  const readAllMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      await readAllMessageListApi(workspace.workspaceId)
      addSuccess("쪽지가 모두 읽음 처리되었습니다.")
      fetchMessages()
      setReadAllMessagesModalOpen(false)
    }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  const pageSize = 7
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentMessages = allMessages.slice(startIndex, endIndex)

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
      </Box>
      <Divider />
      <Box>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ pt: 2, fontSize: 12 }}
            onClick={() => setReadAllMessagesModalOpen(true)}
          >
            쪽지 모두 읽기
          </Button>
          <ConfirmDialog
            open={readAllMessagesModalOpen}
            handleClose={() => setReadAllMessagesModalOpen(false)}
            handleConfirm={readAllMessages}
          >
            <Typography>모든 쪽지를 읽음 처리하시겠습니까?</Typography>
          </ConfirmDialog>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "29%" }}>
            <Select
              size="small"
              value={searchOption}
              onChange={e => setSearchOption(e.target.value as string)}
            >
              <MenuItem value="none">없음</MenuItem>
              <MenuItem value="title">제목</MenuItem>
              <MenuItem value="sender">보낸이</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoComplete="off"
            size="small"
            sx={{
              width: "51%",
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
            sx={{ width: "10%", border: 1, borderColor: "lightGray" }}
            onClick={handleSearchClick}
          >
            검색
          </Button>
        </Box>
        <Box mt={3}>
          <Box height={370}>
            {currentMessages.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>조회된 쪽지가 없습니다.</Typography>
              </Box>
            ) : (
              <Stack spacing={1.5}>
                {currentMessages.map(message => (
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
              </Stack>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MessageListSection
