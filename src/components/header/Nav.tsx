import * as React from "react"
import { Link } from "react-router-dom"
import { Box, Typography, Menu, Button, Tooltip, MenuItem } from "@mui/material"
import { useTitleDialog } from "components/common/TitleDialog"
import CreateWorkspace from "components/workspace/CreateWorkspace"

const myWorkspaces = ["워크스페이스1", "워크스페이스2"]

const Nav: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const {
    TitleDialog,
    open: openCreateWorkspaceDialog,
    close: closeCreateWorkspaceDialog,
  } = useTitleDialog()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

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
          color: "#495e57",
          textDecoration: "none",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          DAON
        </Link>
      </Typography>

      {/* 워크스페이스 */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="워크스페이스 메뉴">
          <Button
            onClick={handleOpenNavMenu}
            sx={{ my: 2, color: "#495e57", display: "block" }}
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
          <MenuItem onClick={openCreateWorkspaceDialog}>
            <Typography textAlign="center">워크스페이스 생성</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <TitleDialog title="워크스페이스 생성" maxWidth="sm">
        <CreateWorkspace handleCancel={closeCreateWorkspaceDialog} />
      </TitleDialog>
    </>
  )
}

export default Nav
