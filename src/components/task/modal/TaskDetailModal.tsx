import React from "react"
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Menu,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import HistoryIcon from "@mui/icons-material/History"
import CalendarDateField from "components/common/CalendarDateField"
import ConfirmDialog from "components/common/ConfirmDialog"
import BoardSelectButton from "components/task/BoardSelectButton"
import TaskHistoriesWrapper from "components/task/history/TaskHistoriesWrapper"
import ProjectParticipantsModal from "components/project/modal/ProjectParticipantsModal"
import { ProjectParticipant } from "_types/project"
import { useAlert } from "hooks/useAlert"
import useEventSource from "hooks/sse/useEventSource"
import useFetchTaskDetail from "hooks/task/useFetchTaskDetail"
import useFetchTaskHistory from "hooks/task/useFetchTaskHistory"
import useModifyTask from "hooks/task/useModifyTask"
import useHandleBookmark from "hooks/task/useHandleBookmark"
import useRemoveTask from "hooks/task/useRemoveTask"
import TaskBookmarkButton from "components/task/TaskBookmarkButton"
import EditableTextBox from "components/common/EditableTextBox"
import TitleDialog from "components/common/TitleDialog"
import ColorAvatar from "components/common/ColorAvatar"
import TaskReply from "../reply/TaskReply"
import ProgressRadioButton from "../ProgressRadioButton"

interface Props {
  workspaceId: number
  projectId: number
  taskId: number
  open: boolean
  handleClose: () => void
}

const TaskDetailModal: React.FC<Props> = ({
  workspaceId,
  projectId,
  taskId,
  open,
  handleClose,
}: Props) => {
  const { addError } = useAlert()
  const [projectParticipantsModalOpen, setProjectParticipantsModalOpen] =
    React.useState(false)
  const [taskRemoveModalOpen, setTaskRemoveModalOpen] = React.useState(false)

  const taskFullPath = {
    workspaceId,
    projectId,
    taskId,
  }

  const { taskDetail, fetchTaskDetail } = useFetchTaskDetail(taskFullPath)
  const { taskHistories, fetchHistories, fetchTopHistory, isLast } =
    useFetchTaskHistory(taskFullPath)
  const { fetch: modifyTask } = useModifyTask(taskFullPath)
  const { bookmarked, handleBookmark } = useHandleBookmark(
    taskFullPath,
    taskDetail?.bookmark,
  )
  const { fetch: removeTask } = useRemoveTask(taskFullPath, handleClose)

  useEventSource({
    ssePath: `/api/subscribe/workspaces/projects/tasks/${taskId}`,
    onEventRaised: () => {
      fetchTaskDetail()
      fetchTopHistory()
    },
  })

  // 히스토리
  const [historyAnchorEl, setHistoryAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const handleOpenHistory = (event: React.MouseEvent<HTMLElement>) => {
    setHistoryAnchorEl(event.currentTarget)
  }
  const handleCloseHistory = () => {
    setHistoryAnchorEl(null)
  }

  const openhistory = Boolean(historyAnchorEl)
  const id = openhistory ? "history" : undefined

  return (
    <TitleDialog
      disableCloseButton
      open={open}
      handleClose={handleClose}
      maxWidth={1200}
      minWidth={1200}
      height={600}
    >
      <Box>
        {/* 위에 더보기, x */}
        <Box display="flex" alignItems="center" justifyContent="end">
          <Box>
            <Tooltip title="히스토리" arrow placement="top">
              <IconButton aria-describedby={id} onClick={handleOpenHistory}>
                <HistoryIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id={id}
              open={openhistory}
              anchorEl={historyAnchorEl}
              onClose={handleCloseHistory}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              elevation={0}
              sx={{
                ".MuiList-root": { p: 0 },
              }}
            >
              <Box
                sx={{
                  borderRadius: 1,
                  border: 1,
                  p: 1,
                  height: "200px",
                  cursor: "default",
                  scrollbarWidth: "0.5em",
                  WebkitScrollSnapType: "none",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#495e57",
                    borderRadius: "15px",
                  },
                  "&::-webkit-scrollbar-button": {
                    height: "16px",
                  },
                }}
              >
                {/* 히스토리 */}
                <Box sx={{ width: "450px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#1f4838",
                        fontSize: "20px",
                      }}
                    >
                      히스토리
                    </Typography>
                    <IconButton
                      onClick={handleCloseHistory}
                      sx={{
                        color: theme => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <TaskHistoriesWrapper taskHistories={taskHistories} />
                  {isLast ? null : (
                    <Button
                      fullWidth
                      onClick={async () => {
                        await fetchHistories()
                      }}
                    >
                      더보기
                    </Button>
                  )}
                </Box>
              </Box>
            </Menu>
          </Box>

          {/* 삭제 */}
          <Box>
            <Tooltip title="삭제" arrow>
              <IconButton
                onClick={() => setTaskRemoveModalOpen(true)}
                sx={{
                  color: theme => theme.palette.grey[500],
                  px: 1,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* 닫기 */}
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

        {taskDetail ? (
          <Stack p={1} direction="row" spacing={5} height="100%">
            {/* left */}
            <Box
              id="left-container"
              sx={{
                width: "100%",
                height: "100%",
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
                    currentBoardId={taskDetail.board?.boardId}
                    handleBoardSelect={item => {
                      modifyTask({
                        ...taskDetail,
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
                        color={taskDetail.emergency ? "error" : "default"}
                        onClick={() => {
                          modifyTask({
                            ...taskDetail,
                            emergency: !taskDetail?.emergency,
                          })
                        }}
                      />
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 1,
                    }}
                  >
                    <TaskBookmarkButton
                      bookmarked={bookmarked}
                      handleClick={handleBookmark}
                    />
                  </Box>
                </Box>

                {/* 제목 */}
                <Tooltip
                  title="제목"
                  sx={{ color: "#1f4838", fontWeight: "bold" }}
                  arrow
                >
                  <Box mt={2}>
                    {/* title */}
                    <EditableTextBox
                      text={taskDetail.title}
                      enterComplete
                      fontWeight={700}
                      maxTextLength={20}
                      fontSize={24}
                      borderStyle="none"
                      handleUpdate={value => {
                        if (!value) {
                          addError("제목은 비워둘 수 없습니다")
                          return
                        }
                        modifyTask({
                          ...taskDetail,
                          title: value,
                        })
                      }}
                      inputProps={{
                        style: {
                          lineHeight: 2,
                          paddingTop: 4,
                          paddingBottom: 4,
                          paddingLeft: 8,
                          paddingRight: 8,
                        },
                      }}
                    />
                  </Box>
                </Tooltip>

                {/* 내용 */}
                <Box sx={{ mt: 2 }}>
                  <Tooltip title="내용" arrow>
                    <Box>
                      <EditableTextBox
                        text={taskDetail.content}
                        multiline
                        rows={13}
                        maxTextLength={1000}
                        handleUpdate={value => {
                          modifyTask({
                            ...taskDetail,
                            content: value?.trim(),
                          })
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Box>

                {/* 담당자 */}
                <Box
                  sx={{
                    marginTop: 2,
                    padding: 1,
                    border: "solid",
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: "#bdbdbd",
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
                        height: "100%",
                        display: "flex",
                        flexGrow: 1,
                        alignItems: "center",
                        borderRadius: 1,
                        pl: 1,
                        "&:hover": {
                          backgroundColor: "background.default",
                        },
                      }}
                    >
                      {taskDetail.taskManager ? (
                        <ListItem
                          slotProps={{
                            root: {
                              style: {
                                padding: 0,
                              },
                            },
                          }}
                        >
                          <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
                            <ColorAvatar
                              id={taskDetail.taskManager.projectParticipantId}
                              src={taskDetail.taskManager.imageUrl}
                              sx={{ width: 28, height: 28 }}
                            />
                          </ListItemAvatar>
                          <ListItemText>
                            <Box>
                              <Typography
                                fontSize={14}
                                color="primary"
                                fontWeight={600}
                              >
                                {taskDetail.taskManager.name}
                              </Typography>
                            </Box>
                          </ListItemText>
                        </ListItem>
                      ) : (
                        <Box height="100%" display="flex" alignItems="center">
                          <Typography fontSize={14} fontWeight={500}>
                            없음
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem color="#e0e0e0" />
            {/* right */}
            <Box
              id="right-container"
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box>
                <Box sx={{ mb: 4 }}>
                  <ProgressRadioButton
                    current={taskDetail.progressStatus}
                    handleStatusCheck={status => {
                      modifyTask({
                        ...taskDetail,
                        progressStatus: status,
                      })
                    }}
                  />
                </Box>

                {/* 시작일 종료일 */}
                <Box
                  sx={{
                    display: "flex",
                    mb: 1,
                    borderRadius: 2,
                    fontWeight: 700,
                    color: "#1f4838",
                    fontSize: "18px",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ mb: 1 }}>시작일</Box>
                    <CalendarDateField
                      date={taskDetail.startDate}
                      handleChange={value => {
                        modifyTask({
                          ...taskDetail,
                          startDate: value?.format("YYYY-MM-DD"),
                        })
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      lineHeight: "102px",
                      marginX: 3,
                      fontSize: "32px",
                      color: "#929292",
                      fontWeight: "bold",
                    }}
                  >
                    ~
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ mb: 1 }}>마감일</Box>
                    <CalendarDateField
                      date={taskDetail.endDate}
                      handleChange={value => {
                        modifyTask({
                          ...taskDetail,
                          endDate: value?.format("YYYY-MM-DD"),
                        })
                      }}
                    />
                  </Box>
                </Box>

                {/* 댓글 */}
                <Box>
                  <Box
                    sx={{
                      pb: 2,
                      fontWeight: "bold",
                      color: "#1f4838",
                      fontSize: "18px",
                    }}
                  >
                    댓글
                  </Box>
                  <TaskReply projectId={projectId} taskId={taskId} />
                </Box>
              </Box>
            </Box>
            <ProjectParticipantsModal
              workspaceId={workspaceId}
              projectId={projectId}
              open={projectParticipantsModalOpen}
              handleClose={() => setProjectParticipantsModalOpen(false)}
              handleItemClick={(
                participant: ProjectParticipant | undefined,
              ) => {
                modifyTask({
                  ...taskDetail,
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
            handleConfirm={removeTask}
            handleClose={() => {
              setTaskRemoveModalOpen(false)
            }}
          >
            지우시겠습니까?
          </ConfirmDialog>
        ) : null}
      </Box>
    </TitleDialog>
  )
}

export default TaskDetailModal
