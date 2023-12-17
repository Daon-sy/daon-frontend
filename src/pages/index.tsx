import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Backdrop, CircularProgress } from "@mui/material"
import { getTokenStore } from "store/tokenStore"
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

const PageRoutes = () => {
  const { fetch: reissue } = useReissue()
  React.useEffect(() => {
    reissue()
  }, [])

  const { token, isFetchingReissue } = getTokenStore()
  const {
    myDetail,
    fetch: fetchMyMemberDetail,
    isFetching: isFetchingMyMemberDetail,
  } = useFetchMyMemberDetail()
  const { fetch: fetchMySettings, isFetching: isFetchingMySettings } =
    useFetchMySettings()
  React.useEffect(() => {
    if (token) {
      fetchMyMemberDetail()
      fetchMySettings()
    }
  }, [token])

  const { backdropOpen } = getBackdropStore()
  if (
    isFetchingReissue !== "FETCHED" ||
    isFetchingMyMemberDetail ||
    isFetchingMySettings
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
    <BrowserRouter>
      {!!token && !!myDetail ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspace/*" element={<WorkspaceRoutes />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<AnonymousLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
      {backdropOpen ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </BrowserRouter>
  )
}

export default PageRoutes
