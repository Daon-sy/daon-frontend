import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"

const myWorkspaces = ["워크스페이스1", "워크스페이스2"]
const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

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
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
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
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center">워크스페이스 생성</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default Nav
