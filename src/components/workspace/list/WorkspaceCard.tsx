import React from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { Workspace } from "_types/workspace"
import { TEST_IMAGE_URL } from "env"

interface WorkspaceItemProps {
  workspace: Workspace
  to: string
}

const WorkspaceCard: React.FC<WorkspaceItemProps> = ({ workspace, to }) => {
  return (
    <Card sx={{ maxWidth: "250px", height: "140px", my: 1, mx: "20px" }}>
      <CardActionArea component={RouterLink} to={to}>
        <Box
          sx={{
            display: "flex",
            padding: 1,
          }}
        >
          <Box
            sx={{
              widht: "100px",
              marginX: "auto",
              pr: "10px",
              borderRight: "1px solid skyblue",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "block",
                width: "90px",
                height: "30px",
                bgcolor: "skyblue",
                color: "white",
                borderRadius: 2,
                boxSizing: "border-box",
                textAlign: "center",
                lineHeight: "30px",
                fontSize: "16px",
              }}
            >
              {workspace.division}
            </Box>
            <CardMedia
              component="img"
              sx={{
                height: "110px",
                width: "90px",
                objectFit: "cover",
              }}
              image={workspace.imageUrl || TEST_IMAGE_URL}
              alt={workspace.title}
            />
          </Box>
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
              {workspace.title}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default WorkspaceCard
