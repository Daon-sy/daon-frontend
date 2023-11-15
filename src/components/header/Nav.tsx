import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { Link } from "react-router-dom"
import CreateWorkspaceModal from "components/workspace/modal/CreateWorkspaceModal"

const myWorkspaces = ["워크스페이스1", "워크스페이스2"]

const Nav: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] =
    React.useState<boolean>(false)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const openCreateWorkspaceModal = () => {
    handleCloseNavMenu()
    setCreateWorkspaceModalOpen(true)
  }

  const closeCreateWorkspaceModal = () => setCreateWorkspaceModalOpen(false)

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          LOGO
        </Link>
      </Typography>

      {/* 워크스페이스 */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="워크스페이스 메뉴">
          <Button
            onClick={handleOpenNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            워크스페이스
          </Button>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {myWorkspaces.map(menus => (
            <MenuItem key={menus} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{menus}</Typography>
            </MenuItem>
          ))}
          <hr />
          <MenuItem onClick={openCreateWorkspaceModal}>
            <Typography textAlign="center">워크스페이스 생성</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <CreateWorkspaceModal
        open={createWorkspaceModalOpen}
        handleClose={closeCreateWorkspaceModal}
      />
    </>
  )
}

export default Nav
