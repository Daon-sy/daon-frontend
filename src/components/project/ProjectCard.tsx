import React from "react"
import { Card, CardContent, Typography, CardActionArea } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { Project } from "_types/project"

interface ProjectItemProps {
  project: Project
  to: string
}

const ProjectCard: React.FC<ProjectItemProps> = ({ project, to }) => {
  return (
    <Card sx={{ maxWidth: "200px", height: "140px", my: 1, mx: "16px" }}>
      <CardActionArea component={RouterLink} to={to}>
        <CardContent
          sx={{
            height: "110px",
            width: "150px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              whiteSpace: "pre-line",
              fontSize: "16px",
            }}
          >
            {project.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard
