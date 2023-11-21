import React from "react"
import StarIcon from "@mui/icons-material/Star"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { Divider, Box } from "@mui/material"
import Menu from "components/common/Menu"
import CreateProjectModal from "components/project/modal/CreateProjectModal"
import CreateBtn from "components/common/CreateBtn"
import MenuItems from "./MenuItems"

const SidebarMenu: React.FC = () => {
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
  const myTasks = [
    {
      link: "/workspace/1/task/bookmark",
      listValue: "즐겨찾기",
      icon: StarIcon,
    },
    {
      link: "/workspace/1/task/my",
      listValue: "내 할일",
      icon: AssignmentIcon,
    },
  ]

  const myProjects = [
    {
      link: "/workspace/1/project/1",
      listValue: "프로젝트1",
    },
    {
      link: "/workspace/1/project/2",
      listValue: "프로젝트2",
    },
  ]

  return (
    <Box>
      <Menu title="나의 할일 모음">
        {myTasks.map(list => (
          <MenuItems
            to={list.link}
            listValue={list.listValue}
            icon={list.icon}
          />
        ))}
      </Menu>
      <Divider
        sx={{
          border: 1,
          width: "80%",
          marginX: "auto",
          color: "#eeeeef",
        }}
      />
      <Menu
        title="참여 중인 프로젝트"
        btn={<CreateBtn handleClick={handleOpenCreateProjectModal} />}
      >
        {/* <CreateBtn handleClick={handleOpenCreateProjectModal} /> */}
        {myProjects.map(list => (
          <MenuItems to={list.link} listValue={list.listValue} />
        ))}
      </Menu>
      <CreateProjectModal
        cleanUp={cleanUp}
        open={openCreateProjectModal}
        handleClose={handleCloseCreateProjectModal}
      />
    </Box>
  )
}

export default SidebarMenu
