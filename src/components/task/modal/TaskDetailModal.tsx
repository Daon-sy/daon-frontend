import React from "react"
import {
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  MenuItem,
  Menu,
  Box,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CloseIcon from "@mui/icons-material/Close"
import CalendarDateField from "components/common/CalendarDateField"
import TitleModal from "components/common/TitleModal"
import EditableBox from "components/common/EditableBox"
import ConfirmDialog from "components/common/ConfirmDialog"
import ProgressSelectButton from "components/task/ProgressSelectButton"
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
import TaskReply from "../reply/TaskReply"

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
  const [moreButtonAnchorEl, setMoreButtonAnchorEl] =
    React.useState<null | HTMLElement>(null)
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
                <Tooltip title="제목" arrow>
                  <Box mt={2}>
                    {/* title */}
                    <EditableBox
                      autoFocus
                      enterComplete
                      text={taskDetail.title}
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
                        text={taskDetail.content ? taskDetail.content : ""}
                        handleUpdate={value => {
                          modifyTask({
                            ...taskDetail,
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
                          src={taskDetail.taskManager?.imageUrl}
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
                        {taskDetail.taskManager
                          ? taskDetail.taskManager.name
                          : "없음"}
                      </Box>
                    </Stack>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
            {/* right */}
            <Box
              id="right-container"
              sx={{
                width: "80%",
                height: "100%",
              }}
            >
              <Box>
                <Tooltip title="진행 상태" arrow>
                  <Box component="span">
                    <ProgressSelectButton
                      current={taskDetail.progressStatus}
                      handleStatusSelect={status => {
                        modifyTask({
                          ...taskDetail,
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
                    borderRadius: 2,
                    fontWeight: 700,
                    color: "#1f4838",
                    fontSize: "20x",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box>시작일</Box>
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
                      lineHeight: "78px",
                      marginX: 3,
                      fontSize: "32px",
                      color: "#929292",
                      fontWeight: "bold",
                    }}
                  >
                    ~
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box>마감일</Box>
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
                <Box>
                  <Box
                    sx={{
                      pt: 2,
                      pb: 1,
                      fontWeight: "bold",
                      color: "#1f4838",
                      fontSize: "20x",
                    }}
                  >
                    댓글
                  </Box>
                  <TaskReply projectId={projectId} taskId={taskId} />
                </Box>
                {/* 히스토리 */}
                {/* <Box sx={{ marginTop: 4, paddingLeft: 1 }}>
                  <Typography fontWeight={700}>히스토리</Typography>
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
                </Box> */}
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
    </TitleModal>
  )
}

export default TaskDetailModal
