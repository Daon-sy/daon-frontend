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
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        WebkitScrollSnapType: "none",
        overflowY: "scroll",
        height: "92%",
        "&::-webkit-scrollbar": {
          width: "0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        component="div"
        sx={{
          height: "30%",
          minHeight: "235px",
          maxHeight: "360px",
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "white",
        }}
      >
        <WorkSpaceProfile />
        <IconBtnWrapper />
      </Box>
      <Box component="section" sx={{ height: "63%", minHeight: "400px" }}>
        <SidebarMenu />
      </Box>
    </Box>
  )
}

export default Sidebar
