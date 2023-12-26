import React from "react"
import { Box } from "@mui/material"

interface MenuProps {
  title: string
  children: React.ReactNode
  btn?: React.ReactNode
}

const Menu: React.FC<MenuProps> = ({ title, children, btn }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        pb: 1,
        height: "calc(100vh - 330px)",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#48634f",
          textAlign: "center",
          height: "20",
          marginY: 1,
        }}
      >
        {title}
        {btn}
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          flexGrow: 1,
          height: "calc(100vh - 370px)",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Menu
