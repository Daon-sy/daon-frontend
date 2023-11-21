import React from "react"
import {
  Avatar,
  Button,
  Chip,
  Divider,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material"
import Box from "@mui/material/Box"
import BoardSelectButton from "components/task/BoardSelectButton"
import ProjectSelectButton from "components/task/ProjectSelectButton"
import { getWorkspaceStore } from "store/userStore"
import { Dayjs } from "dayjs"
import { useAlert } from "hooks/useAlert"
import ProjectParticipantsModal from "components/project/modal/ProjectParticipantsModal"
import CalendarDateField from "components/common/CalendarDateField"
import { createTaskApi } from "api/task"
import { ProjectParticipant } from "_types/project"
import TitleModal from "components/common/TitleModal"

interface Props {
  open: boolean
  handleClose: () => void
}

const TaskCreateModal: React.FC<Props> = ({ open, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()
  const { addSuccess, addError } = useAlert()

  const [projectId, setProjectId] = React.useState<number>()
  const [boardId, setBoardId] = React.useState<number>()
  const [title, setTitle] = React.useState<string>("")
  const [content, setContent] = React.useState("")
  const [startDate, setStartDate] = React.useState<string | undefined>()
  const [endDate, setEndDate] = React.useState<string | undefined>()
  const [taskManagerId, setTaskManagerId] = React.useState<number | undefined>()
  const [taskManager, setTaskManager] = React.useState<
    ProjectParticipant | undefined
  >()
  const [emergency, setEmergency] = React.useState(false)
  const [projectParticipantsModalOpen, setProjectParticipantsModalOpen] =
    React.useState<boolean>(false)

  const cleanUp = () => {
    setProjectId(undefined)
    setEmergency(false)
    setTaskManager(undefined)
    setTaskManagerId(undefined)
  }

  const closeModal = () => {
    cleanUp()
    handleClose()
  }

  const handleCreate = async () => {
    if (!projectId) {
      addError("프로젝트를 선택해주세요")
      return
    }

    if (!boardId) {
      addError("보드를 선택하세요")
      return
    }

    if (!title) {
      addError("할 일 제목을 입력해주세요")
      return
    }

    const { data } = await createTaskApi(workspace!.workspaceId, projectId, {
      title,
      content,
      boardId,
      startDate,
      endDate,
      taskManagerId,
      emergency,
    })
    const { taskId } = data
    addSuccess(`할 일(#${taskId})이 생성되었습니다.`)
    closeModal()
  }

  return (
    <TitleModal
      open={open}
      handleClose={closeModal}
      title="할 일 생성"
      maxWidth="sm"
    >
      <Stack spacing={2} height="100%">
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Stack direction="row" spacing={2}>
            <ProjectSelectButton
              handleProjectSelect={project => {
                setProjectId(project.id)
                setBoardId(undefined)
              }}
            />
            {projectId ? (
              <BoardSelectButton
                projectId={projectId}
                currentBoardId={boardId}
                handleBoardSelect={board => setBoardId(board?.boardId)}
              />
            ) : null}
          </Stack>
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
              color={emergency ? "error" : "default"}
              onClick={() => setEmergency(!emergency)}
            />
          </Box>
        </Box>
        <Box mt={2}>
          <TextField
            required
            fullWidth
            label="제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{ maxLength: 20 }}
          />
          <FormHelperText
            sx={{ textAlign: "end" }}
          >{`${title.length}/20자`}</FormHelperText>
        </Box>
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <TextField
            multiline
            fullWidth
            rows={10}
            label="내용"
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 1000 }}
          />
          <FormHelperText
            sx={{ textAlign: "end" }}
          >{`${content.length}/1000자`}</FormHelperText>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
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
                handleChange={(value: Dayjs | null) =>
                  setStartDate(value?.format("YYYY-MM-DD"))
                }
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
                handleChange={(value: Dayjs | null) =>
                  setEndDate(value?.format("YYYY-MM-DD"))
                }
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
            <Box
              onClick={() => {
                if (!projectId) {
                  addError("프로젝트를 선택해주세요")
                  return
                }
                setProjectParticipantsModalOpen(true)
              }}
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
                    src={taskManager?.imageUrl}
                    sx={{ width: 24, height: 24 }}
                  />
                </Box>
                <Box sx={{ marginLeft: 1 }}>
                  {taskManager ? taskManager.name : "없음"}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "60%", minWidth: 300 }}
          >
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={closeModal}
            >
              취소
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCreate}
            >
              등록
            </Button>
          </Stack>
        </Box>
        <ProjectParticipantsModal
          title="담당자 선택"
          workspaceId={workspace!.workspaceId}
          projectId={projectId!}
          open={projectParticipantsModalOpen}
          handleClose={() => setProjectParticipantsModalOpen(false)}
          handleItemClick={(participant: ProjectParticipant | undefined) => {
            setTaskManager(participant)
            setTaskManagerId(participant?.projectParticipantId)
          }}
        />
      </Stack>
    </TitleModal>
  )
}

export default TaskCreateModal
