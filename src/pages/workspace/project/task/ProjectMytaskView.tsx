import React from "react"
import TaskView from "components/task/TaskView"
import Box from "@mui/material/Box"

const ProjectMytaskView: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <h1>프로젝트 내 할일 View 페이지</h1>
      <TaskView
        params={{
          my: true,
        }}
      />
    </Box>
  )
}

export default ProjectMytaskView
