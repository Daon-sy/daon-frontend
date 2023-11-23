import React from "react"
import {
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
} from "@mui/material"
import Box from "@mui/material/Box"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import EastIcon from "@mui/icons-material/East"
import ProgressSelectButton from "components/task/ProgressSelectButton"
import BoardSelectButton from "components/task/BoardSelectButton"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import CalendarDateField from "components/common/CalendarDateField"
import ProjectParticipantsModal from "components/project/modal/ProjectParticipantsModal"
import {
  HistoryBoard,
  HistoryProjectParticipant,
  TASK_STATUS_SET,
  TaskDetail,
  TaskHistory,
} from "_types/task"
import {
  modifyTaskApi,
  ModifyTaskRequestBody,
  removeTaskApi,
  taskBookmarkApi,
  taskDetailApi,
  taskHistoryApi,
} from "api/task"
import { ProjectParticipant } from "_types/project"
import TitleModal from "components/common/TitleModal"
import EditableBox from "components/common/EditableBox"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import ConfirmDialog from "components/common/ConfirmDialog"

interface Props {
  projectId: number
  taskId: number
  open: boolean
  handleClose: () => void
}

const TaskDetailModal: React.FC<Props> = ({
  projectId,
  taskId,
  open,
  handleClose,
}: Props) => {
  const { addSuccess, addError } = useAlert()
  const { workspace } = getWorkspaceStore()
  const [task, setTask] = React.useState<TaskDetail | null>()
  const [projectParticipantsModalOpen, setProjectParticipantsModalOpen] =
    React.useState(false)
  const [moreButtonAnchorEl, setMoreButtonAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const [taskRemoveModalOpen, setTaskRemoveModalOpen] = React.useState(false)
  const [historySlice, setHistorySlice] = React.useState({
    first: true,
    last: false,
    page: 0,
  })
  const [history, setHistory] = React.useState<Array<TaskHistory>>([])

  const fetchHistory = async (page = 0) => {
    if (workspace) {
      const { data } = await taskHistoryApi(
        workspace.workspaceId,
        projectId,
        taskId,
        {
          page,
        },
      )
      const { first, last, pageNumber, content } = data
      setHistorySlice({
        first,
        last,
        page: pageNumber,
      })
      setHistory(
        [...content, ...history]
          .filter(
            (h, i, arr) => i === arr.findIndex(loc => loc.revId === h.revId),
          )
          .sort((h1, h2) => -(h1.revId - h2.revId)),
      )
    }
  }

  const fetchData = async () => {
    if (workspace) {
      const { data } = await taskDetailApi(
        workspace.workspaceId,
        projectId,
        taskId,
      )
      setTask(data)
    }
  }

  React.useEffect(() => {
    if (open) {
      fetchData()
      fetchHistory()
    }
  }, [open])

  const modifyTask = async (modifiedTask: TaskDetail) => {
    if (!modifiedTask.board) {
      addError("보드를 선택해주세요")

      return
    }

    if (workspace && task) {
      const request: ModifyTaskRequestBody = {
        title: modifiedTask.title,
        content: modifiedTask.content,
        boardId: modifiedTask.board.boardId,
        startDate: modifiedTask.startDate,
        endDate: modifiedTask.endDate,
        taskManagerId: modifiedTask.taskManager?.projectParticipantId,
        emergency: modifiedTask.emergency,
        progressStatus: modifiedTask.progressStatus,
      }
      await modifyTaskApi(workspace.workspaceId, projectId, taskId, request)
      addSuccess("할 일을 수정했습니다.")

      fetchData()
      const { data } = await taskHistoryApi(
        workspace.workspaceId,
        projectId,
        taskId,
      )
      const { content } = data
      setHistory([content[0], ...history])
    }
  }

  const handleBookmark = async () => {
    if (workspace) {
      const { data } = await taskBookmarkApi(
        workspace.workspaceId,
        projectId,
        taskId,
      )
      const { created } = data
      addSuccess(created ? "북마크 등록 완료" : "북마크 취소 완료")
      fetchData()
    }
  }

  const removeTask = async () => {
    if (workspace) {
      await removeTaskApi(workspace.workspaceId, projectId, taskId)
      addSuccess("태스크를 삭제하였습니다")
      handleClose()
    }
  }

  const renderHistoryText = (taskHistory: TaskHistory) => {
    return (
      <Box
        p={1}
        sx={{
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 1,
          borderColor: "rgb(224,224,224)",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box>
            <Avatar
              src={taskHistory.modifier.imageUrl}
              sx={{
                width: 20,
                height: 20,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#C8C8C8FF",
              }}
            />
          </Box>
          <Typography fontSize={14}>
            <Box component="span" fontSize={15} fontWeight={900} mr={0.5}>
              {taskHistory.modifier.name}
            </Box>
            참여자가
            <Box
              component="span"
              fontSize={14}
              fontWeight={900}
              mx={0.5}
              bgcolor="rgb(244,244,244)"
              borderRadius={1}
              p={0.3}
            >
              {(() => {
                switch (taskHistory.fieldName) {
                  case "title":
                    return "제목"
                  case "content":
                    return "내용"
                  case "board":
                    return "보드"
                  case "taskManager":
                    return "담당자"
                  case "startDate":
                    return "시작일"
                  case "endDate":
                    return "마감일"
                  case "progressStatus":
                    return "진행상태"
                  case "emergency":
                    return "긴급여부"
                  default:
                    return "???"
                }
              })()}
            </Box>
            을(를) 변경함
          </Typography>
        </Stack>
        <Box mt={1} ml={5} sx={{ color: "grey" }}>
          {(() => {
            if (taskHistory.fieldType === "TaskProgressStatus") {
              return (
                <Typography fontSize={14} display="flex" alignItems="center">
                  {
                    TASK_STATUS_SET.find(t => t.value === taskHistory.from)
                      ?.description
                  }
                  <EastIcon
                    fontSize="small"
                    sx={{
                      px: 1,
                      fontSize: 14,
                    }}
                  />
                  {
                    TASK_STATUS_SET.find(t => t.value === taskHistory.to)
                      ?.description
                  }
                </Typography>
              )
            }

            if (taskHistory.fieldType === "boolean") {
              return (
                <Typography fontSize={14} display="flex" alignItems="center">
                  <Chip
                    label={taskHistory.from ? "긴급" : "긴급 해제"}
                    size="small"
                    color={taskHistory.from ? "error" : "default"}
                    sx={{ fontSize: 12 }}
                  />
                  <EastIcon
                    fontSize="small"
                    sx={{
                      px: 1,
                      fontSize: 14,
                    }}
                  />
                  <Chip
                    label={taskHistory.to ? "긴급" : "긴급 해제"}
                    size="small"
                    color={taskHistory.to ? "error" : "default"}
                    sx={{ fontSize: 12 }}
                  />
                </Typography>
              )
            }

            if (taskHistory.fieldType === "Board") {
              const boardFrom = taskHistory.from as HistoryBoard
              const boardTo = taskHistory.to as HistoryBoard
              return (
                <Typography fontSize={14} display="flex" alignItems="center">
                  <Box>{`${boardFrom.title}`}</Box>
                  <EastIcon
                    fontSize="small"
                    sx={{
                      px: 1,
                      fontSize: 14,
                    }}
                  />
                  <Box>{`${boardTo.title}`}</Box>
                </Typography>
              )
            }

            if (taskHistory.fieldType === "ProjectParticipant") {
              const taskManagerFrom =
                taskHistory.from as HistoryProjectParticipant
              const taskManagerTo = taskHistory.to as HistoryProjectParticipant
              return (
                <Box display="flex" alignItems="center">
                  {taskManagerFrom ? (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box>
                        <Avatar
                          src={taskManagerFrom.imageUrl}
                          sx={{
                            width: 20,
                            height: 20,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: "#C8C8C8FF",
                          }}
                        />
                      </Box>
                      <Typography fontSize={14}>
                        {taskManagerFrom.name}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography fontSize={14}>없음</Typography>
                  )}
                  <EastIcon
                    fontSize="small"
                    sx={{
                      px: 1,
                      fontSize: 14,
                    }}
                  />
                  {taskManagerTo ? (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box>
                        <Avatar
                          src={taskManagerTo.imageUrl}
                          sx={{
                            width: 20,
                            height: 20,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: "#C8C8C8FF",
                          }}
                        />
                      </Box>
                      <Typography fontSize={14}>
                        {taskManagerTo.name}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography fontSize={14}>없음</Typography>
                  )}
                </Box>
              )
            }

            return (
              <Typography fontSize={14} display="flex" alignItems="center">
                <Box
                  maxWidth={200}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >{`${taskHistory.from ? taskHistory.from : "없음"}`}</Box>
                <EastIcon
                  fontSize="small"
                  sx={{
                    px: 1,
                    fontSize: 14,
                  }}
                />
                <Box
                  maxWidth={200}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >{`${taskHistory.to ? taskHistory.to : "없음"}`}</Box>
              </Typography>
            )
          })()}
          <Typography
            display="flex"
            justifyContent="end"
            fontSize={14}
            color="rgb(155,155,155)"
          >
            {taskHistory.modifiedAt}
          </Typography>
        </Box>
      </Box>
    )
  }

  if (!workspace) return <Box />

  return (
    <TitleModal
      disableCloseButton
      open={open}
      handleClose={handleClose}
      maxWidth={1200}
      minWidth={1200}
    >
      <Box sx={{ height: "80vh" }}>
        <Box
          display="flex"
          alignItems="center"
          position="absolute"
          right={0}
          pr={2}
        >
          {/* <Box flexGrow={1} /> */}
          <Box>
            <Tooltip title="더보기" arrow>
              <IconButton
                onClick={e => setMoreButtonAnchorEl(e.currentTarget)}
                sx={{
                  color: theme => theme.palette.grey[500],
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={moreButtonAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(moreButtonAnchorEl)}
              onClose={() => setMoreButtonAnchorEl(null)}
            >
              <MenuItem onClick={() => setTaskRemoveModalOpen(true)}>
                <Typography textAlign="center" fontSize={14}>
                  삭제하기
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Tooltip title="닫기" arrow>
            <IconButton
              onClick={handleClose}
              sx={{
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {task ? (
          <Stack p={1} direction="row" spacing={5} height="100%">
            {/* left */}
            <Box
              id="left-container"
              sx={{
                width: "100%",
                height: "100%",
                minWidth: 400,
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    paddingLeft: 1,
                  }}
                >
                  <BoardSelectButton
                    projectId={projectId}
                    currentBoardId={task.board?.boardId}
                    handleBoardSelect={item => {
                      modifyTask({
                        ...task,
                        board: item
                          ? {
                              boardId: item.boardId,
                              title: item.title,
                            }
                          : undefined,
                      })
                    }}
                  />
                  <Box flexGrow={1} />
                  <Box
                    sx={{
                      padding: 0.5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="긴급 설정" arrow>
                      <Chip
                        label="긴급"
                        size="small"
                        color={task.emergency ? "error" : "default"}
                        onClick={() => {
                          modifyTask({
                            ...task,
                            emergency: !task?.emergency,
                          })
                        }}
                      />
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="북마크" arrow>
                      <ToggleButton
                        value="check"
                        selected={false}
                        size="small"
                        sx={{
                          marginLeft: 1,
                          padding: 0.5,
                          borderStyle: "none",
                        }}
                        onClick={handleBookmark}
                      >
                        {task.bookmark ? (
                          <BookmarkIcon sx={{ color: "#82b89b" }} />
                        ) : (
                          <BookmarkBorderIcon />
                        )}
                      </ToggleButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Tooltip title="제목" arrow>
                  <Box mt={2}>
                    {/* title */}
                    <EditableBox
                      autoFocus
                      enterComplete
                      text={task.title}
                      handleUpdate={value => {
                        if (!value) {
                          addError("제목은 비워둘 수 없습니다")
                          return
                        }
                        modifyTask({
                          ...task,
                          title: value,
                        })
                      }}
                      maxTextLength={20}
                      style={{
                        fontSize: 24,
                        borderStyle: "none",
                      }}
                    />
                  </Box>
                </Tooltip>
                <Box
                  sx={{
                    marginTop: 2,
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: 1,
                      fontWeight: 700,
                    }}
                  >
                    내용
                  </Box>
                  <Tooltip title="내용" arrow>
                    <Box sx={{ marginTop: 2 }}>
                      <EditableBox
                        autoFocus
                        multiline
                        enterComplete
                        text={task.content ? task.content : ""}
                        handleUpdate={value => {
                          modifyTask({
                            ...task,
                            content: value as string | undefined,
                          })
                        }}
                        maxTextLength={1000}
                        style={{
                          fontSize: 16,
                          borderStyle: "none",
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
              <Divider
                sx={{
                  marginTop: 6,
                }}
              />
              <Box>
                <Box sx={{ paddingX: 1.5, paddingY: 2, fontWeight: 700 }}>
                  댓글
                </Box>
              </Box>
            </Box>
            {/* right */}
            <Box
              id="right-container"
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box>
                <Tooltip title="진행 상태" arrow>
                  <Box component="span">
                    <ProgressSelectButton
                      current={task.progressStatus}
                      handleStatusSelect={status => {
                        modifyTask({
                          ...task,
                          progressStatus: status.value,
                        })
                      }}
                    />
                  </Box>
                </Tooltip>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: 2,
                    padding: 2,
                    border: "solid",
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: "rgb(224,224,224)",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        paddingX: 1,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      시작일
                    </Box>
                    <CalendarDateField
                      date={task.startDate}
                      handleChange={value => {
                        modifyTask({
                          ...task,
                          startDate: value?.format("YYYY-MM-DD"),
                        })
                      }}
                    />
                  </Box>
                  <Divider
                    flexItem
                    sx={{ marginX: 2 }}
                    orientation="vertical"
                  />
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        paddingX: 1,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      마감일
                    </Box>
                    <CalendarDateField
                      date={task.endDate}
                      handleChange={value => {
                        modifyTask({
                          ...task,
                          endDate: value?.format("YYYY-MM-DD"),
                        })
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: 2,
                    padding: 1,
                    border: "solid",
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: "rgb(224,224,224)",
                    display: "flex",
                    alignItems: "center",
                    height: 40,
                  }}
                >
                  <Box
                    sx={{
                      paddingX: 2,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    담당자
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ marginX: 1, marginRight: 2 }}
                  />
                  <Tooltip title="담당자 선택" arrow>
                    <Box
                      onClick={() => setProjectParticipantsModalOpen(true)}
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                        alignItems: "center",
                        borderRadius: 1,
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "rgb(242,242,242)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Box>
                          <Avatar
                            src={task.taskManager?.imageUrl}
                            sx={{
                              width: 28,
                              height: 28,
                              borderStyle: "solid",
                              borderWidth: 1,
                              borderColor: "#C8C8C8FF",
                            }}
                          />
                        </Box>
                        <Box sx={{ marginLeft: 1 }}>
                          {task.taskManager ? task.taskManager.name : "없음"}
                        </Box>
                      </Stack>
                    </Box>
                  </Tooltip>
                </Box>
                <Box sx={{ marginTop: 4, paddingLeft: 1 }}>
                  <Typography fontWeight={700}>히스토리</Typography>
                  <Stack mt={1} spacing={0.5}>
                    {history.map(h => renderHistoryText(h))}
                    <Button
                      disabled={historySlice.last}
                      onClick={async () => {
                        await fetchHistory(historySlice.page + 1)
                      }}
                    >
                      더보기
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <ProjectParticipantsModal
              workspaceId={workspace.workspaceId}
              projectId={projectId}
              open={projectParticipantsModalOpen}
              handleClose={() => setProjectParticipantsModalOpen(false)}
              handleItemClick={(
                participant: ProjectParticipant | undefined,
              ) => {
                modifyTask({
                  ...task,
                  taskManager: participant
                    ? {
                        projectParticipantId: participant.projectParticipantId,
                        name: participant.name,
                        imageUrl: participant.imageUrl,
                      }
                    : undefined,
                })
              }}
            />
          </Stack>
        ) : null}
        {taskRemoveModalOpen ? (
          <ConfirmDialog
            open={taskRemoveModalOpen}
            maxWidth="xs"
            content="정말로 해당 태스크를 삭제하시겠습니까?"
            handleConfirm={removeTask}
            handleClose={() => {
              setTaskRemoveModalOpen(false)
            }}
          />
        ) : null}
      </Box>
    </TitleModal>
  )
}

export default TaskDetailModal
