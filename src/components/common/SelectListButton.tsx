import React from "react"
import {
  Menu,
  Button,
  Fade,
  MenuItem,
  MenuProps,
  Box,
  Chip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

const StyledMenu = styled((props: MenuProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
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

export interface ItemType {
  id: number
  text: string
  color?: "info" | "primary" | "success" | "warning"
}

interface Props<T extends ItemType> {
  unsetButtonText?: string
  valueList?: Array<T> | undefined
  defaultValueId?: number | undefined
  showClearListItem?: true | false
  leftMuiIcon?: React.ReactNode | undefined
  endMuiIcon?: React.ReactNode | undefined
  onValueChange?: (
    selectedValue: T | undefined,
  ) => Promise<void> | void | undefined
  itemToChip?: true | false
  changeButtonColor?: true | false
  disableChangeButtonText?: true | false
  variant?: "outlined" | "contained"
  color?: "primary" | "secondary" | "green"
  clearOnListUpdated?: true | false
  fontSize?: number
  fontWeight?: number | string
  buttonSize?: "small" | "large" | "medium"
  readonly?: boolean
}

const SelectListButton = <T extends ItemType>({
  unsetButtonText = "",
  valueList,
  defaultValueId = undefined,
  showClearListItem = false,
  leftMuiIcon,
  endMuiIcon,
  onValueChange,
  itemToChip = false,
  changeButtonColor = false,
  disableChangeButtonText = false,
  variant = "outlined",
  color = "primary",
  clearOnListUpdated = false,
  fontSize = 14,
  fontWeight = 500,
  buttonSize = "medium",
  readonly = false,
}: Props<T>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const findValueById = (valueId: number) =>
    valueList?.find(item => item.id === valueId)

  const [selectedValue, setSelectedValue] = React.useState<T | undefined>()

  React.useEffect(() => {
    if (defaultValueId) setSelectedValue(findValueById(defaultValueId))
  }, [])

  React.useEffect(() => {
    if (defaultValueId) setSelectedValue(findValueById(defaultValueId))
  }, [valueList])

  React.useEffect(() => {
    if (!defaultValueId && clearOnListUpdated) setSelectedValue(undefined)
  }, [defaultValueId])

  const close = () => setAnchorEl(null)
  const handleClickedItem = (event: React.MouseEvent<HTMLElement>) => {
    const id = Number(event.currentTarget.getAttribute("value"))
    const value = findValueById(id)
    if (!disableChangeButtonText) setSelectedValue(value)
    if (onValueChange) {
      if (value) onValueChange(value)
      else onValueChange(undefined)
    }
    close()
  }

  return (
    <Box component="span">
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={e => !readonly && openList(e)}
        variant={variant}
        disableElevation
        color={
          changeButtonColor && selectedValue && selectedValue.color
            ? (selectedValue.color as
                | "info"
                | "primary"
                | "success"
                | "warning")
            : color || "info"
        }
        endIcon={endMuiIcon}
        sx={{
          px: 1,
        }}
        size={buttonSize}
      >
        {leftMuiIcon}
        <Typography pl={leftMuiIcon ? 1 : 0} sx={{ fontSize, fontWeight }}>
          {selectedValue ? selectedValue.text : unsetButtonText}
        </Typography>
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        open={open}
        onClose={close}
        TransitionComponent={Fade}
      >
        {selectedValue && showClearListItem ? (
          <MenuItem onClick={handleClickedItem} sx={{ fontSize }}>
            {unsetButtonText}
          </MenuItem>
        ) : null}
        {valueList
          ?.filter(item => item.id !== selectedValue?.id)
          .map(item => (
            <MenuItem
              onClick={handleClickedItem}
              value={item.id}
              sx={{ fontSize }}
            >
              {itemToChip && item.color ? (
                <Chip
                  label={item.text}
                  size="small"
                  color={
                    item.color
                      ? (item.color as
                          | "info"
                          | "primary"
                          | "success"
                          | "warning")
                      : "info"
                  }
                  sx={{
                    fontSize: 12,
                  }}
                />
              ) : (
                item.text
              )}
            </MenuItem>
          ))}
      </StyledMenu>
    </Box>
  )
}

export default SelectListButton
