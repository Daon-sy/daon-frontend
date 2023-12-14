import React from "react"
import { Box } from "@mui/material"
import ConfirmPassword from "./confirmImg/password.png"

export const ConfirmPasswordComponent = () => {
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
          src={ConfirmPassword}
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
        본인 확인을 위해 비밀번호를 입력해주세요
      </Box>
    </Box>
  )
}

export default ConfirmPasswordComponent
