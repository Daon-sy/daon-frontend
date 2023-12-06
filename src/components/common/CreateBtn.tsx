import * as React from "react"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { Box } from "@mui/material"

interface CreateBtnProps {
  handleClick: () => void
  children?: React.ReactNode
}

const CreateBtn = ({ handleClick, children }: CreateBtnProps) => {
  return (
    <Box
      component="button"
      onClick={handleClick}
      sx={{
        position: "relative",
        right: 0,
        display: "flex",
        alignItems: "center",
        bgcolor: "transparent",
        color: "#48634f",
        border: "none",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      {children}
    </Box>
  )
}

CreateBtn.defaultProps = {
  children: <AddBoxIcon />,
}

export default CreateBtn
