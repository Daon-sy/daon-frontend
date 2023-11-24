import React from "react"
import { Box } from "@mui/material"

interface IconBtnProps {
  text: string
  icon: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const IconBtn = ({ text, icon, onClick }: IconBtnProps) => {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "35%",
        bgcolor: "transparent",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(146, 146, 146, 0.1)",
        },
      }}
    >
      <Box component="div" sx={{ width: "80%", color: "#82b89b" }}>
        {icon}
      </Box>
      <Box component="span" sx={{ fontSize: "12px", color: "#303633" }}>
        {text}
      </Box>
    </Box>
  )
}

export default IconBtn
