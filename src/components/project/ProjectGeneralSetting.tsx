import React from "react"
import Typography from "@mui/material/Typography"
import {
  createProjectBoardApi,
  modifyProjectApi,
  modifyProjectBoardApi,
  ModifyWorkspaceRequestBody,
  projectBoardListApi,
  projectDetailApi,
  removeProjectApi,
  removeProjectBoardApi,
  withdrawProjectApi,
} from "api/project"
import { Board, ProjectDetail } from "_types/project"
import { Box, IconButton, TextField, Button, Stack } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAlert } from "hooks/useAlert"
import { getWorkspaceStore } from "store/userStore"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import EditableBox from "components/common/EditableBox"
import ConfirmDialog from "components/common/ConfirmDialog"
import { useNavigate } from "react-router-dom"
import EditableTextBox from "components/common/EditableTextBox"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = [
  "WORKSPACE_ADMIN",
  "PROJECT_ADMIN",
]

interface Props {
  workspaceId: number
  projectId: number
}

const ProjectGeneralSetting = ({ workspaceId, projectId }: Props) => {
  const { addSuccess } = useAlert()
  const { myProfile } = getWorkspaceStore()
  const navigate = useNavigate()
  const [projectDetail, setProjectDetail] = React.useState<ProjectDetail>()
  const [boards, setBoards] = React.useState<Array<Board>>()
  const [newBoardTitle, setNewBoardTitle] = React.useState("")
  const [boardIdToRemove, setBoardIdToRemove] = React.useState<number>()
  const [projectRemoveModalOpen, setProjectRemoveModalOpen] =
    React.useState(false)
  const [projectWithdrawModalOpen, setProjectWithdrawModalOpen] =
    React.useState(false)

  const fetchProjectDetail = async () => {
    const { data: projectDetailData } = await projectDetailApi(
      workspaceId,
      projectId,
    )
    setProjectDetail(projectDetailData)
  }

  const fetchProjectBoards = async () => {
    const { data: boardListResponse } = await projectBoardListApi(
      workspaceId,
      projectId,
    )
    setBoards(boardListResponse.boards)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      // project detail 조회
      await fetchProjectDetail()
      // 보드 목록 조회
      await fetchProjectBoards()
    }
    fetchData()
  }, [])

  if (!(projectDetail && myProfile)) return <Box />
  const { title: projectTitle, description } = projectDetail

  const updateProject = async (data: ModifyWorkspaceRequestBody) => {
    await modifyProjectApi(workspaceId, projectId, { ...data })
    addSuccess("프로젝트 정보 수정 완료")
    fetchProjectDetail()
  }

  const handleAddBoard = async () => {
    if (newBoardTitle) {
      await createProjectBoardApi(workspaceId, projectId, {
        title: newBoardTitle,
      })

      await fetchProjectBoards()
      addSuccess("보드 추가 완료")
      setNewBoardTitle("")
    }
  }

  const updateBoard = async (boardId: number, title: string) => {
    await modifyProjectBoardApi(workspaceId, projectId, boardId, { title })

    await fetchProjectBoards()
    addSuccess("보드 수정 완료")
  }

  const handleNewBoardTitleEntered = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      await handleAddBoard()
    }
  }

  const handleBoardRemove = async () => {
    if (boardIdToRemove) {
      await removeProjectBoardApi(workspaceId, projectId, boardIdToRemove)
      await fetchProjectBoards()
      addSuccess("보드 삭제 완료")
      setBoardIdToRemove(undefined)
    }
  }

  const removeProject = async () => {
    await removeProjectApi(workspaceId, projectId)
    addSuccess("프로젝트가 삭제되었습니다")
    // 워크스페이스 메인 페이지로 이동
    navigate(`/workspace/${workspaceId}`)
  }

  const withdrawProject = async () => {
    await withdrawProjectApi(workspaceId, projectId)
    addSuccess("프로젝트를 탈퇴하였습니다")
    // 워크스페이스 메인 페이지로 이동
    navigate(`/workspace/${workspaceId}`)
  }

  return !projectDetail || !boards ? (
    <Box />
  ) : (
    <Box>
      <Box>
        <Box>
          <Typography variant="h6">프로젝트 정보</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="inherit" p={0.5} fontSize={15} fontWeight={500}>
            프로젝트 이름
          </Typography>
          <EditableTextBox
            enterComplete
            text={projectTitle}
            handleUpdate={value => value && updateProject({ title: value })}
            fontSize={14}
            maxTextLength={20}
            blockEdit={!allowedEdit.includes(myProfile.role)}
          />
        </Box>
        <Box mt={1}>
          <Typography variant="inherit" p={0.5} fontSize={15} fontWeight={500}>
            프로젝트 설명
          </Typography>
          <EditableTextBox
            multiline
            rows={8}
            text={description}
            handleUpdate={value =>
              value && updateProject({ description: value })
            }
            fontSize={14}
            maxTextLength={100}
            blockEdit={!allowedEdit.includes(myProfile.role)}
          />
        </Box>
      </Box>
      <Box mt={10}>
        <Box>
          <Typography variant="h6">프로젝트 보드</Typography>
        </Box>
        <Box>
          <Box sx={{ width: 350 }}>
            {allowedEdit.includes(myProfile.role) ? (
              <Box mt={1}>
                <Typography
                  variant="inherit"
                  p={0.5}
                  fontSize={15}
                  fontWeight={500}
                >
                  보드 추가
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    fullWidth
                    value={newBoardTitle}
                    size="small"
                    placeholder="추가 할 보드의 이름을 입력하세요"
                    onChange={e => setNewBoardTitle(e.target.value)}
                    onKeyDown={handleNewBoardTitleEntered}
                  />
                  <Box ml={1}>
                    <IconButton size="small" onClick={handleAddBoard}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ) : null}
            <Box mt={1}>
              <Typography
                variant="inherit"
                p={0.5}
                fontSize={15}
                fontWeight={500}
              >
                보드 목록
              </Typography>
              <Stack spacing={0.5}>
                {boards.map(board => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box width="100%">
                      <EditableTextBox
                        enterComplete
                        text={board.title}
                        handleUpdate={value =>
                          value && updateBoard(board.boardId, value)
                        }
                        blockEdit={!allowedEdit.includes(myProfile.role)}
                        fontSize={14}
                        maxTextLength={20}
                      />
                    </Box>
                    {allowedEdit.includes(myProfile.role) ? (
                      <Box ml={1} pb={1}>
                        <IconButton
                          size="small"
                          onClick={() => setBoardIdToRemove(board.boardId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : null}
                  </Box>
                ))}
              </Stack>
              <ConfirmDialog
                open={!!boardIdToRemove}
                maxWidth="xs"
                title="주의!!"
                content={
                  "해당 보드에 포함된 모든 할 일이 함게 삭제됩니다.\n그래도 보드를 삭제하시겠습니까?"
                }
                handleConfirm={handleBoardRemove}
                handleClose={() => {
                  setBoardIdToRemove(undefined)
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={10}>
        <Box>
          <Typography variant="h5">Danger Zone</Typography>
        </Box>
        {allowedEdit.includes(myProfile.role) ? (
          <Box>
            <Box mt={3}>
              <Typography variant="h6">프로젝트 삭제</Typography>
            </Box>
            <Box mt={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setProjectRemoveModalOpen(true)}
              >
                삭제하기
              </Button>
            </Box>
            <ConfirmDialog
              open={projectRemoveModalOpen}
              maxWidth="xs"
              title="주의!!"
              content={
                "프로젝트 내의 모든 정보가 삭제됩니다.\n정말로 이 프로젝트를 삭제하시겠습니까?"
              }
              handleConfirm={removeProject}
              handleClose={() => {
                setProjectRemoveModalOpen(false)
              }}
            />
          </Box>
        ) : null}
        <Box>
          <Box mt={3}>
            <Typography variant="h6">프로젝트 탈퇴</Typography>
          </Box>
          <Box mt={1}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setProjectWithdrawModalOpen(true)}
            >
              탈퇴하기
            </Button>
          </Box>
          <ConfirmDialog
            open={projectWithdrawModalOpen}
            maxWidth="xs"
            title="주의!!"
            content="정말로 이 프로젝트를 탈퇴하시겠습니까?"
            handleConfirm={withdrawProject}
            handleClose={() => {
              setProjectWithdrawModalOpen(false)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectGeneralSetting
