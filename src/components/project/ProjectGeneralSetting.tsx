import React from "react"
import Typography from "@mui/material/Typography"
import {
  modifyProjectBoardApi,
  projectBoardListApi,
  projectDetailApi,
  removeProjectBoardApi,
} from "api/project"
import { Board, ProjectDetail } from "_types/project"
import { Box, IconButton, TextField, Button, Stack } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAlert } from "hooks/useAlert"
import { getWorkspaceStore } from "store/userStore"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import ConfirmDialog from "components/common/ConfirmDialog"
import EditableTextBox from "components/common/EditableTextBox"
import useWithdrawProject from "hooks/project/useWithdrawProject"
import useRemoveProject from "hooks/project/useRemoveProject"
import useModifyProject from "hooks/project/useModifyProject"
import useCreateBoard from "hooks/project/useCreateBoard"
import useThrottling from "hooks/useThrottling"
import { ConfirmDeleteComponent } from "../common/confirm/ConfirmDelete"
import ConfirmProjectWithdrawalComponent from "../common/confirm/withdrawal/ConfirmProjectWithdrawal"
import ConfirmProjectDeleteComponent from "../common/confirm/delete/ConfirmProjectDelete"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = [
  "WORKSPACE_ADMIN",
  "PROJECT_ADMIN",
]

interface Props {
  workspaceId: number
  projectId: number
  handleClose?: () => void
}

const ProjectGeneralSetting = ({
  workspaceId,
  projectId,
  handleClose,
}: Props) => {
  const { addSuccess } = useAlert()
  const { myProfile } = getWorkspaceStore()
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

  const { fetch: removeProject } = useRemoveProject()
  const { fetch: withdrawProject } = useWithdrawProject()
  const { fetch: modifyProject } = useModifyProject()
  const { fetch: createBoard } = useCreateBoard({
    workspaceId: workspaceId || 0,
    projectId: projectId || 0,
    boardTitle: newBoardTitle,
  })

  const fetchThrottling = useThrottling(() => {
    createBoard(fetchProjectBoards)
    setNewBoardTitle("")
  }, 500)
  const handleAddBoard = async () => {
    if (newBoardTitle) {
      fetchThrottling()
    }
  }

  if (!(projectDetail && myProfile)) return <Box />
  const { title: projectTitle, description } = projectDetail

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
            handleUpdate={value =>
              value &&
              modifyProject(
                {
                  workspaceId,
                  projectId,
                  data: {
                    title: value,
                  },
                },
                fetchProjectDetail,
              )
            }
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
              value &&
              modifyProject(
                {
                  workspaceId,
                  projectId,
                  data: {
                    description: value,
                  },
                },
                fetchProjectDetail,
              )
            }
            fontSize={14}
            fontWeight={400}
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
                    inputProps={{ style: { fontSize: 14 }, maxLength: 20 }}
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
                handleConfirm={handleBoardRemove}
                handleClose={() => {
                  setBoardIdToRemove(undefined)
                }}
              >
                <ConfirmDeleteComponent
                  title="해당 보드를 삭제하시겠습니까"
                  contents="보드 내 모든 할일이 함께 삭제되며, 복구가 불가능 합니다"
                />
              </ConfirmDialog>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={10}>
        <Box>
          <Typography variant="h5" fontWeight={500}>
            Danger Zone
          </Typography>
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
              handleConfirm={() =>
                removeProject({ workspaceId, projectId }, handleClose)
              }
              handleClose={() => {
                setProjectRemoveModalOpen(false)
              }}
            >
              <ConfirmProjectDeleteComponent />
            </ConfirmDialog>
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
            handleConfirm={() =>
              withdrawProject(
                {
                  workspaceId,
                  projectId,
                },
                handleClose,
              )
            }
            handleClose={() => {
              setProjectWithdrawModalOpen(false)
            }}
          >
            <ConfirmProjectWithdrawalComponent />
          </ConfirmDialog>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectGeneralSetting
