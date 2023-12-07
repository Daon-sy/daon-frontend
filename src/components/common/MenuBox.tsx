import React from "react"
import { Box, MenuItem, Theme } from "@mui/material"
import Menu from "@mui/material/Menu"
import { SxProps } from "@mui/system"

interface MenuProps {
  onClick?: () => void
  sx?: SxProps<Theme>
  children?: React.ReactNode
  disabled?: boolean
}

interface Props {
  menus?: Array<MenuProps>
  children?: React.ReactNode
}

const MenuBox: React.FC<Props> = ({ menus, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => setAnchorEl(null)

  return (
    <>
      <Box
        onClick={openMenu}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {children}
      </Box>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={closeMenu}
        slotProps={{
          root: { sx: { ".MuiList-padding": { padding: 0 } } },
        }}
      >
        {menus?.map(menu => (
          <MenuItem
            disabled={menu.disabled}
            onClick={() => {
              if (menu.onClick) menu.onClick()
              closeMenu()
            }}
            sx={{
              fontSize: 14,
              ...menu.sx,
            }}
          >
            {menu.children}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MenuBox
