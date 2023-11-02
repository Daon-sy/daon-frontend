import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Box, Button } from "@mui/material"
import LoginModal from "components/modal/LoginModal"
import { Link } from "react-router-dom"

const AnonymousHeader = () => {
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false)

  const openLoginModal = () => setLoginModalOpen(true)

  const closeLoginModal = () => setLoginModalOpen(false)

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Nav */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
          flexGrow={1}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            LOGO
          </Link>
        </Typography>
        <Box>
          <Button color="inherit" onClick={openLoginModal}>
            로그인
          </Button>
          <LoginModal open={loginModalOpen} handleClose={closeLoginModal} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AnonymousHeader
