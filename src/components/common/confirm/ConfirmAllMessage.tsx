import React from "react"
import { Box } from "@mui/material"
import ConfirmAllMessage from "./confirmImg/allMessage.png"

export const ConfirmAllMessageComponent = () => {
  return (
    <Box
      sx={{
        width: "280px",
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
          src={ConfirmAllMessage}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "30%",
          fontSize: "15px",
          fontWeight: "700",
          textAlign: "center",
          alignItems: "center",
          color: "#1f4838",
          pt: "15px",
        }}
      >
        모든 쪽지를 읽음으로 변경하시겠습니까
      </Box>
    </Box>
  )
}

export default ConfirmAllMessageComponent
