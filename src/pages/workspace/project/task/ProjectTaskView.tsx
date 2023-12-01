import React from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import TaskView from "components/task/TaskView"
import { getProjectStore } from "store/userStore"

const ProjectTaskView: React.FC = () => {
  const { projectId } = useParams()
  const { project } = getProjectStore()

  return (
    <Box sx={{ height: "100%" }}>
      <TaskView
        params={{ projectId: Number(projectId) }}
        title={`${project?.title} 프로젝트의 할 일 목록`}
      />
    </Box>
  )
}

export default ProjectTaskView
