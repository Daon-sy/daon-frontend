import React, { useEffect, useState } from "react"
import BoardCard from "components/board/BoardCard"
import { Board } from "_types/project"
import { projectBoardListApi } from "api/project"
import TitleWrapper from "components/common/TitleWrapper"
import { Box } from "@mui/material"
import { getProjectStore, getWorkspaceStore } from "store/userStore"

const ProjectMain: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([])
  const { workspace } = getWorkspaceStore()
  const { project } = getProjectStore()

  useEffect(() => {
    if (workspace && project) {
      const fetchData = async () => {
        try {
          const response = await projectBoardListApi(
            workspace.workspaceId,
            project.projectId,
          )
          setBoards(response.data.boards)
        } catch (error) {
          console.error("Error fetching boards:", error)
        }
      }
      fetchData()
    }
  }, [workspace, project])

  return workspace && project ? (
    <>
      <h1>프로젝트 메인 페이지</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "30%",
        }}
      >
        <TitleWrapper title="보드 목록">
          {boards.map(board => (
            <BoardCard
              key={board.boardId}
              board={board}
              to={`/workspace/${workspace.workspaceId}/project/${project.projectId}/board/${board.boardId}/tasks`}
            />
          ))}
        </TitleWrapper>
      </Box>
    </>
  ) : null
}

export default ProjectMain
