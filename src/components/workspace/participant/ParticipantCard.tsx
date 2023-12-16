import React from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"
import wsIcon from "assets/img/ws_icon.png"
import pjIcon from "assets/img/pj_icon.png"
import { WorkspaceParticipant } from "_types/workspace"
import ColorAvatar from "components/common/ColorAvatar"
import MessageBoxModal from "components/message/modal/MessageBoxModal"
import { getWorkspaceStore } from "store/userStore"

interface ParticipantItemProps {
  participant: WorkspaceParticipant
}

const ParticipantCard: React.FC<ParticipantItemProps> = ({ participant }) => {
  const { myProfile } = getWorkspaceStore()
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorMenu)

  const [sendMessageModalOpen, setSendMessageModalOpen] =
    React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (
      myProfile?.workspaceParticipantId === participant.workspaceParticipantId
    ) {
      setAnchorMenu(null)
      return
    }
    setAnchorMenu(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorMenu(null)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "WORKSPACE_ADMIN":
        return (
          <Box
            component="img"
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              zIndex: 10,
              bottom: 70,
              left: 70,
            }}
            src={wsIcon}
          />
        )
      case "PROJECT_ADMIN":
        return (
          <Box
            component="img"
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              zIndex: 10,
              bottom: 70,
              left: 70,
            }}
            src={pjIcon}
          />
        )
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
              mr: 0,
              width: 80,
              height: 80,
            }}
          />
          {getRoleIcon(participant.role)}
        </Box>
        <CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title={participant.name} disableInteractive>
              <Typography
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                sx={{ width: "100%", fontSize: 15 }}
              >
                {participant.name}
              </Typography>
            </Tooltip>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title={participant.email} disableInteractive>
              <Typography
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                sx={{ fontSize: 10, textAlign: "center", color: "lightGray" }}
              >
                {participant.email}
              </Typography>
            </Tooltip>
          </Box>
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
          receiver={participant}
        />
      ) : null}
    </Card>
  )
}

export default ParticipantCard
