import React from "react"
import { Box, IconButton, Typography } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

interface Props {
  title: string
  onBackButtonClick: () => void
  children: React.ReactNode
}

const SearchResultNav: React.FC<Props> = ({
  title,
  onBackButtonClick,
  children,
}) => (
  <Box>
    <Box display="flex" alignItems="center" mb={1 / 4}>
      <IconButton size="small" onClick={onBackButtonClick}>
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Typography ml={0.5} fontSize={15} color="primary" fontWeight={500}>
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
)

export default SearchResultNav
