import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { getLastWorkspaceStore, getMyMemberDetailStore } from "store/userStore"
import ProjectRoutes from "pages/workspace/project"
import TaskRoutes from "pages/workspace/task"
import WorkspaceMain from "pages/workspace/WorkspaceMain"
import useFetchWorkspaceDetail from "hooks/workspace/useFetchWorkspaceDetail"
import useFetchMyWorkspaceProfile from "hooks/workspace/useFetchMyWorkspaceProfile"
import useFetchProjectList from "hooks/project/useFetchProjectList"
import MemberSidebarLayout from "layouts/MemberSidebarLayout"
import MemberDefaultHeaderLayout from "layouts/MemberDefaultHeaderLayout"
import { Box, CircularProgress } from "@mui/material"

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
  const { myDetail } = getMyMemberDetailStore()
  const { setLastConnectedWs } = getLastWorkspaceStore()

  React.useEffect(() => {
    if (myDetail && workspaceId) {
      setLastConnectedWs({
        memberId: myDetail.memberId || "",
        lastConnectedWsId: Number(workspaceId),
      })
    }

    fetchWorkspaceDetail()
    fetchMyWorkspaceProfile()
    fetchProjectList()
  }, [workspaceId])

  return workspaceDetail && myWorkspaceProfile && projects ? (
    <Routes>
      <Route element={<MemberDefaultHeaderLayout />}>
        <Route element={<MemberSidebarLayout />}>
          <Route index element={<WorkspaceMain />} />
          <Route path="/project/*" element={<ProjectRoutes />} />
          <Route path="/task/*" element={<TaskRoutes />} />
        </Route>
      </Route>
    </Routes>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <CircularProgress color="primary" />
    </Box>
  )
}

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route path="/:workspaceId/*" element={<WorkspaceDetailRoutes />} />
    </Routes>
  )
}

export default WorkspaceRoutes
