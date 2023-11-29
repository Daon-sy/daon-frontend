import React from "react"
import { AppBar, Box, Toolbar } from "@mui/material"
import { yellow } from "@mui/material/colors"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Logo from "components/header/Logo"
import User from "components/header/UserInfo"
import SearchInput from "components/header/SearchInput"
import WorkspaceSelectButton from "components/workspace/WorkspaceSelectButton"

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#ffffff",
        color: "#818181",
        height: 70,
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo />
          <WorkspaceSelectButton />
        </Box>
        {/* 검색창 */}
        <Box sx={{ width: "50%", height: "100%", minWidth: 400 }}>
          <SearchInput />
        </Box>
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          {/* 알림 */}
          <Box sx={{ mx: 2, color: yellow[600] }}>
            <NotificationsIcon fontSize="large" />
          </Box>
          {/* 아바타 */}
          <User />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
