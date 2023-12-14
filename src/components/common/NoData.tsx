import React from "react"
import nodata from "assets/img/no_data.webp"
import { Box, Typography } from "@mui/material"
import { SxProps } from "@mui/system/styleFunctionSx"

interface NoDataProps {
  content: string
  width?: string | number
  height?: string | number
  sx?: SxProps
}

const NoData: React.FC<NoDataProps> = ({
  content,
  width = "320px",
  height = "160px",
  sx,
}: NoDataProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Box sx={{ width, height }} component="img" src={nodata} />
      <Typography>{content}</Typography>
    </Box>
  )
}
export default NoData
