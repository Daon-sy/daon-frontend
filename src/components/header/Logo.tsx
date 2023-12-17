import React from "react"
import { Link } from "react-router-dom"
import { Box } from "@mui/material"
import logo from "assets/img/logo.webp"
import { getTokenStore } from "store/tokenStore"
import { getWorkspaceStore } from "store/userStore"

const Logo = () => {
  const { token } = getTokenStore()
  const { workspace } = getWorkspaceStore()
  return (
    <Box mr={2}>
      <Link
        to={!token ? "/" : `/workspace/${workspace?.workspaceId}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          height: "30px",
          width: "80px",
          cursor: "pointer",
        }}
      >
        <Box component="img" src={logo} alt="로고" height="44px" width="80px" />
      </Link>
    </Box>
  )
}

export default Logo
