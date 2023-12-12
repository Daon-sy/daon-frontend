import React from "react"
import nodata from "assets/img/no_data.png"
import { Box, Typography } from "@mui/material"

interface NoDataProps {
  content: string
  width?: string | number
  height?: string | number
}

const NoData: React.FC<NoDataProps> = ({
  content,
  width = "320px",
  height = "160px",
}: NoDataProps) => {
  return (
    <>
      <Box sx={{ width, height }} component="img" src={nodata} />
      <Typography>{content}</Typography>
    </>
  )
}
export default NoData
