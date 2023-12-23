import React from "react"
import { Box, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getTokenStore } from "store/tokenStore"

import landingOne from "assets/img/landing1.webp"
import landingThree from "assets/img/landing3.webp"
import landingFour from "assets/img/landing4.webp"
import arrow from "assets/img/arrow.webp"

import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

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

      <Box
        sx={{
          backgroundColor: "#fff",
          color: "#333",
          padding: "40px 20px",
          textAlign: "center",
          /* borderTop: "1px solid #ddd", */
          marginTop: "30px",
        }}
      >
        <Box sx={{ margin: 0, marginBottom: "20px", fontWeight: "500" }}>
          DAON, TODO MANAGEMENT SERVICE
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <IconButton color="primary" aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary" aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            lineHeight: "30px",
          }}
        >
          더존비즈온 채용확정형 4기
          <br />
          6조 : 유하영 김성은 김재윤 조수연
          <br />
          &copy; 2023 12 28 DAON (3M)
        </Box>
      </Box>
    </>
  )
}
export default Landing
