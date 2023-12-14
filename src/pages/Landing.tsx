import React from "react"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getTokenStore } from "store/tokenStore"

import landingOne from "assets/img/landing1.webp"
import landingTwo from "assets/img/landing2.webp"
import landingThree from "assets/img/landing3.webp"
import landingFour from "assets/img/landing4.webp"

function Landing() {
  const tokenState = getTokenStore()
  const navigate = useNavigate()

  const start = async () => {
    if (!tokenState) {
      navigate("/sign-in")
    } else {
      navigate("/workspace/me")
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        scrollbarWidth: "0.5em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafffd",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            /* backgroundImage: `url(${landingOne})`, */
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "325px",
              height: "40px",
              position: "absolute",
              left: "30.5%",
              transform: "translateX(-50%)",
              marginTop: "398px",
            }}
            onClick={start}
          >
            지금 시작하기
          </Button>
        </Box>
        <img
          src={landingOne}
          alt=""
          style={{ width: "73.2%", height: "auto" }}
        />
        <Box
          component="img"
          sx={{ width: "75%", height: "auto" }}
          src={landingTwo}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e9f7f0",
        }}
      >
        <Box
          component="img"
          sx={{ width: "75%", height: "auto" }}
          src={landingThree}
        />
        <Box
          component="img"
          sx={{ width: "75%", height: "auto" }}
          src={landingFour}
        />
      </Box>
    </Box>
  )
}
export default Landing
