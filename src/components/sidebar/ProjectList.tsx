import * as React from "react"
import styled from "styled-components"
import CreateProjectModal from "components/modal/project/CreateProjectModal"
import CreateBtn from "components/common/CreateBtn"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

const ProjectWrapper = styled.section`
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid black;
  padding: 16px 0;
  position: relative;
`

const ProjectTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`

interface ProjectListData {
  projectId: number
  title: string
}

const dummyData: ProjectListData[] = [
  {
    projectId: 1,
    title: "프로젝트1",
  },
  {
    projectId: 2,
    title: "프로젝트2",
  },
]

const ProjectList: React.FC = () => {
  const [openCreateProjectModal, setCreateProjectModal] =
    React.useState<boolean>(false)

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }
  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }

  return (
    <>
      <ProjectWrapper>
        <ProjectTitle>참여 프로젝트</ProjectTitle>
        <CreateBtn
          handleClick={handleOpenCreateProjectModal}
          title="프로젝트 추가"
        />
        <div>
          {dummyData.map(project => (
            <Accordion key={project.projectId}>
              <AccordionSummary>
                <Typography>{project.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="상태별보기" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="보드별보기" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="구성원보기" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </ProjectWrapper>

      <CreateProjectModal
        open={openCreateProjectModal}
        handleClose={handleCloseCreateProjectModal}
      />
    </>
  )
}

export default ProjectList
