import React from "react"
import TaskView from "components/task/TaskView"
import Box from "@mui/material/Box"

const ProjectTaskView: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <h1>프로젝트 전체 할일 View 페이지</h1>
      <TaskView />
    </Box>
  )
}

export default ProjectTaskView
