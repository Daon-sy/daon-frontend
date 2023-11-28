import * as React from "react"
import { AppBar, Box, Toolbar } from "@mui/material"
import { yellow } from "@mui/material/colors"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SearchInput from "./SearchInput"
import User from "./UserInfo"
import Nav from "./Nav"

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
        {/* Nav */}
        <Nav />
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
