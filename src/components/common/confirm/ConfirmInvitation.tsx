import React from "react"
import { Box } from "@mui/material"
import ConfirmInvitation from "./confirmImg/invitation.png"

export const ConfirmInvitationComponent = () => {
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
          src={ConfirmInvitation}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
          alignItems: "center",
          color: "#1f4838",
          pt: "8px",
        }}
      >
        해당 사용자를 초대하시겠습니까?
      </Box>
    </Box>
  )
}

export default ConfirmInvitationComponent
