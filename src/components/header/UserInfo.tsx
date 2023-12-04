import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { getTokenStore } from "store/tokenStore"
import { useAlert } from "hooks/useAlert"
import MyPageModal from "components/member/modal/MyPageModal"

const UserInfo: React.FC = () => {
  const tokenState = getTokenStore()
  const { addInfo } = useAlert()
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

  const onLogoutButtonClick = () => {
    tokenState.clear()
    addInfo("로그아웃 완료")
    // menu 닫기
    handleCloseUserMenu()
  }

  // 각 메뉴 클릭에 해당하는 callback 함수 지정
  const settings = [
    { name: "MyPage", onClick: onMyPageButtonClick },
    { name: "Logout", onClick: onLogoutButtonClick },
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
