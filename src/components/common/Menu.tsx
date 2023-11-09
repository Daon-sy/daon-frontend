import React from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import CircleIcon from "@mui/icons-material/Circle"
import { Box } from "@mui/material"
import CreateProjectModal from "components/modal/project/CreateProjectModal"
import CreateBtn from "./CreateBtn"

interface CommonListItemProps {
  to: string
  selected: boolean
  children: React.ReactNode
}

const CommonListItem: React.FC<CommonListItemProps> = ({
  to,
  selected,
  children,
}) => {
  return (
    <ListItemButton
      component={RouterLink}
      to={to}
      sx={{
        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
          backgroundColor: "#1976d2",
          color: "white",
        },
      }}
      selected={selected}
    >
      {children}
    </ListItemButton>
  )
}

interface MenuListProps {
  link: string
  listValue: string
  icon?: React.ComponentType
  isTaskCreated?: boolean | undefined
}

interface MenuProps {
  title: string
  isProjectCreated?: boolean | undefined
  list: MenuListProps[]
}

const Menu: React.FC<MenuProps> = ({ title, isProjectCreated, list }) => {
  const location = useLocation()
  const [openCreateProjectModal, setCreateProjectModal] =
    React.useState<boolean>(false)

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }
  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }

  const cleanUp = () => {
    return null
  }

  return (
    <>
      <Box sx={{ bgcolor: "white", border: "1px solid black", mt: "4px" }}>
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          {title}
          {isProjectCreated ? (
            <CreateBtn handleClick={handleOpenCreateProjectModal} />
          ) : null}
        </ListSubheader>
        {list.map(menuItem => (
          <Box sx={{ position: "relative" }}>
            <CommonListItem
              key={menuItem.listValue}
              to={menuItem.link}
              selected={location.pathname === menuItem.link}
            >
              <ListItemIcon>
                {menuItem.icon ? <menuItem.icon /> : <CircleIcon />}
              </ListItemIcon>
              <ListItemText primary={menuItem.listValue} />
            </CommonListItem>
            {menuItem.isTaskCreated ? (
              <CreateBtn handleClick={handleOpenCreateProjectModal} />
            ) : null}
          </Box>
        ))}
      </Box>
      <CreateProjectModal
        cleanUp={cleanUp}
        open={openCreateProjectModal}
        handleClose={handleCloseCreateProjectModal}
      />
    </>
  )
}

export default Menu
