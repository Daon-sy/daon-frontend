import React from "react"
import TaskView from "components/task/TaskView"
import Box from "@mui/material/Box"

const BookmarkView: React.FC = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <TaskView params={{ bookmarked: true }} title="북마크 할 일 목록" />
    </Box>
  )
}

export default BookmarkView
