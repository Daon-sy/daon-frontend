import React from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import TaskView from "components/task/TaskView"

const BoardTaskView: React.FC = () => {
  const { projectId, boardId } = useParams()

  return (
    <Box sx={{ height: "100%" }}>
      <h1>보드 내 전체 할일 View 페이지</h1>
      <TaskView
        params={{ projectId: Number(projectId), boardId: Number(boardId) }}
      />
    </Box>
  )
}

export default BoardTaskView
