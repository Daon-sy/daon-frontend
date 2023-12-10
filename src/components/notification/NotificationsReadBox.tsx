import React from "react"
import {
  Box,
  Button,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material"
import {
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  Notification,
  RegisteredTaskManagerNotification,
} from "_types/notification"
import { PageInfo, PageParams } from "api"
import RegisteredTaskManager from "components/notification/card/RegisteredTaskManager"
import InvitedWorkspace from "components/notification/card/InvitedWorkspace"
import InvitedProject from "components/notification/card/InvitedProject"
import DeportatedWorkspace from "components/notification/card/DeportatedWorkspace"
import DeportatedProject from "components/notification/card/DeportatedProject"

const renderNotification = (
  notification: Notification,
  removeCallback?: () => void,
) => {
  switch (notification.type) {
    case "REGISTERED_TASK_MANAGER": {
      return (
        <RegisteredTaskManager
          notification={
            notification as Notification<
              RegisteredTaskManagerNotification & { time: string }
            >
          }
          removeCallback={removeCallback}
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
          removeCallback={removeCallback}
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
          removeCallback={removeCallback}
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
          removeCallback={removeCallback}
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
          removeCallback={removeCallback}
        />
      )
    }
    default:
      return null
  }
}

interface Props {
  notifications?: Notification[]
  pageInfo?: PageInfo
  fetch: (pageParams?: PageParams) => void
  onNotificationsUnreadButtonClick: () => void
}

const NotificationsReadBox: React.FC<Props> = ({
  notifications = [],
  pageInfo,
  fetch,
  onNotificationsUnreadButtonClick,
}) => {
  React.useEffect(() => {
    fetch({ page: 0, size: 10 })
  }, [])

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1} display="flex" alignItems="center">
          <Typography color="primary" fontSize={20} fontWeight={500}>
            확인한 알림
          </Typography>
        </Box>
        <Button
          size="small"
          variant="outlined"
          onClick={onNotificationsUnreadButtonClick}
        >
          미확인 알림
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Stack mt={2} spacing={1}>
        {notifications.map(notification =>
          renderNotification(notification, fetch),
        )}
      </Stack>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={pageInfo?.totalPage || 1}
          size="small"
          page={(pageInfo?.pageNumber || 0) + 1}
          onChange={(e, value) =>
            fetch({ page: value - 1, size: pageInfo?.pageSize })
          }
        />
      </Box>
    </Box>
  )
}

export default NotificationsReadBox
