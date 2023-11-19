import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import UserLayout from "layouts/UserLayout"
import { getWorkspaceStore } from "store/userStore"
import {
  myWorkspaceParticipantDetailApi,
  workspaceDetailApi,
} from "api/workspace"
import ProjectRoutes from "pages/workspace/project"
import TaskRoutes from "pages/workspace/task"
import WorkspaceMain from "pages/workspace/WorkspaceMain"

const WorkspaceDetailRoutes = () => {
  const { workspace, myProfile, setWorkspace, setMyProfile } =
    getWorkspaceStore()
  const { workspaceId } = useParams()

  const fetchWorkspaceDetail = async () => {
    if (workspaceId) {
      const { data } = await workspaceDetailApi(Number(workspaceId))
      setWorkspace(data)

      const { data: myWorkspaceParticipantDetail } =
        await myWorkspaceParticipantDetailApi(Number(workspaceId))
      setMyProfile(myWorkspaceParticipantDetail)
    }
  }

  React.useEffect(() => {
    fetchWorkspaceDetail()
  }, [workspaceId])

  return workspace && myProfile ? (
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
