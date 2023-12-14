import React from "react"
import { Box } from "@mui/material"
import landingOne from "assets/img/landing1.webp"
import landingTwo from "assets/img/landing2.webp"
import landingThree from "assets/img/landing3.webp"
import landingFour from "assets/img/landing4.webp"

function Landing() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        scrollbarWidth: "0.5em",
      }}
    >
      <Box component="img" sx={{ width: "100%" }} src={landingOne} />
      <Box component="img" sx={{ width: "100%" }} src={landingTwo} />
      <Box component="img" sx={{ width: "100%" }} src={landingThree} />
      <Box component="img" sx={{ width: "100%" }} src={landingFour} />
    </Box>
  )
}
export default Landing
