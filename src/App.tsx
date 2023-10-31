import Home from "pages/Home"
import Landing from "pages/Landing"

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
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
