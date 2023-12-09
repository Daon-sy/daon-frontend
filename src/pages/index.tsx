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

const PageRoutes = () => {
  const { token } = getTokenStore()
  const { backdropOpen } = getBackdropStore()
  const {
    myDetail,
    fetch: fetchMyMemberDetail,
    isFetching,
  } = useFetchMyMemberDetail()

  React.useEffect(() => {
    fetchMyMemberDetail()
  }, [token])

  if (isFetching) return null

  return (
    <BrowserRouter>
      {token && myDetail ? (
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
