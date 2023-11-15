import React, { useEffect, useState } from "react"
import BoardCard from "components/board/BoardCard"
import { Board } from "_types/project"
import { projectBoardListApi } from "api/project"
import TitleWrapper from "components/common/TitleWrapper"
import { Box } from "@mui/material"

const Project: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([])

  const workspaceId = location.pathname.split("/")[2]
  const projectId = location.pathname.split("/")[4]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectBoardListApi(+workspaceId, +projectId)
        setBoards(response.data.boards)
      } catch (error) {
        console.error("Error fetching boards:", error)
      }
    }
    fetchData()
  }, [])

  return (
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
              to={`/workspace/${String(workspaceId)}/project/${String(
                projectId,
              )}/board/${board.boardId}/tasks`}
            />
          ))}
        </TitleWrapper>
      </Box>
    </>
  )
}

export default Project
