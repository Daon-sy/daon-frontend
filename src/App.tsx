import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "pages/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"
import SignIn from "pages/SignIn"
import { getTokenStore } from "store/getTokenStore"
import UserLayout from "layouts/UserLayout"
import AnonymousLayout from "layouts/AnonymousLayout"
import RefreshComponent from "auth/RefreshComponent"
import Workspace from "pages/Workspace"
import Project from "pages/Project"
import BoardTaskView from "pages/BoardTaskView"
import ProjectTaskView from "pages/ProjectTaskView"
import ProjectMytaskView from "pages/ProjectMytaskView"
import BookmarkView from "pages/BookmarkView"
import WorkspaceMytaskView from "pages/WorkspaceMytaskView"

function App() {
  const tokenState = getTokenStore()

  const isLoggedIn = () => !tokenState.token

  return (
    <RefreshComponent>
      <BrowserRouter>
        {isLoggedIn() ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<UserLayout />}>
              <Route path="/workspace/:workspaceId" element={<Workspace />} />
              <Route path="/workspace/:workspaceId/project/:projectId">
                <Route index element={<Project />} />
                <Route
                  path="board/:boardId/tasks"
                  element={<BoardTaskView />}
                />
                <Route path="task" element={<ProjectTaskView />} />
                <Route path="task/my" element={<ProjectMytaskView />} />
              </Route>
              <Route
                path="/workspace/:workspaceId/task/bookmark"
                element={<BookmarkView />}
              />
              <Route
                path="/workspace/:workspaceId/task/my"
                element={<WorkspaceMytaskView />}
              />
            </Route>
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
      </BrowserRouter>
    </RefreshComponent>
  )
}

export default App
