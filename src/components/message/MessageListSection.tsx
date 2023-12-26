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
  findReceiveMessageListApi,
  findSendMessageApi,
  findSendMessageListApi,
  readAllMessageListApi,
} from "api/workspace"
import { Stack } from "@mui/system"
import { ConfirmDialog } from "components/common/ConfirmDialog"
import { useAlert } from "hooks/useAlert"
import NoData from "components/common/NoData"
import MessageCard from "./MessageCard"
import { ConfirmAllMessageComponent } from "../common/confirm/ConfirmAllMessage"

interface MessageListSectionProps {
  workspace: Workspace | null | undefined
  onSendMessageClick: () => void
  onReadMessageClick: (
    message: MessageSummary,
    isSend: boolean,
    workspaceId: number | undefined,
  ) => void
}

const MessageListSection = ({
  workspace,
  onSendMessageClick,
  onReadMessageClick,
}: MessageListSectionProps) => {
  const { addSuccess } = useAlert()

  const [allMessages, setAllMessages] = React.useState<MessageSummary[]>([])
  const [searchOption, setSearchOption] = React.useState<string>("title")
  const [searchText, setSearchText] = React.useState<string>("")
  const [totalPage, setTotalPage] = React.useState<number>(1)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [readAllMessagesModalOpen, setReadAllMessagesModalOpen] =
    React.useState<boolean>(false)
  const [viewReceiveMessages, setViewReceiveMessages] =
    React.useState<boolean>(true)

  const [isThrottled, setIsThrottled] = React.useState<boolean>(false)

  const pageSize = 7
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentMessages = allMessages.slice(startIndex, endIndex)

  const fetchMessages = async () => {
    if (workspace?.workspaceId !== undefined) {
      if (isThrottled) return
      setIsThrottled(true)

      if (viewReceiveMessages) {
        const response = await findReceiveMessageListApi(
          workspace?.workspaceId,
          searchOption,
          searchText,
        )
        setAllMessages(response.data.content)
        setTotalPage(response.data.totalPage)
        setCurrentPage(1)
      } else {
        const response = await findSendMessageListApi(
          workspace?.workspaceId,
          searchOption,
          searchText,
        )
        setAllMessages(response.data.content)
        setTotalPage(response.data.totalPage)
        setCurrentPage(1)
      }

      setTimeout(() => {
        setIsThrottled(false)
      }, 100)
    }
  }

  React.useEffect(() => {
    if (workspace && workspace.workspaceId) {
      fetchMessages()
    }
  }, [])

  // React.useEffect(() => {
  //   fetchMessages()
  // }, [viewReceiveMessages])

  const handleSearchClick = () => {
    fetchMessages()
  }

  const handleReceiveViewClick = async () => {
    const response = await findReceiveMessageListApi(
      workspace?.workspaceId || 0,
      searchOption,
      searchText,
    )

    setAllMessages(response.data.content)
    setTotalPage(response.data.totalPage)
    setCurrentPage(1)
    setViewReceiveMessages(true)
  }

  const handleSendViewClick = async () => {
    const response = await findSendMessageListApi(
      workspace?.workspaceId || 0,
      searchOption,
      searchText,
    )
    setAllMessages(response.data.content)
    setTotalPage(response.data.totalPage)
    setCurrentPage(1)
    setViewReceiveMessages(false)
  }

  const handleDeleteMessageClick = async (messageId: number) => {
    if (workspace?.workspaceId !== undefined) {
      await deleteMessageApi(workspace?.workspaceId, messageId)
      addSuccess("쪽지가 삭제되었습니다.")
      fetchMessages()
    }
  }

  const handleReadReceiveMessageClick = async (
    message: MessageSummary,
    workspaceId: number | undefined,
  ) => {
    if (workspaceId) {
      await findMessageApi(workspaceId, message.messageId)
      onReadMessageClick(message, false, workspaceId)
    }
  }

  const handleReadSendMessageClick = async (
    message: MessageSummary,
    workspaceId: number | undefined,
  ) => {
    if (workspaceId) {
      await findSendMessageApi(workspaceId, message.messageId)
      onReadMessageClick(message, true, workspaceId)
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

  return (
    <Box>
      <Box
        sx={{
          height: 30,
          mb: 2,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
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
            my: 0.5,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {viewReceiveMessages ? (
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              sx={{
                mr: 1,
                border: 1,
              }}
              onClick={() => setReadAllMessagesModalOpen(true)}
            >
              쪽지 모두 읽기
            </Button>
          ) : null}
          <ConfirmDialog
            open={readAllMessagesModalOpen}
            handleClose={() => setReadAllMessagesModalOpen(false)}
            handleConfirm={readAllMessages}
          >
            <ConfirmAllMessageComponent />
          </ConfirmDialog>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{
              border: 1,
            }}
            onClick={onSendMessageClick}
          >
            쪽지 보내기
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            disableElevation
            color={viewReceiveMessages ? "secondary" : "primary"}
            onClick={handleReceiveViewClick}
          >
            받은 쪽지함
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button
            disableElevation
            color={viewReceiveMessages ? "primary" : "secondary"}
            onClick={handleSendViewClick}
          >
            보낸 쪽지함
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "29%" }}>
            <Select
              size="small"
              value={searchOption}
              onChange={e => setSearchOption(e.target.value as string)}
            >
              <MenuItem value="none">선택</MenuItem>
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
            disableElevation
            variant="outlined"
            color="primary"
            sx={{ width: "10%", border: 1, borderColor: "lightGray" }}
            onClick={handleSearchClick}
          >
            검색
          </Button>
        </Box>
        <Box mt={3}>
          {currentMessages.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <NoData
                content="검색 결과가 없어요"
                width="280px"
                height="140px"
              />
            </Box>
          ) : (
            <Box>
              <Box height={370}>
                {viewReceiveMessages ? (
                  <Stack spacing={1.5}>
                    {currentMessages.map(message => (
                      <MessageCard
                        key={message.messageId}
                        message={message}
                        isSend={false}
                        onDeleteMessageClick={() =>
                          handleDeleteMessageClick(message.messageId)
                        }
                        onReadMessageClick={() =>
                          handleReadReceiveMessageClick(
                            message,
                            workspace?.workspaceId,
                          )
                        }
                      />
                    ))}
                  </Stack>
                ) : (
                  <Stack spacing={1.5}>
                    {currentMessages.map(message => (
                      <MessageCard
                        key={message.messageId}
                        message={message}
                        isSend
                        onDeleteMessageClick={() =>
                          handleDeleteMessageClick(message.messageId)
                        }
                        onReadMessageClick={() =>
                          handleReadSendMessageClick(
                            message,
                            workspace?.workspaceId,
                          )
                        }
                      />
                    ))}
                  </Stack>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={totalPage}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default MessageListSection
