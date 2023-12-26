import React from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
} from "@mui/material"
import { SvgIconProps } from "@mui/material/SvgIcon"

interface MenuItemsProps {
  to: string
  children?: React.ReactNode
  listValue: string
  icon?: React.ComponentType<SvgIconProps>
}

const MenuItems: React.FC<MenuItemsProps> = ({
  to,
  listValue,
  icon,
  children,
}) => {
  const location = useLocation()

  return (
    <Box>
      <ListItemButton
        component={RouterLink}
        to={to}
        sx={{
          boxSizing: "border-box",
          borderRadius: 4,
          mx: 2,
          mb: 1,
          width: "88%",
          height: "48px",
          border: "1px solid #f6f7f9",
          bgcolor: "#f6f7f9",
          color: "#435951",
          "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
            backgroundColor: "#ffbe00",
            color: "#ffffff",
          },
        }}
        selected={to === location.pathname}
      >
        {icon ? (
          <ListItemIcon sx={{ color: "inherit" }}>
            {React.createElement(icon)}
          </ListItemIcon>
        ) : null}
        <Tooltip title={listValue} arrow>
          <ListItemText
            primary={listValue}
            sx={{
              display: "block",
              color: "inherit",
              maxWidth: "80%",
              ".MuiListItemText-primary": {
                fontWeight: 500,
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          />
        </Tooltip>
        {children}
      </ListItemButton>
    </Box>
  )
}

export default MenuItems
