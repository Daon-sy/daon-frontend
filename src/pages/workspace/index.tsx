import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { getBackdropStore } from "store/backdropStore"
import UserLayout from "layouts/UserLayout"
import ProjectRoutes from "pages/workspace/project"
import TaskRoutes from "pages/workspace/task"
import WorkspaceMain from "pages/workspace/WorkspaceMain"
import useFetchWorkspaceDetail from "hooks/workspace/useFetchWorkspaceDetail"
import useFetchMyWorkspaceProfile from "hooks/workspace/useFetchMyWorkspaceProfile"
import useFetchProjectList from "hooks/project/useFetchProjectList"
import useNotification from "hooks/sse/useNotification"
import useFetchNotifications from "hooks/notification/useFetchNotifications"

const WorkspaceDetailRoutes = () => {
  const { workspaceId } = useParams()
  const {
    workspaceDetail,
    fetchWorkspaceDetail,
    isFetching: isWorkspaceDetailFetching,
  } = useFetchWorkspaceDetail(Number(workspaceId), true)
  const {
    myWorkspaceProfile,
    fetchMyWorkspaceProfile,
    isFetching: isMyWorkspaceProfileFetching,
  } = useFetchMyWorkspaceProfile(Number(workspaceId), true)
  const {
    projects,
    fetchProjectList,
    isFetching: isProjectListFetching,
  } = useFetchProjectList(Number(workspaceId), true)
  const { backdropOpen, handleBackdropOpen, handleBackdropClose } =
    getBackdropStore()
  useFetchNotifications()

  useNotification({
    ssePath: "/api/notifications/subscribe",
  })

  React.useEffect(() => {
    fetchWorkspaceDetail()
    fetchMyWorkspaceProfile()
    fetchProjectList()
  }, [workspaceId])

  React.useLayoutEffect(() => {
    if (
      isWorkspaceDetailFetching ||
      isMyWorkspaceProfileFetching ||
      isProjectListFetching
    ) {
      handleBackdropOpen()
    } else if (backdropOpen) {
      handleBackdropClose()
    }
  }, [
    isWorkspaceDetailFetching,
    isMyWorkspaceProfileFetching,
    isProjectListFetching,
  ])

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
