import React from "react"
import { Menu, Button, Fade, MenuItem, MenuProps, Chip } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { styled } from "@mui/material/styles"

const StyledMenu = styled((props: MenuProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 80,
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

interface Status {
  value: string
  description: string
  color: "info" | "primary" | "success" | "warning"
}

const status: Array<Status> = [
  {
    value: "TODO",
    description: "할 일",
    color: "info",
  },
  {
    value: "PROCEEDING",
    description: "진행중",
    color: "primary",
  },
  {
    value: "COMPLETED",
    description: "완료됨",
    color: "success",
  },
  {
    value: "PENDING",
    description: "보류중",
    color: "warning",
  },
]

interface Props {
  current: string
}

const ProgressSelectButton: React.FC<Props> = ({ current }: Props) => {
  const getStatusItem = (value: string) =>
    status.find(item => item.value === value)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selected, setSelected] = React.useState<Status>(
    getStatusItem(current)!,
  )
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // TODO 메뉴 열고 선택 안하면 오류 발생
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
    const value = e.currentTarget.getAttribute("value")
    setSelected(getStatusItem(value!)!)
  }

  return (
    <div>
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color={selected.color}
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selected.description}
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
        {status
          .filter(item => item.value !== selected.value)
          .map(item => (
            <MenuItem onClick={handleClose} value={item.value}>
              <Chip
                label={item.description}
                size="small"
                color={item.color}
                sx={{
                  fontSize: 12,
                }}
              />
            </MenuItem>
          ))}
      </StyledMenu>
    </div>
  )
}

export default ProgressSelectButton
