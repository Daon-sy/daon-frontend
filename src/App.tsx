import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Reset } from "styled-reset"
import Home from "pages/Home/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"
import { useTokenStore } from "store/tokenStore"
import UserLayout from "Layouts/UserLayout"
import AnonymousLayout from "Layouts/AnonymousLayout"

function App() {
  const tokenState = useTokenStore()

  const isLoggedIn = () => !!tokenState.token

  return (
    <>
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
    </>
  )
}

export default App
