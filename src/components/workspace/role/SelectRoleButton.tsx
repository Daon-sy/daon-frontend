import React from "react"
import { Box, Button, Fade, Menu, MenuItem, Typography } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  roleColors as roles,
  WorkspaceParticipantRoleDetail,
} from "_types/workspace"

interface Props {
  initValue?: number
  onChange: (item: WorkspaceParticipantRoleDetail) => void
}

const SelectRoleButton: React.FC<Props> = ({ initValue = 2, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openList = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const closeList = () => setAnchorEl(null)

  const [selectedIndex, setSelectedIndex] = React.useState(initValue)
  const handleItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index)
    onChange(roles[index])
    closeList()
  }

  return (
    <Box component="span">
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openList}
        variant="outlined"
        disableElevation
        // color={roles[selectedIndex].color}
        color="primary"
        sx={{
          px: 1,
          width: 160,
          display: "flex",
          alignItems: "center",
          borderRadius: 1,
          borderWidth: 1,
        }}
        size="small"
      >
        <Typography pl={0} sx={{ fontSize: 14, fontWeight: 500 }} flexGrow={1}>
          {roles[selectedIndex].description}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        open={open}
        onClose={closeList}
        TransitionComponent={Fade}
      >
        {roles.map((item, index) => (
          <MenuItem
            key={item.role}
            selected={item.role === roles[selectedIndex].role}
            onClick={event => handleItemClick(event, index)}
            sx={{ fontSize: 14 }}
          >
            {item.description}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default SelectRoleButton
