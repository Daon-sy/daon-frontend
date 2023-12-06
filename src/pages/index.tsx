import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "pages/Home"
import { getTokenStore } from "store/tokenStore"
import AnonymousLayout from "layouts/AnonymousLayout"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"
import SignIn from "pages/SignIn"
import WorkspaceRoutes from "pages/workspace"
import { Backdrop, CircularProgress } from "@mui/material"
import { getBackdropStore } from "store/backdropStore"
import { myMemberDetailApi } from "api/member"
import { getMyMemberDetailStore } from "store/userStore"

const PageRoutes = () => {
  const { token } = getTokenStore()
  const { backdropOpen } = getBackdropStore()
  const { setMyDetail } = getMyMemberDetailStore()

  const fetchMyMemberDetail = async () => {
    if (token) {
      const { data } = await myMemberDetailApi()
      setMyDetail(data)
    }
  }

  React.useEffect(() => {
    fetchMyMemberDetail()
  }, [token])

  return (
    <BrowserRouter>
      {token ? (
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
