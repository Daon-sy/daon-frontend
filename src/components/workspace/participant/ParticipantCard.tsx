import React from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown, faLeaf } from "@fortawesome/free-solid-svg-icons"
import { WorkspaceParticipant } from "_types/workspace"
import MessageBoxModal from "components/message/modal/MessageBoxModal"
import ColorAvatar from "components/common/ColorAvatar"

interface ParticipantItemProps {
  participant: WorkspaceParticipant
}

const ParticipantCard: React.FC<ParticipantItemProps> = ({ participant }) => {
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorMenu)

  const [sendMessageModalOpen, setSendMessageModalOpen] =
    React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorMenu(null)
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

  const handleSendMessageClick = () => {
    setSendMessageModalOpen(true)
    handleClose()
  }

  return (
    <Card
      sx={{
        width: 120,
        my: 2,
        mx: 1,
      }}
    >
      <CardActionArea onClick={handleClick}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          pt={2}
        >
          <ColorAvatar
            id={participant.workspaceParticipantId}
            src={participant.imageUrl}
            sx={{
              width: 80,
              height: 80,
            }}
          />
        </Box>
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
      {sendMessageModalOpen ? (
        <MessageBoxModal
          open={sendMessageModalOpen}
          handleClose={() => setSendMessageModalOpen(false)}
          category="SendMessage"
        />
      ) : null}
    </Card>
  )
}

export default ParticipantCard
