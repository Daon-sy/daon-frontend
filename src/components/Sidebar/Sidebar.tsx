import * as React from "react"
import "./Sidebar.css"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import AddBoxIcon from "@mui/icons-material/AddBox"
import ShowMember from "components/modal/showModal/ShowMemberModal"
import CreateProjectModal from "components/modal/createProject/CreateProjectModal"

const Sidebar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const [openShowModal, setOpenShowModal] = React.useState<boolean>(false)
  const [openCreateProjectModal, setCreateProjectModal] =
    React.useState<boolean>(false)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorElUser) {
      setAnchorElUser(event.currentTarget)
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenShowModal = () => {
    handleCloseUserMenu()
    setOpenShowModal(true)
  }
  const handleCloseShowModal = () => {
    setOpenShowModal(false)
  }

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }
  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
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
          <MenuItem onClick={handleOpenShowModal}>
            <Typography textAlign="center" id="showMember">
              구성원보기
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">프로필 변경</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">워크스페이스 생성</Typography>
          </MenuItem>
          <MenuItem>
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
        <button
          type="button"
          className="pj_add_btn"
          onClick={handleOpenCreateProjectModal}
        >
          <AddBoxIcon />
        </button>
        <ul>
          <li>
            <div className="myproject_list">프로젝트1</div>
          </li>
          <li>
            <div className="myproject_list">프로젝트2</div>
          </li>
        </ul>
      </section>

      <ShowMember open={openShowModal} handleClose={handleCloseShowModal} />
      <CreateProjectModal
        open={openCreateProjectModal}
        handleClose={handleCloseCreateProjectModal}
      />
    </>
  )
}

export default Sidebar
