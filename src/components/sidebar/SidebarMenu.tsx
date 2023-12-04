import React from "react"
import { useParams } from "react-router-dom"
import { Box, TextField, InputAdornment } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import SearchIcon from "@mui/icons-material/Search"
import { getProjectsStore } from "store/userStore"
import Menu from "components/common/Menu"
import CreateBtn from "components/common/CreateBtn"
import { useTitleDialog } from "components/common/TitleDialog"
import SubIconBtn from "components/sidebar/SubIconBtn"
import MenuItems from "components/sidebar/MenuItems"
import CreateProject from "components/project/CreateProject"
import ProjectSettingsModal from "components/project/modal/ProjectSettingsModal"

const SidebarMenu: React.FC = () => {
  const { workspaceId } = useParams()
  const { projects } = getProjectsStore()
  const [projectManageModalOpenMap, setProjectManageModalOpenMap] =
    React.useState<Record<number, boolean>>({})
  const [projectFilterKeyword, setProjectFilterKeyword] = React.useState("")
  const {
    TitleDialog,
    open: openCreateProjectDialog,
    close: closeCreateProjectDialog,
  } = useTitleDialog()

  const openProjectManageModal = (projectId: number, e: React.MouseEvent) => {
    e.preventDefault()
    setProjectManageModalOpenMap(prev => ({
      ...prev,
      [projectId]: true,
    }))
  }

  const myProjects = projects.map(project => ({
    link: `/workspace/${workspaceId}/project/${project.projectId}`,
    listValue: project.title,
    projectId: project.projectId,
  }))

  return (
    <Box>
      <Menu
        title="참여 중인 프로젝트"
        btn={<CreateBtn handleClick={openCreateProjectDialog} />}
      >
        <Box width="88%" mb={1}>
          <TextField
            fullWidth
            autoComplete="off"
            size="small"
            sx={{
              mx: 2,
              fontSize: 14,
              height: 40,
            }}
            placeholder="프로젝트 검색"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProjectFilterKeyword(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              style: { fontSize: 15 },
            }}
          />
        </Box>
        {myProjects
          .filter(project => project.listValue.includes(projectFilterKeyword))
          .map(list => (
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
      <TitleDialog title="프로젝트 생성" maxWidth="sm">
        <CreateProject onCancelButtonClick={closeCreateProjectDialog} />
      </TitleDialog>
    </Box>
  )
}

export default SidebarMenu
