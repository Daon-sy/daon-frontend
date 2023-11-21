import React from "react"
import {
  Avatar,
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
import ProgressSelectButton from "components/task/ProgressSelectButton"
import BoardSelectButton from "components/task/BoardSelectButton"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import CalendarDateField from "components/common/CalendarDateField"
import ProjectParticipantsModal from "components/project/modal/ProjectParticipantsModal"
import { TaskDetail } from "_types/task"
import {
  modifyTaskApi,
  ModifyTaskRequestBody,
  removeTaskApi,
  taskBookmarkApi,
  taskDetailApi,
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

  const fetchData = async () => {
    const { data } = await taskDetailApi(
      workspace!.workspaceId,
      projectId,
      taskId,
    )
    setTask(data)
  }

  React.useEffect(() => {
    if (open) {
      fetchData()
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
    }
  }

  const handleBookmark = async () => {
    const { data } = await taskBookmarkApi(
      workspace!.workspaceId,
      projectId,
      taskId,
    )
    const { created } = data
    addSuccess(created ? "북마크 등록 완료" : "북마크 취소 완료")
    fetchData()
  }

  const removeTask = async () => {
    if (workspace) {
      await removeTaskApi(workspace.workspaceId, projectId, taskId)
      addSuccess("태스크를 삭제하였습니다")
      handleClose()
    }
  }

  return (
    <TitleModal
      disableCloseButton
      open={open}
      handleClose={handleClose}
      maxWidth={1200}
      minWidth={1200}
    >
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
                <Divider flexItem sx={{ marginX: 2 }} orientation="vertical" />
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
            </Box>
          </Box>
          <ProjectParticipantsModal
            workspaceId={workspace!.workspaceId}
            projectId={projectId}
            open={projectParticipantsModalOpen}
            handleClose={() => setProjectParticipantsModalOpen(false)}
            handleItemClick={(participant: ProjectParticipant | undefined) => {
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
    </TitleModal>
  )
}

export default TaskDetailModal
