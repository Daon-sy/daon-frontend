import React from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown, faLeaf } from "@fortawesome/free-solid-svg-icons"
import { TEST_IMAGE_URL } from "env"
import { WorkspaceParticipant } from "_types/workspace"

interface ParticipantItemProps {
  participant: WorkspaceParticipant
  onSendMessageClick: () => void
}

const ParticipantCard: React.FC<ParticipantItemProps> = ({
  participant,
  onSendMessageClick,
}) => {
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorMenu)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorMenu(null)
  }

  const handleSendMessageClick = () => {
    onSendMessageClick()
    handleClose()
  }

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
      onClick={handleClick}
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
      <Menu
        anchorEl={anchorMenu}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 100,
          horizontal: 40,
        }}
      >
        <MenuItem onClick={handleSendMessageClick}>쪽지 보내기</MenuItem>
      </Menu>
    </Card>
  )
}

export default ParticipantCard
