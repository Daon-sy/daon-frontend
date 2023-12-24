import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { getProjectStore, getWorkspaceStore } from "store/userStore"
import { projectDetailApi } from "api/project"
import ProjectTaskView from "pages/workspace/project/ProjectTaskView"
import NotFound from "components/common/NotFound"
import { Box } from "@mui/material"

const ProjectDetailRoutes = () => {
  const { workspace } = getWorkspaceStore()
  const { setProject, clear: clearProjectStore } = getProjectStore()
  const { projectId } = useParams()
  const [isProjectNotFound, setIsProjectNotFound] = React.useState(false)

  const fetchProjectDetail = async () => {
    if (workspace && projectId) {
      try {
        const { data } = await projectDetailApi(
          workspace.workspaceId,
          Number(projectId),
        )
        setProject(data)
      } catch (e) {
        setIsProjectNotFound(true)
      }
    }
  }

  React.useEffect(() => {
    setIsProjectNotFound(false)
    fetchProjectDetail()
  }, [projectId])

  React.useEffect(() => {
    return () => clearProjectStore()
  }, [])

  if (isProjectNotFound)
    return (
      <Box height="100%">
        <NotFound content="존재하지 않는 프로젝트입니다" />
      </Box>
    )

  return (
    <Routes>
      <Route index element={<ProjectTaskView />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/:projectId/*" element={<ProjectDetailRoutes />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default ProjectRoutes
