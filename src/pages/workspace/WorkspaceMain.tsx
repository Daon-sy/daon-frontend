import React from "react"
import ProjectCard from "components/project/ProjectCard"
import TitleWrapper from "components/common/TitleWrapper"
import { Box } from "@mui/material"
import { getProjectsStore } from "store/userStore"
import { useParams } from "react-router-dom"

const WorkspaceMain: React.FC = () => {
  const { workspaceId } = useParams()
  const { projects } = getProjectsStore()

  return (
    <>
      <h1>워크스페이스 메인 페이지</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "30%",
        }}
      >
        <TitleWrapper title="게시판">게시판내용</TitleWrapper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "30%",
        }}
      >
        <TitleWrapper title="프로젝트 목록">
          {projects.map(project => (
            <ProjectCard
              key={project.projectId}
              project={project}
              to={`/workspace/${String(workspaceId)}/project/${
                project.projectId
              }`}
            />
          ))}
        </TitleWrapper>
      </Box>
    </>
  )
}

export default WorkspaceMain
