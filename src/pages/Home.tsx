import React from "react"
import { Button } from "@mui/material"
import { useTokenStore } from "store/store"
import { useAlert } from "hooks/useAlert"

const Home = () => {
  const tokenState = useTokenStore()
  const { addInfo } = useAlert()

  const onLogoutButtonClick = () => {
    tokenState.clear()
    addInfo("로그아웃 완료")
  }

  return (
    <div>
      <h1>Home</h1>
      <Button
        variant="contained"
        onClick={onLogoutButtonClick}
        color="secondary"
      >
        로그아웃
      </Button>
    </div>
  )
}
export default Home
