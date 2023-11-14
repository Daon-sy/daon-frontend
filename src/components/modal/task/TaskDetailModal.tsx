import React from "react"
import { TaskDetail, TaskManager } from "_types/TaskType"
import CustomModal from "components/common/CustomModal"
import { Avatar, Chip, Divider, Stack, ToggleButton } from "@mui/material"
import Box from "@mui/material/Box"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import ProgressSelectButton from "components/task/ProgressSelectButton"
import BoardSelectButton from "components/task/BoardSelectButton"
import TextFieldBox from "components/common/TextFieldBox"
import { modifyTaskApi, ModifyTaskRequest, taskDetailApi } from "api/taskApi"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import CalendarDateField from "components/common/CalendarDateField"
import ProjectParticipantsModal from "components/modal/project/ProjectParticipantsModal"
import { ProjectParticipant } from "_types/ProjectType"

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
    React.useState<boolean>(false)

  const fetchData = async () => {
    const { data: responseData } = await taskDetailApi(
      workspace!.id,
      projectId,
      taskId,
    )
    const { data: fetchedTask } = responseData
    setTask(fetchedTask)
  }

  React.useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])

  const modifyTask = async (modifiedTask: TaskDetail) => {
    console.log(modifiedTask.taskManager)
    if (workspace && task) {
      const request: ModifyTaskRequest = {
        title: modifiedTask.title,
        content: modifiedTask.content,
        boardId: modifiedTask.board?.boardId,
        startDate: modifiedTask.startDate,
        endDate: modifiedTask.endDate,
        taskManagerId: modifiedTask.taskManager?.projectParticipantId,
        emergency: modifiedTask.emergency,
        progressStatus: modifiedTask.progressStatus,
      }
      await modifyTaskApi(workspace.id, projectId, taskId, request)
      addSuccess("할 일을 수정했습니다.")

      fetchData()
    }
  }

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      width={1200}
      height={700}
      fullHeight
      px={0}
      py={0}
    >
      {task ? (
        <Stack px={4} pt={4} direction="row" spacing={5} height="100%">
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
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ToggleButton
                    value="check"
                    selected={task.bookmark}
                    size="small"
                    sx={{
                      marginLeft: 1,
                      padding: 0.5,
                    }}
                    // TODO 북마크
                    onClick={() => {
                      setTask({
                        ...task,
                        bookmark: !task?.bookmark,
                      })
                    }}
                  >
                    {task.bookmark ? (
                      <StarIcon fontSize="small" />
                    ) : (
                      <StarBorderIcon fontSize="small" />
                    )}
                  </ToggleButton>
                </Box>
              </Box>
              <Box>
                {/* title */}
                <TextFieldBox
                  enterComplete
                  text={task.title}
                  fontSize={24}
                  handleTextChange={v => {
                    if (!v) {
                      addError("제목은 비워둘 수 없습니다")

                      return
                    }
                    modifyTask({
                      ...task,
                      title: v,
                    })
                  }}
                />
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <Box
                  sx={{
                    paddingX: 1.5,
                    fontWeight: 700,
                  }}
                >
                  내용
                </Box>
                <Box>
                  <TextFieldBox
                    multiline
                    text={task.content}
                    fontSize={16}
                    handleTextChange={v =>
                      modifyTask({
                        ...task,
                        content: v,
                      })
                    }
                    paddingX={1.5}
                  />
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                marginTop: 4,
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
              <ProgressSelectButton
                current={task.progressStatus}
                handleStatusSelect={status => {
                  console.log(task)
                  modifyTask({
                    ...task,
                    progressStatus: status.value,
                  })
                }}
              />
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
                  width: "100%",
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
                <Box
                  onClick={() => setProjectParticipantsModalOpen(true)}
                  sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 1,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "rgb(242,242,242)",
                    },
                  }}
                >
                  {task.taskManager ? (
                    <>
                      <Box>
                        <Avatar sx={{ width: 24, height: 24 }} />
                      </Box>
                      <Box sx={{ marginLeft: 1 }}>{task.taskManager?.name}</Box>
                    </>
                  ) : (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box>
                        <Avatar sx={{ width: 24, height: 24 }} />
                      </Box>
                      <Box sx={{ marginLeft: 1 }}>없음</Box>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <ProjectParticipantsModal
            workspaceId={workspace!.id}
            projectId={projectId}
            open={projectParticipantsModalOpen}
            handleClose={() => setProjectParticipantsModalOpen(false)}
            handleItemClick={(participant: ProjectParticipant | undefined) =>
              modifyTask({
                ...task,
                taskManager: participant
                  ? {
                      projectParticipantId: participant.participantId,
                      name: participant.name,
                      profileImageUrl: participant.imageUrl,
                    }
                  : undefined,
              })
            }
          />
        </Stack>
      ) : null}
    </CustomModal>
  )
}

export default TaskDetailModal
