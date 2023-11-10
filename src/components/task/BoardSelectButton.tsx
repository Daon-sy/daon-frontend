import React from "react"
import { Menu, Button, Fade, MenuItem, MenuProps, Box } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { styled } from "@mui/material/styles"
import FolderIcon from "@mui/icons-material/Folder"

const StyledMenu = styled((props: MenuProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}))

interface Props {
  current: string
}

const BoardSelectButton: React.FC<Props> = ({ current }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          px: 1,
        }}
      >
        <FolderIcon />
        <Box pl={1}>{current}</Box>
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Board1</MenuItem>
        <MenuItem onClick={handleClose}>Board2</MenuItem>
      </StyledMenu>
    </div>
  )
}

export default BoardSelectButton
