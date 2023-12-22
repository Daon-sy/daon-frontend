import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Backdrop, Box, Button, CircularProgress } from "@mui/material"
import AnonymousLayout from "layouts/AnonymousLayout"
import Home from "pages/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"
import SignIn from "pages/SignIn"
import WorkspaceRoutes from "pages/workspace"
import { getBackdropStore } from "store/backdropStore"
import useFetchMyMemberDetail from "hooks/member/useFetchMyMemberDetail"
import useFetchMySettings from "hooks/member/useFetchMySettings"
import useReissue from "hooks/auth/useReissue"
import useFetchWorkspaceList from "hooks/workspace/useFetchWorkspaceList"
import NoData from "components/common/NoData"
import { getMyWorkspaceIdStore } from "store/userStore"

const MemberRoute = () => {
  const { myDetail, isFetching: isFetchingMyMemberDetail } =
    useFetchMyMemberDetail()
  const { mySettings, isFetching: isFetchingMySettings } = useFetchMySettings()
  const { workspaces: workspaceList, isFetching: isFetchingWorkspaceList } =
    useFetchWorkspaceList()
  const { myWorkspaceId } = getMyWorkspaceIdStore()

  if (
    isFetchingMyMemberDetail ||
    isFetchingMySettings ||
    isFetchingWorkspaceList ||
    !myDetail ||
    !mySettings ||
    !workspaceList
  )
    return (
      <Backdrop
        open
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workspace/*" element={<WorkspaceRoutes />} />
      <Route
        path="/*"
        element={
          <Box
            width="100%"
            height="90vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <NoData
              content="존재하지 않는 페이지 입니다"
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
        }
      />
    </Routes>
  )
}

const AnonymousUserRoute = () => (
  <Routes>
    <Route element={<AnonymousLayout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

const PageRoutes = () => {
  const { token, isFetchingReissue } = useReissue()

  const { backdropOpen } = getBackdropStore()
  if (isFetchingReissue !== "FETCHED")
    return (
      <Backdrop
        open
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    )

  return (
    <BrowserRouter>
      {token ? <MemberRoute /> : <AnonymousUserRoute />}
      {backdropOpen ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
    </BrowserRouter>
  )
}

export default PageRoutes
