import React from "react"
import { Box } from "@mui/material"

interface IconBtnProps {
  text: string
  icon: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  to?: string
  component: React.ElementType
}

const IconBtn = ({ text, icon, onClick, to, component }: IconBtnProps) => {
  return (
    <Box
      component={component}
      onClick={onClick}
      to={to}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "35%",
        bgcolor: "transparent",
        border: "none",
        color: "#303633",
        borderRadius: "10px",
        textDecoration: "none",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(146, 146, 146, 0.1)",
        },
      }}
    >
      <Box component="div" sx={{ color: "#1f4838" }}>
        {icon}
      </Box>
      <Box component="span" sx={{ fontSize: "8px", fontWeight: "bold" }}>
        {text}
      </Box>
    </Box>
  )
}

export default IconBtn
