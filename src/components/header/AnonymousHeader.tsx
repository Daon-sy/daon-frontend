import React from "react"
import { Link } from "react-router-dom"
import { Box, Button, Stack, AppBar, Toolbar } from "@mui/material"
import Logo from "components/header/Logo"

const AnonymousHeader = () => {
  return (
    <AppBar position="sticky" sx={{ top: 0, height: 70, bgcolor: "white" }}>
      <Toolbar sx={{ height: 70, bgcolor: "white" }}>
        <Logo />
        <Box>
          <Stack spacing={2} direction="row">
            <Link
              to="/sign-up"
              style={{ textDecoration: "none", color: "#495e57" }}
            >
              <Button color="green">회원가입</Button>
            </Link>
            <Link
              to="/sign-in"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="green">로그인</Button>
            </Link>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AnonymousHeader
