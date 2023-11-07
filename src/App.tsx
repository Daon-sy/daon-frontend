import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Reset } from "styled-reset"
import Home from "pages/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"
import { getTokenStore } from "store/getTokenStore"
import UserLayout from "layouts/UserLayout"
import AnonymousLayout from "layouts/AnonymousLayout"
import RefreshComponent from "auth/RefreshComponent"

function App() {
  const tokenState = getTokenStore()

  const isLoggedIn = () => !!tokenState.token

  return (
    <RefreshComponent>
      <Reset />
      <BrowserRouter>
        {isLoggedIn() ? (
          <Routes>
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route element={<AnonymousLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </RefreshComponent>
  )
}

export default App
