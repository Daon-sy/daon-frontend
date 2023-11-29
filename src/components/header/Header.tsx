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
        height: "10%",
        maxHeight: "70px",
      }}
    >
      <Toolbar>
        <Logo />
        <WorkspaceSelectButton />
        {/* 검색창 */}
        <SearchInput />

        {/* 알림 */}
        <Box sx={{ flexGrow: 0, mx: 2, color: yellow[600] }}>
          <NotificationsIcon fontSize="large" />
        </Box>

        {/* 아바타 */}
        <User />
      </Toolbar>
    </AppBar>
  )
}

export default Header
