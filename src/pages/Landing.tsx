import React from "react"
import { Button } from "@mui/material"
import LoginModal from "components/modal/LoginModal"

function Landing() {
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false)

  const openLoginModal = () => {
    setLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setLoginModalOpen(false)
  }

  return (
    <div>
      <h1>landing</h1>
      <Button variant="contained" onClick={openLoginModal}>
        로그인
      </Button>
      <LoginModal open={loginModalOpen} handleClose={closeLoginModal} />
    </div>
  )
}
export default Landing
