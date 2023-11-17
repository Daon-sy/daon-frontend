import React from "react"
import { Route, Routes } from "react-router-dom"
import ProjectTaskView from "pages/workspace/project/task/ProjectTaskView"
import ProjectMytaskView from "pages/workspace/project/task/ProjectMytaskView"

const TaskRoutes = () => {
  return (
    <Routes>
      <Route index element={<ProjectTaskView />} />
      <Route path="/my" element={<ProjectMytaskView />} />
    </Routes>
  )
}

export default TaskRoutes
