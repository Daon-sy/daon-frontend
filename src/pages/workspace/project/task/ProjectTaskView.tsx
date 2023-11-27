import React from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import TaskView from "components/task/TaskView"

const ProjectTaskView: React.FC = () => {
  const { projectId } = useParams()

  return (
    <Box sx={{ height: "100%" }}>
      <h1>프로젝트 전체 할일 View 페이지</h1>
      <TaskView params={{ projectId: Number(projectId) }} />
    </Box>
  )
}

export default ProjectTaskView
