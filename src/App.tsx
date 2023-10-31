import Home from "pages/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"

import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  const isLogin = false

  return (
    <BrowserRouter>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
