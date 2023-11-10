import React from "react"
import Button from "@mui/material/Button"

interface IconBtnProps {
  text: string
  icon: React.ReactNode
}

const IconBtn = ({ text, icon }: IconBtnProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      sx={{
        width: "100%",
        py: 1,
        textAlign: "left",
        fontSize: "16px",
        border: "1px solid black",
        color: "rgb(0,0,0)",
        mb: "4px",
        borderRadius: 3,
      }}
    >
      {text}
    </Button>
  )
}

export default IconBtn
