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
import SettingsIcon from "@mui/icons-material/Settings"
import ProjectSettingsModal from "components/project/modal/ProjectSettingsModal"
import SubIconBtn from "./SubIconBtn"
import MenuItems from "./MenuItems"

const SidebarMenu: React.FC = () => {
  const { workspaceId } = useParams()
  const { projects, setProjects } = getProjectsStore()
  const [projectCreateModalOpen, setProjectCreateModalOpen] =
    React.useState<boolean>(false)
  const [projectManageModalOpenMap, setProjectManageModalOpenMap] =
    React.useState<Record<number, boolean>>({})
  const openProjectCreateModal = () => {
    setProjectCreateModalOpen(true)
  }
  const openProjectManageModal = (projectId: number, e: React.MouseEvent) => {
    e.preventDefault()
    setProjectManageModalOpenMap(prev => ({
      ...prev,
      [projectId]: true,
    }))
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
      listValue: "북마크",
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
    projectId: project.projectId,
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
        btn={<CreateBtn handleClick={openProjectCreateModal} />}
      >
        {myProjects.map(list => (
          <Box key={list.projectId}>
            <MenuItems to={list.link} listValue={list.listValue}>
              <SubIconBtn
                color="darkgreen"
                onClick={e => openProjectManageModal(list.projectId, e)}
                icon={<SettingsIcon />}
              />
            </MenuItems>
            <ProjectSettingsModal
              projectId={list.projectId}
              open={projectManageModalOpenMap[list.projectId] || false}
              handleClose={() =>
                setProjectManageModalOpenMap(prev => ({
                  ...prev,
                  [list.projectId]: false,
                }))
              }
            />
          </Box>
        ))}
      </Menu>
      {projectCreateModalOpen ? (
        <CreateProjectModal
          open={projectCreateModalOpen}
          handleClose={() => setProjectCreateModalOpen(false)}
        />
      ) : null}
    </Box>
  )
}

export default SidebarMenu
