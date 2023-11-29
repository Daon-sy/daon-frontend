import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { TEST_IMAGE_URL } from "env"
import { WorkspaceParticipant } from "_types/workspace"
import React from "react"

interface ParticipantItemProps {
  participant: WorkspaceParticipant
}

const ParticipantCard: React.FC<ParticipantItemProps> = ({ participant }) => {
  return (
    <Card
      sx={{
        width: "131px",
        height: "180px",
        m: 1,
        mt: 2,
        mb: 2,
        justifyItems: "center",
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{ pb: 0.5 }}
          component="img"
          image={TEST_IMAGE_URL}
          alt="프로필 이미지"
        />
        <CardContent>
          <Typography sx={{ fontSize: 15, textAlign: "center", pb: 0.5 }}>
            {participant.name}
          </Typography>
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
