import React, { ReactNode } from "react"
import { Box, Typography } from "@mui/material"

interface TitleWrapperProps {
  children: ReactNode
  title: string
}
const TitleWrapper: React.FC<TitleWrapperProps> = ({ children, title }) => {
  return (
    <Box
      sx={{
        width: "900px",
        bgcolor: "rgba(0,0,0,0.3)",
        mb: 1,
        px: 2,
        pb: 1,
        borderRadius: 4,
        minHeight: "210px",
        maxHeight: "250px",
      }}
    >
      <Typography
        textAlign="left"
        id="showMember"
        sx={{
          mt: 1,
          pt: 1,
          mb: 1,
          mx: 1,
          fontSize: "20px",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "200px",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default TitleWrapper
