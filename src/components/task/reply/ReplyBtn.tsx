import React from "react"
import { Box } from "@mui/material"

interface ReplyBtnProps {
  handleClick: () => void
  children: React.ReactNode
}

const ReplyBtn = ({ handleClick, children }: ReplyBtnProps) => {
  return (
    <Box
      component="button"
      onClick={handleClick}
      sx={{
        position: "relative",
        fontSize: "12px",
        border: "none",
        bgcolor: "transparent",
        borderRadius: "30px",
        color: "grey",
        "&:hover": {
          backgroundColor: "rgb(7, 177, 77, 0.42)",
        },
      }}
    >
      {children}
    </Box>
  )
}

export default ReplyBtn
