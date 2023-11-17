import React from "react"
import { Route, Routes } from "react-router-dom"
import BookmarkView from "pages/workspace/task/BookmarkView"
import WorkspaceMytaskView from "pages/workspace/task/WorkspaceMytaskView"

const TaskRoutes = () => {
  return (
    <Routes>
      <Route path="/bookmark" element={<BookmarkView />} />
      <Route path="/my" element={<WorkspaceMytaskView />} />
    </Routes>
  )
}

export default TaskRoutes
