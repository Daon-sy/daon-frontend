import React from "react"
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material"
import MyPageModal from "components/member/modal/MyPageModal"
import useLogout from "hooks/auth/useLogout"

const UserInfo: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const [myPageModalOpen, setMyPageModalOpen] = React.useState<boolean>(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onMyPageButtonClick = () => {
    setMyPageModalOpen(true)
    handleCloseUserMenu()
  }

  const { fetch: logout } = useLogout()

  // 각 메뉴 클릭에 해당하는 callback 함수 지정
  const settings = [
    { name: "마이페이지", onClick: onMyPageButtonClick },
    { name: "로그아웃", onClick: () => logout(handleCloseUserMenu) },
  ]

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src="/broken-image.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(setting => (
          <MenuItem key={setting.name} onClick={setting.onClick}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <MyPageModal
        open={myPageModalOpen}
        handleClose={() => setMyPageModalOpen(false)}
      />
    </Box>
  )
}

export default UserInfo
