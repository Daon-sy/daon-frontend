import React from "react"
import { Box } from "@mui/material"

interface ReplyBtnProps {
  handleClick: () => void
  children: React.ReactNode
  bgcolor: string
}

const ReplyBtn = ({ handleClick, children, bgcolor }: ReplyBtnProps) => {
  return (
    <Box
      component="button"
      onClick={handleClick}
      sx={{
        mt: "8px",
        mx: "4px",
        py: "4px",
        px: "8px",
        position: "relative",
        fontSize: "8px",
        border: "none",
        bgcolor,
        borderRadius: "4px",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#1f4838",
        },
      }}
    >
      {children}
    </Box>
  )
}

export default ReplyBtn
