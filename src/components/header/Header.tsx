import React from "react"
import { AppBar, Box, Toolbar } from "@mui/material"
import Logo from "components/header/Logo"
import User from "components/header/UserInfo"
import SearchInput from "components/header/SearchInput"
import WorkspaceSelectButton from "components/workspace/WorkspaceSelectButton"
import NotificationButton from "components/header/notification/NotificationButton"

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "5px 5px 10px 3px rgba(0, 0, 0, 0.1)",
        bgcolor: "#ffffff",
        color: "#818181",
        height: 70,
        mb: "10px",
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
          <NotificationButton />
          {/* 아바타 */}
          <User />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
