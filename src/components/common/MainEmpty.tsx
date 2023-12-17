import { Box, Typography } from "@mui/material"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import React from "react"

interface MainEmptyProp {
  icon: FontAwesomeIconProps["icon"]
  content: string
  bgcolor: string
}

const MainEmpty: React.FC<MainEmptyProp> = ({
  icon,
  content,
  bgcolor,
}: MainEmptyProp) => {
  return (
    <>
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          width: "58px",
          height: "58px",
          fontSize: "24px",
          borderRadius: "50%",
          bgcolor,
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <FontAwesomeIcon icon={icon} color="#ffffff" />
      </Box>
      <Typography> {content} </Typography>
    </>
  )
}

export default MainEmpty
