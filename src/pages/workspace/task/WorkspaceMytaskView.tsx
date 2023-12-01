import React from "react"
import TaskView from "components/task/TaskView"
import Box from "@mui/material/Box"

const WorkspaceMytaskView: React.FC = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <TaskView params={{ my: true }} title="전체 내 할 일 목록" />
    </Box>
  )
}

export default WorkspaceMytaskView
