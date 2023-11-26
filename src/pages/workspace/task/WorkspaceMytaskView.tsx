import React from "react"
import TaskView from "components/task/TaskView"
import Box from "@mui/material/Box"

const WorkspaceMytaskView: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <h1>워크스페이스 내 나의 전체 할일</h1>
      <TaskView params={{ my: true }} />
    </Box>
  )
}

export default WorkspaceMytaskView
