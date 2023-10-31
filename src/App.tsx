import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Reset } from "styled-reset"
import Home from "pages/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"
import UserLayout from "Layouts/UserLayout"

function App() {
  const isLogin = true

  return (
    <>
      <Reset />
      <BrowserRouter>
        {isLogin ? (
          <Routes>
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  )
}

export default App
