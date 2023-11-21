import React from "react"
import StarIcon from "@mui/icons-material/Star"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { Divider, Box } from "@mui/material"
import Menu from "components/common/Menu"
import CreateProjectModal from "components/project/modal/CreateProjectModal"
import CreateBtn from "components/common/CreateBtn"
import { getProjectsStore } from "store/userStore"
import { projectListApi } from "api/project"
import { useParams } from "react-router-dom"
import MenuItems from "./MenuItems"

const SidebarMenu: React.FC = () => {
  const { workspaceId } = useParams()
  const { projects, setProjects } = getProjectsStore()
  const [openCreateProjectModal, setCreateProjectModal] =
    React.useState<boolean>(false)

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }
  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }

  const fetchProjectList = async () => {
    if (workspaceId) {
      const { data } = await projectListApi(+workspaceId)
      setProjects(data.projects)
    }
  }

  React.useEffect(() => {
    fetchProjectList()
  }, [workspaceId])

  const myTasks = [
    {
      link: `/workspace/${workspaceId}/task/bookmark`,
      listValue: "즐겨찾기",
      icon: StarIcon,
    },
    {
      link: `/workspace/${workspaceId}/task/my`,
      listValue: "내 할일",
      icon: AssignmentIcon,
    },
  ]

  const myProjects = projects.map(project => ({
    link: `/workspace/${workspaceId}/project/${project.projectId}`,
    listValue: project.title,
  }))

  return (
    <Box>
      <Menu title="나의 할일 모음">
        {myTasks.map(list => (
          <MenuItems
            to={list.link}
            listValue={list.listValue}
            icon={list.icon}
            key={list.link}
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
        {myProjects.map(list => (
          <MenuItems
            to={list.link}
            listValue={list.listValue}
            key={list.link}
          />
        ))}
      </Menu>
      <CreateProjectModal
        open={openCreateProjectModal}
        handleClose={handleCloseCreateProjectModal}
      />
    </Box>
  )
}

export default SidebarMenu
