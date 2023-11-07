import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SearchInput from "./SearchInput"
import User from "./UserInfo"
import Nav from "./Nav"

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Nav */}
        <Nav />
        {/* 검색창 */}
        <SearchInput />

        {/* 알림 */}
        <Box sx={{ flexGrow: 0, mx: 2 }}>
          <NotificationsIcon />
        </Box>

        {/* 아바타 */}
        <User />
      </Toolbar>
    </AppBar>
  )
}

export default Header
