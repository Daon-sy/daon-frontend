import * as React from "react"
import "./Sidebar.css"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"

const Sidebar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorElUser) {
      setAnchorElUser(event.currentTarget)
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <button
        type="button"
        className="sidebar_sc ws_sc"
        onClick={handleOpenUserMenu}
      >
        <div className="sidebar_title">워크스페이스 프로필</div>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElUser)}
          onClick={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">구성원보기</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">프로필 변경</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">워크스페이스 생성</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">워크스페이스 변경</Typography>
          </MenuItem>
        </Menu>
      </button>
      <section className="sidebar_sc">
        <div className="sidebar_title">나의 할 일 모음</div>
        <ul className="mytask_list_box">
          <li>
            <div className="mytask_list">
              <div className="mytask_icon" />
              <p className="mytask_title">즐겨찾기</p>
            </div>
          </li>
          <li>
            <div className="mytask_list">
              <div className="mytask_icon" />
              <p className="mytask_title">진행상태</p>
            </div>
          </li>
          <li>
            <div className="mytask_list">
              <div className="mytask_icon" />
              <p className="mytask_title">보드별</p>
            </div>
          </li>
        </ul>
      </section>
      <section className="sidebar_sc">
        <div className="sidebar_title">참여 프로젝트</div>
        <ul>
          <li>
            <div className="myproject_list">프로젝트1</div>
          </li>
          <li>
            <div className="myproject_list">프로젝트2</div>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Sidebar
