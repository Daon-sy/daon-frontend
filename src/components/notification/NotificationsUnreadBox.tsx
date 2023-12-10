import React from "react"
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material"
import {
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  Notification,
  RegisteredTaskManagerNotification,
} from "_types/notification"
import RegisteredTaskManager from "components/notification/card/RegisteredTaskManager"
import InvitedWorkspace from "components/notification/card/InvitedWorkspace"
import InvitedProject from "components/notification/card/InvitedProject"
import DeportatedWorkspace from "components/notification/card/DeportatedWorkspace"
import DeportatedProject from "components/notification/card/DeportatedProject"

const renderNotification = (notification: Notification) => {
  switch (notification.type) {
    case "REGISTERED_TASK_MANAGER": {
      return (
        <RegisteredTaskManager
          notification={
            notification as Notification<
              RegisteredTaskManagerNotification & { time: string }
            >
          }
        />
      )
    }
    case "INVITE_WORKSPACE": {
      return (
        <InvitedWorkspace
          notification={
            notification as Notification<
              InviteWorkspaceNotification & {
                time: string
              }
            >
          }
        />
      )
    }
    case "INVITE_PROJECT": {
      return (
        <InvitedProject
          notification={
            notification as Notification<
              InviteProjectNotification & {
                time: string
              }
            >
          }
        />
      )
    }
    case "DEPORTATION_WORKSPACE": {
      return (
        <DeportatedWorkspace
          notification={
            notification as Notification<
              DeportationWorkspaceNotification & {
                time: string
              }
            >
          }
        />
      )
    }
    case "DEPORTATION_PROJECT": {
      return (
        <DeportatedProject
          notification={
            notification as Notification<
              DeportationProjectNotification & {
                time: string
              }
            >
          }
        />
      )
    }
    default:
      return null
  }
}

interface Props {
  notifications?: Notification[]
  onNotificationsReadButtonClick: () => void
}

const NotificationsUnreadBox: React.FC<Props> = ({
  notifications = [],
  onNotificationsReadButtonClick,
}) => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1} display="flex" alignItems="center">
          <Typography color="primary" fontSize={20} fontWeight={500}>
            미확인 알림
          </Typography>
          <Chip
            label={notifications.length > 99 ? "99+" : notifications.length}
            size="small"
            sx={{
              fontSize: 12,
              ml: 0.5,
              height: 16,
              minWidth: 16,
              ".MuiChip-label": { p: 0.5 },
            }}
          />
        </Box>
        <Button
          size="small"
          variant="outlined"
          onClick={onNotificationsReadButtonClick}
        >
          확인한 알림
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Stack mt={2} spacing={1}>
        {notifications.map(notification => renderNotification(notification))}
      </Stack>
    </Box>
  )
}

export default NotificationsUnreadBox
