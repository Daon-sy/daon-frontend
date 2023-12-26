import React from "react"
import { Route, Routes } from "react-router-dom"
import BookmarkView from "pages/workspace/task/BookmarkView"
import WorkspaceMytaskView from "pages/workspace/task/WorkspaceMytaskView"
import NotFound from "components/common/NotFound"

const TaskRoutes = () => {
  return (
    <Routes>
      <Route path="/bookmark" element={<BookmarkView />} />
      <Route path="/my" element={<WorkspaceMytaskView />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default TaskRoutes
