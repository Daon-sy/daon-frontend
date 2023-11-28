import React from "react"
import { Box } from "@mui/material"

interface SubIconBtnProps {
  icon: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  color?: string
  position?: string
  right?: string
  top?: string
}

const SubIconBtn = ({
  icon,
  onClick,
  color,
  position,
  right,
  top,
}: SubIconBtnProps) => {
  return (
    <Box
      component="button"
      sx={{
        bgcolor: "transparent",
        border: "none",
        borderRadius: "10px",
        color: `${color}`,
        cursor: "pointer",
        pt: 0.4,
        paddingRight: 0.5,
        position: `${position}`,
        top: `${top}`,
        right: `${right}`,
        ml: 0.5,
        "&:hover": {
          bgcolor: "rgba(0,0,0,0.1)",
        },
      }}
      onClick={onClick}
    >
      {icon}
    </Box>
  )
}

export default SubIconBtn
