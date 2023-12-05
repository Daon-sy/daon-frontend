import React from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown, faLeaf } from "@fortawesome/free-solid-svg-icons"
import { TEST_IMAGE_URL } from "env"
import { WorkspaceParticipant } from "_types/workspace"

interface ParticipantItemProps {
  participant: WorkspaceParticipant
}

const ParticipantCard: React.FC<ParticipantItemProps> = ({ participant }) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "WORKSPACE_ADMIN":
        return <FontAwesomeIcon icon={faCrown} color="#FDD835" />
      case "PROJECT_ADMIN":
        return <FontAwesomeIcon icon={faLeaf} color="#1F4838" />
      default:
        return null
    }
  }

  return (
    <Card
      sx={{
        width: "22%",
        my: 2,
        mx: 1,
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{
            mt: "8.845px",
            ml: "8.845px",
            mr: "8.845px",
            width: 100,
            height: 100,
            borderRadius: "50%",
          }}
          component="img"
          src={participant.imageUrl || TEST_IMAGE_URL}
          alt="프로필 이미지"
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 15, pr: 0.5 }}>
              {participant.name}
            </Typography>
            {getRoleIcon(participant.role)}
          </Box>
          <Typography
            sx={{ fontSize: 10, textAlign: "center", color: "lightGray" }}
          >
            {participant.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ParticipantCard
