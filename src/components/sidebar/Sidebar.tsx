import React from "react"
import { Box } from "@mui/material"
import SidebarMenu from "./SidebarMenu"
import WorkSpaceProfile from "./WorkspaceProfile"
import IconBtnWrapper from "./IconBtnWrapper"

const Sidebar: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        component="div"
        sx={{
          height: "195px",
          width: "100%",
          top: 0,
          zIndex: 100,
          bgcolor: "white",
        }}
      >
        <WorkSpaceProfile />
        <IconBtnWrapper />
      </Box>
      <Box
        component="div"
        sx={{
          boxSizing: "border-box",
          height: "calc(100vh - 288px)",
        }}
      >
        <SidebarMenu />
      </Box>
    </Box>
  )
}

export default Sidebar
