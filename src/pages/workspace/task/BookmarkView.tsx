import React from "react"
import TaskView from "components/task/TaskView"
import Box from "@mui/material/Box"

const BookmarkView: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <h1>즐겨찾기 할일 View 페이지</h1>
      <TaskView params={{ bookmarked: true }} />
    </Box>
  )
}

export default BookmarkView
