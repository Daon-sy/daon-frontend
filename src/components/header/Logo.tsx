import React from "react"
import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"

const Logo = () => {
  return (
    <Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "#495e57",
          textDecoration: "none",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          DAON
        </Link>
      </Typography>
    </Box>
  )
}

export default Logo
