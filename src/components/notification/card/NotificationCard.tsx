import React from "react"
import {
  Box,
  Typography,
  Breadcrumbs,
  ButtonGroup,
  IconButton,
  Tooltip,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/Delete"
import { Notification } from "_types/notification"
import useReadNotification from "hooks/notification/useReadNotification"
import useRemoveNotification from "hooks/notification/useRemoveNotification"

interface Props {
  notification: Notification
  paths?: string[]
  time?: string
  children: React.ReactNode
  onClick?: () => void
  removeCallback?: () => void
}

const NotificationCard: React.FC<Props> = ({
  notification,
  paths = [],
  time,
  children,
  onClick,
  removeCallback,
}) => {
  const { fetch: read } = useReadNotification()
  const { fetch: remove } = useRemoveNotification()

  return (
    <Box
      position="relative"
      border={1}
      borderRadius={1}
      p={3 / 4}
      sx={theme => ({
        borderColor: theme.palette.grey["500"],
        "&:hover": {
          backgroundColor: theme.palette.background.default,
          cursor: "pointer",
        },
        "&:hover .actionButtons": {
          display: "block",
        },
      })}
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
          sx={{ flexGrow: 1, ".MuiBreadcrumbs-separator": { mx: 1 / 2 } }}
        >
          {paths.map((path, index) => (
            <Tooltip
              title={
                index === 0 ? `워크스페이스 : ${path}` : `프로젝트 : ${path}`
              }
              arrow
            >
              <Typography
                fontSize={12}
                color="deepGray.main"
                maxWidth={paths.length > 1 ? 120 : 240}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {path}
              </Typography>
            </Tooltip>
          ))}
        </Breadcrumbs>
        <ButtonGroup
          className="actionButtons"
          sx={{ display: "none", position: "absolute", right: 5 }}
        >
          {!notification.read ? (
            <IconButton
              size="small"
              sx={{ color: "green.main", height: 20, width: 20 }}
              onClick={e => {
                read(notification.notificationId)
                e.stopPropagation()
              }}
            >
              <CheckIcon sx={{ fontSize: 16 }} />
            </IconButton>
          ) : null}
          <IconButton
            size="small"
            sx={{ height: 20, width: 20 }}
            onClick={e => {
              remove(notification.notificationId, removeCallback)
              e.stopPropagation()
            }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </ButtonGroup>
      </Box>
      <Box>{children}</Box>
      {time ? (
        <Typography fontSize={12} textAlign="end" color="deepGray.main">
          {time.slice(0, 16)}
        </Typography>
      ) : null}
    </Box>
  )
}

export default NotificationCard
