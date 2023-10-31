import Home from "pages/Home"
import Landing from "pages/Landing"
import SignUp from "pages/SignUp"

import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useTokenStore } from "store/store"

function App() {
  const tokenState = useTokenStore()

  const isLoggedIn = () => !!tokenState.token

  return (
    <BrowserRouter>
      {isLoggedIn() ? (
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
