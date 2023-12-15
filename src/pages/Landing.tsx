import React from "react"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getTokenStore } from "store/tokenStore"

import landingOne from "assets/img/landing1.webp"
import landingTwo from "assets/img/landing2.webp"
import landingThree from "assets/img/landing3.webp"
import landingFour from "assets/img/landing4.webp"
import arrow from "assets/img/arrow.webp"

function Landing() {
  const { token } = getTokenStore()
  const navigate = useNavigate()

  const start = async () => {
    if (!token) {
      navigate("/sign-in")
    } else {
      navigate("/workspace/me")
    }
  }

  return (
    <>
      <Box
        width={screen.width}
        display="flex"
        justifyContent="center"
        sx={{ backgroundColor: "#fafffd" }}
      >
        <Box
          sx={{
            width: 1200,
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
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "357px",
                  height: "40px",
                  position: "absolute",
                  left: "23.5%",
                  transform: "translateX(-50%)",
                  marginTop: "432px",
                  boxShadow: "3px 3px 1px #cccfce",
                }}
                onClick={start}
              >
                <span style={{ marginRight: "15px" }}>지금 시작하기</span>
                <img src={arrow} alt="" style={{ width: "180px" }} />
              </Button>
            </Box>
            <Box component="img" src={landingOne} style={{ width: "100%" }} />
            <Box component="img" sx={{ width: "100%" }} src={landingTwo} />
          </Box>
        </Box>
      </Box>
      <Box
        width={screen.width}
        display="flex"
        justifyContent="center"
        sx={{ backgroundColor: "#e9f7f0" }}
      >
        <Box
          width={1200}
          display="flex"
          justifyContent="center"
          sx={{ backgroundColor: "#fafffd" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e9f7f0",
            }}
          >
            <Box component="img" sx={{ width: "100%" }} src={landingThree} />
            <Box component="img" sx={{ width: "100%" }} src={landingFour} />
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Landing
