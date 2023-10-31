import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "pages/Home"
import Landing from "pages/Landing"
import UserLayout from "Layouts/UserLayout"

function App() {
  const isLogin = true

  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
