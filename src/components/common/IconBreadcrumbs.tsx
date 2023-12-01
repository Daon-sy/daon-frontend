import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Box, Typography, Breadcrumbs } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import DvrIcon from "@mui/icons-material/Dvr"
import { getProjectStore, getWorkspaceStore } from "store/userStore"

const BreadcrumbLink = styled(Link)`
  color: gray;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const IconBreadcrumbs = () => {
  const { workspace } = getWorkspaceStore()
  const { project } = getProjectStore()

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        {workspace ? (
          <BreadcrumbLink
            color="inherit"
            to={`/workspace/${workspace.workspaceId}`}
          >
            <Typography display="flex" alignItems="center" fontSize={14}>
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {workspace.title}
            </Typography>
          </BreadcrumbLink>
        ) : null}
        {workspace && project ? (
          <BreadcrumbLink
            to={`/workspace/${workspace.workspaceId}/project/${project.projectId}`}
          >
            <Typography display="flex" alignItems="center" fontSize={14}>
              <DvrIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {project.title}
            </Typography>
          </BreadcrumbLink>
        ) : null}
      </Breadcrumbs>
    </Box>
  )
}

export default IconBreadcrumbs
