import React from "react"
import { Link } from "react-router-dom"
import { Box, Button, Stack, AppBar, Toolbar } from "@mui/material"
import Logo from "components/header/Logo"

const AnonymousHeader = () => {
  return (
    <AppBar position="sticky" sx={{ top: 0, height: 70 }}>
      <Toolbar sx={{ height: 70 }}>
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
