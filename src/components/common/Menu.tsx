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
        bgcolor: "white",
        position: "relative",
        pb: 1,
      }}
    >
      <Box
        component="div"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#48634f",
          textAlign: "center",
          height: "20px",
          marginY: 2,
        }}
      >
        {title}
        {btn}
      </Box>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Menu
