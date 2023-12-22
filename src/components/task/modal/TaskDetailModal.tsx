import React from "react"
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
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
import NoData from "components/common/NoData"
import { getTaskDetailViewStore } from "store/taskStore"
import TaskReply from "../reply/TaskReply"
import ProgressRadioButton from "../ProgressRadioButton"
import { ConfirmDeleteComponent } from "../../common/confirm/ConfirmDelete"

interface Props {
  workspaceId: number
  projectId: number
  boardId: number
  taskId: number
  open: boolean
  handleClose: () => void
}

const TaskDetailModal: React.FC<Props> = ({
  workspaceId,
  projectId,
  boardId,
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
    boardId,
    taskId,
  }

  const {
    taskDetail,
    fetchTaskDetail,
    error: fetchTaskDetailError,
  } = useFetchTaskDetail(taskFullPath)
  const { taskHistories, fetchHistories, fetchTopHistory, isLast } =
    useFetchTaskHistory(taskFullPath)
  const { fetch: modifyTask } = useModifyTask(taskFullPath)
  const { taskDetailParam, setTaskDetailParam } = getTaskDetailViewStore()
  const { bookmarked: handleBookmarkResponse, handleBookmark } =
    useHandleBookmark(taskFullPath)
  const [bookmarked, setBookmarked] = React.useState(false)
  const [tab, setTab] = React.useState("댓글")

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }
  React.useEffect(() => {
    setBookmarked(taskDetail?.bookmark || false)
  }, [taskDetail])
  React.useEffect(() => {
    if (typeof handleBookmarkResponse === "boolean")
      setBookmarked(handleBookmarkResponse)
  }, [handleBookmarkResponse])

  const { fetch: removeTask } = useRemoveTask(taskFullPath, handleClose)

  useEventSource({
    ssePath: `/api/subscribe/workspaces/projects/tasks/${taskId}`,
    onEventRaised: () => {
      fetchTaskDetail()
      fetchTopHistory()
    },
  })

  // error-handling
  const [noData, setNoData] = React.useState(false)
  React.useEffect(() => {
    if (fetchTaskDetailError) {
      const { errorCode } = fetchTaskDetailError
      if (errorCode === 5000) {
        addError("존재하지 않는 할 일 입니다")
        setNoData(true)
      }
    }
  }, [fetchTaskDetailError])

  if (noData)
    return (
      <TitleDialog
        disableCloseButton
        open={open}
        handleClose={handleClose}
        maxWidth={1200}
        minWidth={1200}
        height={600}
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
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
        <Box display="flex" height="80%" justifyContent="center">
          <NoData
            content="존재하지 않는 할 일 입니다"
            width={200}
            height={100}
          />
        </Box>
      </TitleDialog>
    )

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
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
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
          <Stack p={1} direction="row" spacing={5} height="100%" width="100%">
            {/* left */}
            <Box
              id="left-container"
              width={600}
              sx={{
                boxSizing: "border-box",
                // width: "100%",
                height: "100%",
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box width={390}>
                    <BoardSelectButton
                      projectId={projectId}
                      currentBoard={taskDetail.board}
                      handleBoardSelect={item => {
                        modifyTask(
                          {
                            ...taskDetail,
                            board: item
                              ? {
                                  boardId: item.boardId,
                                  title: item.title,
                                }
                              : undefined,
                          },
                          () =>
                            setTaskDetailParam({
                              taskId: taskDetailParam?.taskId || 0,
                              boardId: item?.boardId || 0,
                              projectId: taskDetailParam?.projectId || 0,
                              workspaceId: taskDetailParam?.workspaceId || 0,
                            }),
                        )
                      }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="end"
                  >
                    <Tooltip title="긴급 설정" arrow>
                      <Chip
                        label="긴급"
                        size="medium"
                        color={taskDetail.emergency ? "error" : "default"}
                        onClick={() => {
                          modifyTask({
                            ...taskDetail,
                            emergency: !taskDetail?.emergency,
                          })
                        }}
                        sx={{ borderRadius: 1, margin: 0, border: 0 }}
                      />
                    </Tooltip>
                    <Box ml={1 / 2}>
                      <TaskBookmarkButton
                        padding={0}
                        fontSize="2.5rem"
                        bookmarked={bookmarked}
                        handleClick={handleBookmark}
                      />
                    </Box>
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
              boxSizing="border-box"
              width={600}
              sx={{
                overflowX: "hidden",
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
                    width: 490,
                  }}
                >
                  <Box sx={{ width: 220 }}>
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
                      fontSize: "28px",
                      color: "#929292",
                      fontWeight: "bold",
                    }}
                  >
                    ~
                  </Box>
                  <Box sx={{ width: 220 }}>
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

                {/* true :댓글, flase :히스토리 */}
                <Box minHeight="313px" width={490}>
                  <Tabs
                    value={tab}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="댓글, 히스토리 탭"
                    sx={{ mb: 1 }}
                  >
                    <Tab
                      value="댓글"
                      label="댓글"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    />
                    <Tab
                      value="히스토리"
                      label="히스토리"
                      sx={{ fontWeight: "bold", fontSize: "12px" }}
                    />
                  </Tabs>

                  {tab === "댓글" ? (
                    <Box>
                      <TaskReply
                        projectId={projectId}
                        boardId={boardId}
                        taskId={taskId}
                      />
                    </Box>
                  ) : (
                    <Box>
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
                  )}
                </Box>
              </Box>
            </Box>
            <ProjectParticipantsModal
              title="담당자 선택"
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
            <ConfirmDeleteComponent
              title="해당 할일을 삭제하시겠습니까"
              contents="한번 삭제된 할일은 복구가 불가능합니다"
            />
          </ConfirmDialog>
        ) : null}
      </Box>
    </TitleDialog>
  )
}

export default TaskDetailModal
