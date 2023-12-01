import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { getProjectStore, getWorkspaceStore } from "store/userStore"
import { projectDetailApi } from "api/project"
import BoardRoutes from "pages/workspace/project/board"
import TaskRoutes from "pages/workspace/project/task"
import ProjectTaskView from "pages/workspace/project/task/ProjectTaskView"

const ProjectDetailRoutes = () => {
  const { workspace } = getWorkspaceStore()
  const { setProject, clear: clearProjectStore } = getProjectStore()
  const { projectId } = useParams()

  const fetchProjectDetail = async () => {
    if (workspace && projectId) {
      const { data } = await projectDetailApi(
        workspace.workspaceId,
        Number(projectId),
      )
      setProject(data)
    }
  }

  React.useEffect(() => {
    fetchProjectDetail()
  }, [projectId])

  return (
    <Routes>
      <Route index element={<ProjectTaskView />} />
      <Route path="/board/*" element={<BoardRoutes />} />
      <Route path="/task/*" element={<TaskRoutes />} />
    </Routes>
  )
}

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/:projectId/*" element={<ProjectDetailRoutes />} />
    </Routes>
  )
}

export default ProjectRoutes
