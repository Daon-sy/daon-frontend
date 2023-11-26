import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import UserLayout from "layouts/UserLayout"
import ProjectRoutes from "pages/workspace/project"
import TaskRoutes from "pages/workspace/task"
import WorkspaceMain from "pages/workspace/WorkspaceMain"
import useFetchWorkspaceDetail from "hooks/workspace/useFetchWorkspaceDetail"
import useFetchMyWorkspaceProfile from "hooks/workspace/useFetchMyWorkspaceProfile"
import useFetchProjectList from "hooks/project/useFetchProjectList"

const WorkspaceDetailRoutes = () => {
  const { workspaceId } = useParams()
  const { workspaceDetail, fetchWorkspaceDetail } = useFetchWorkspaceDetail(
    Number(workspaceId),
    true,
  )
  const { myWorkspaceProfile, fetchMyWorkspaceProfile } =
    useFetchMyWorkspaceProfile(Number(workspaceId), true)
  const { projects, fetchProjectList } = useFetchProjectList(
    Number(workspaceId),
    true,
  )

  React.useEffect(() => {
    fetchWorkspaceDetail()
    fetchMyWorkspaceProfile()
    fetchProjectList()
  }, [workspaceId])

  return workspaceDetail && myWorkspaceProfile && projects ? (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<WorkspaceMain />} />
        <Route path="/project/*" element={<ProjectRoutes />} />
        <Route path="/task/*" element={<TaskRoutes />} />
      </Route>
    </Routes>
  ) : null
}

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route path="/:workspaceId/*" element={<WorkspaceDetailRoutes />} />
    </Routes>
  )
}

export default WorkspaceRoutes
