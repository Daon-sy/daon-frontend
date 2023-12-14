import React from "react"
import { Box } from "@mui/material"
import ConfirmOutMember from "./confirmImg/outMember.png"

export const ConfirmOutMemberComponent = () => {
  return (
    <Box
      sx={{
        width: "500px",
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
          src={ConfirmOutMember}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
          alignItems: "center",
          color: "#e43f3d",
          pt: "8px",
        }}
      >
        해당 사용자를 내보내시겠습니까?
      </Box>
    </Box>
  )
}

export default ConfirmOutMemberComponent
