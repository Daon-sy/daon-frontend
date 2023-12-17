import { Box } from "@mui/material"
import React from "react"
import NoData from "components/common/NoData"

interface Props {
  content?: string
}

const NotFound: React.FC<Props> = ({
  content = "존재하지 않는 페이지 입니다.",
}) => {
  return (
    <Box
      width="100%"
      height="90%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <NoData content={content} width={300} height={150} />
    </Box>
  )
}

export default NotFound
