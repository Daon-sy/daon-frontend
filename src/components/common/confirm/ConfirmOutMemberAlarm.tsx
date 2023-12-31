import React from "react"
import { Box } from "@mui/material"
import ConfirmOutMember from "./confirmImg/outMember.png"

interface Props {
  title: string
  contents1: string
  contents2: string
}

export const ConfirmOutMemberAlarmComponent = ({
  title,
  contents1,
  contents2,
}: Props) => {
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
          src={ConfirmOutMember}
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
        해당 {title}에서 내보내졌습니다.
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
          lineHeight: 1.5,
        }}
      >
        {contents1} <br /> {contents2}
      </Box>
    </Box>
  )
}

export default ConfirmOutMemberAlarmComponent
