import * as React from "react"
import styled from "styled-components"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import ShowMember from "components/modal/participant/ShowParticipantsModal"

const WorkspaceProfileWrapper = styled.button`
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid black;
  padding: 16px 0;
  position: relative;
  cursor: pointer;
`

const WorkSpaceProfile: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const [openShowModal, setOpenShowModal] = React.useState<boolean>(false)

  const handleOpenShowModal = () => {
    setOpenShowModal(true)
  }

  const handleCloseShowModal = () => {
    setOpenShowModal(false)
  }

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
      <WorkspaceProfileWrapper onClick={handleOpenUserMenu}>
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
      </WorkspaceProfileWrapper>
      <ShowMember open={openShowModal} handleClose={handleCloseShowModal} />
    </>
  )
}

export default WorkSpaceProfile
