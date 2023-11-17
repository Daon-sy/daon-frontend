import React from "react"
import { Route, Routes } from "react-router-dom"
import BoardTaskView from "pages/workspace/project/board/BoardTaskView"

const BoardRoutes = () => {
  return (
    <Routes>
      <Route path="/:boardId/tasks" element={<BoardTaskView />} />
    </Routes>
  )
}

export default BoardRoutes
