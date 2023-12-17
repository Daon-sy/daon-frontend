import React from "react"
import { Box } from "@mui/material"
import ConfirmSuccess from "./confirmImg/success.png"

interface Props {
  title: string
  contents: string
}

export const ConfirmSuccessComponent = ({ title, contents }: Props) => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "120px",
            height: "120px",
            pb: "20px",
          }}
          src={ConfirmSuccess}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "10%",
          fontSize: "15px",
          fontWeight: "700",
          textAlign: "center",
          alignItems: "center",
          color: "#1f4838",
          pt: "8px",
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          fontSize: "12px",
          fontWeight: "300",
          textAlign: "center",
          alignItems: "center",
          color: "#858585",
          pt: "12px",
        }}
      >
        {contents}
      </Box>
    </Box>
  )
}

export default ConfirmSuccessComponent
