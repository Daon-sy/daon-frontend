import React, { useEffect, useState } from "react"
import ProjectCard from "components/project/ProjectCard"
import { Project } from "_types/project"
import { projectListApi } from "api/project"
import TitleWrapper from "components/common/TitleWrapper"
import { Box } from "@mui/material"

const Workspace: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])

  const workspaceId = location.pathname.split("/")[2]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectListApi(+workspaceId)
        setProjects(response.data.projects)
      } catch (error) {
        console.error("Error fetching boards:", error)
      }
    }
    fetchData()
  }, [])

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
        <TitleWrapper title="보드 목록">
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

export default Workspace
