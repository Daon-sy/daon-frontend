import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import {
  getLastWorkspaceStore,
  getMyMemberDetailStore,
  getMyWorkspaceIdStore,
} from "store/userStore"
import ProjectRoutes from "pages/workspace/project"
import TaskRoutes from "pages/workspace/task"
import WorkspaceMain from "pages/workspace/WorkspaceMain"
import useFetchWorkspaceDetail from "hooks/workspace/useFetchWorkspaceDetail"
import useFetchMyWorkspaceProfile from "hooks/workspace/useFetchMyWorkspaceProfile"
import useFetchProjectList from "hooks/project/useFetchProjectList"
import MemberSidebarLayout from "layouts/MemberSidebarLayout"
import MemberDefaultHeaderLayout from "layouts/MemberDefaultHeaderLayout"
import { Box, Button, CircularProgress } from "@mui/material"
import NotFound from "components/common/NotFound"
import NoData from "components/common/NoData"

const WorkspaceDetailRoutes = () => {
  const { workspaceId } = useParams()
  const [isWorkspaceNotFound, setIsWorkspaceNotFound] = React.useState(false)
  const {
    workspaceDetail,
    fetchWorkspaceDetail,
    error: fetchWorkspaceDetailError,
  } = useFetchWorkspaceDetail(Number(workspaceId), true)
  const { myWorkspaceProfile, fetchMyWorkspaceProfile } =
    useFetchMyWorkspaceProfile(Number(workspaceId), true)
  const { projects, fetchProjectList } = useFetchProjectList(
    Number(workspaceId),
    true,
  )
  const { myDetail } = getMyMemberDetailStore()
  const { setLastConnectedWs } = getLastWorkspaceStore()
  const { myWorkspaceId } = getMyWorkspaceIdStore()

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

  React.useEffect(() => {
    if (fetchWorkspaceDetailError) {
      const { errorCode } = fetchWorkspaceDetailError
      if (errorCode === 3000) setIsWorkspaceNotFound(true)
    }
  }, [fetchWorkspaceDetailError])

  if (isWorkspaceNotFound)
    return (
      <Box
        width="100%"
        height="90vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <NoData
          content="존재하지 않는 워크스페이스 입니다"
          width={300}
          height={150}
        />
        <Button
          variant="outlined"
          onClick={() => {
            location.href = `/workspace/${myWorkspaceId}`
          }}
          sx={{ mt: 3 }}
        >
          내 워크스페이스로 이동
        </Button>
      </Box>
    )

  return workspaceDetail && myWorkspaceProfile && projects ? (
    <Routes>
      <Route element={<MemberDefaultHeaderLayout />}>
        <Route element={<MemberSidebarLayout />}>
          <Route index element={<WorkspaceMain />} />
          <Route path="/project/*" element={<ProjectRoutes />} />
          <Route path="/task/*" element={<TaskRoutes />} />
          <Route path="/*" element={<NotFound />} />
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
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default WorkspaceRoutes
