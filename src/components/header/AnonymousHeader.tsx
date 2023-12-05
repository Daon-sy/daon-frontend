import React from "react"
import { Link } from "react-router-dom"
import { Box, Button, Stack, AppBar, Toolbar } from "@mui/material"
import Logo from "components/header/Logo"

const AnonymousHeader = () => {
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false)

  const openLoginModal = () => setLoginModalOpen(true)

  const closeLoginModal = () => setLoginModalOpen(false)

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Nav */}
        <Logo />
        <Box>
          <Stack spacing={2} direction="row">
            <Link
              to="/sign-up"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit">회원가입</Button>
            </Link>
            <Link
              to="/sign-in"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit">로그인</Button>
            </Link>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AnonymousHeader
