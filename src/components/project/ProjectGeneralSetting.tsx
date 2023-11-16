import React from "react"
import Typography from "@mui/material/Typography"
import {
  createProjectBoardApi,
  modifyProjectApi,
  modifyProjectBoardApi,
  projectBoardListApi,
  projectDetailApi,
  removeProjectBoardApi,
} from "api/project"
import { Board, ProjectDetail } from "_types/project"
import TextFieldBox from "components/common/TextFieldBox"
import { Box, IconButton, TextField, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import axios from "axios"
import { ApiResponse } from "api"

interface Props {
  workspaceId: number
  projectId: number
  addSuccessAlert: (message: string) => void
  addErrorAlert: (message: string) => void
}

const ProjectGeneralSetting = ({
  workspaceId,
  projectId,
  addSuccessAlert,
  addErrorAlert,
}: Props) => {
  const [projectDetail, setProjectDetail] = React.useState<ProjectDetail>()
  const [boards, setBoards] = React.useState<Array<Board>>()
  const [newBoardTitle, setNewBoardTitle] = React.useState("")

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

  const handleProjectTitleChange = async (title?: string) => {
    if (!projectDetail) return
    if (!title) {
      addErrorAlert("프로젝트 제목은 비워둘 수 없습니다.")

      return
    }
    try {
      await modifyProjectApi(workspaceId, projectId, {
        title,
      })

      await fetchProjectDetail()
      addSuccessAlert("프로젝트 제목 변경 완료")
    } catch (e) {
      if (axios.isAxiosError<ApiResponse>(e)) {
        if (e.status === 400) {
          const { data } = e.response!
          addErrorAlert(data.message)
        }
      }
    }
  }

  const handleProjectDescriptionChange = async (description?: string) => {
    if (!projectDetail) return
    await modifyProjectApi(workspaceId, projectId, {
      description,
    })

    await fetchProjectDetail()
    addSuccessAlert("프로젝트 설명 변경 완료")
  }

  const handleAddBoard = async () => {
    if (!newBoardTitle) {
      addErrorAlert("보드 이름은 비워둘 수 없습니다.")

      return
    }

    try {
      await createProjectBoardApi(workspaceId, projectId, {
        title: newBoardTitle,
      })

      await fetchProjectBoards()
      addSuccessAlert("보드 추가 완료")
      setNewBoardTitle("")
    } catch (e) {
      if (axios.isAxiosError<ApiResponse>(e)) {
        const { response } = e
        if (response?.status === 400) {
          const { data } = response
          addErrorAlert(data.message)
        }
      }
    }
  }

  const handleBoardUpdate = async (boardId: number, title?: string) => {
    if (!title) {
      addErrorAlert("보드 이름은 비워둘 수 없습니다.")

      return
    }

    await modifyProjectBoardApi(workspaceId, projectId, boardId, { title })

    await fetchProjectBoards()
    addSuccessAlert("보드 수정 완료")
  }

  const handleNewBoardTitleEntered = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      await handleAddBoard()
    }
  }

  const handleBoardRemove = async (boardId: number) => {
    await removeProjectBoardApi(workspaceId, projectId, boardId)
    await fetchProjectBoards()
    addSuccessAlert("보드 삭제 완료")
  }

  return !projectDetail || !boards ? (
    <Box />
  ) : (
    <Box>
      <Box>
        <Box>
          <Typography variant="h5">프로젝트 정보</Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">프로젝트 이름</Typography>
          <TextFieldBox
            enterComplete
            text={projectDetail.title}
            bgcolor="rgb(233,233,233)"
            marginTop={0}
            paddingX={1.5}
            fontSize={16}
            handleTextChange={handleProjectTitleChange}
          />
        </Box>
        <Box mt={1}>
          <Typography variant="h6">프로젝트 설명</Typography>
          <TextFieldBox
            multiline
            text={projectDetail.description}
            bgcolor="rgb(233,233,233)"
            marginTop={0}
            paddingX={1.5}
            fontSize={16}
            handleTextChange={handleProjectDescriptionChange}
          />
        </Box>
      </Box>
      <Box mt={10}>
        <Box>
          <Typography variant="h5">프로젝트 보드</Typography>
        </Box>
        <Box mt={3}>
          <Box
            sx={{
              width: 350,
            }}
          >
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
            <Box mt={2}>
              {boards.map(board => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box width="100%">
                    <TextFieldBox
                      enterComplete
                      text={board.title}
                      bgcolor="rgb(233,233,233)"
                      marginTop={0}
                      paddingX={1.5}
                      fontSize={15}
                      handleTextChange={async text => {
                        await handleBoardUpdate(board.boardId, text)
                      }}
                    />
                  </Box>
                  <Box ml={1} pb={1}>
                    <IconButton
                      size="small"
                      // TODO open dialog
                      onClick={() => handleBoardRemove(board.boardId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={10}>
        <Box>
          <Typography variant="h5">Danger Zone</Typography>
        </Box>
        <Box>
          <Box mt={3}>
            <Typography variant="h6">프로젝트 삭제</Typography>
          </Box>
          <Box mt={1}>
            <Button variant="outlined" color="error">
              삭제하기
            </Button>
          </Box>
        </Box>
        <Box>
          <Box mt={3}>
            <Typography variant="h6">프로젝트 탈퇴</Typography>
          </Box>
          <Box mt={1}>
            <Button variant="outlined" color="error">
              탈퇴하기
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectGeneralSetting
