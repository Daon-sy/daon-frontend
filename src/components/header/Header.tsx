import React from "react"
import { AppBar, Box, Toolbar } from "@mui/material"
import Logo from "components/header/Logo"
import User from "components/header/UserInfo"
import SearchInput from "components/search/SearchInput"
import WorkspaceSelectButton from "components/workspace/WorkspaceSelectButton"
import NotificationButton from "components/notification/NotificationButton"

const Header: React.FC = () => {
  const logoNWsButtonRef = React.useRef<HTMLDivElement | null>(null)
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
        disableGutters
        sx={{
          px: 3,
          height: "100%",
          display: "flex",
          alignItems: "start",
        }}
      >
        <Box
          ref={logoNWsButtonRef}
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 1,
          }}
        >
          <Logo />
          <Box id="wsb">
            <WorkspaceSelectButton />
          </Box>
        </Box>
        {/* 검색창 */}
        <Box
          position="sticky"
          left="36%"
          height="100%"
          display="flex"
          justifyContent="left"
          sx={theme => ({
            // [theme.breakpoints.down(990)]: {
            [theme.breakpoints.down(
              670 + (logoNWsButtonRef.current?.offsetWidth || 0),
            )]: {
              display: "none",
            },
          })}
        >
          <SearchInput />
        </Box>
        <Box
          flexGrow={1}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
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
