import React from "react"
import { IconButton, Badge, Box, Menu } from "@mui/material"
import { yellow } from "@mui/material/colors"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { getNotificationsUnreadStore } from "store/notificationStore"
import useNotification from "hooks/sse/useNotification"
import useFetchNotificationsUnread from "hooks/notification/useFetchNotificationsUnread"
import useFetchNotificationsRead from "hooks/notification/useFetchNotificationsRead"
import NotificationsUnreadBox from "components/notification/NotificationsUnreadBox"
import NotificationsReadBox from "components/notification/NotificationsReadBox"

const NotificationButton = () => {
  const { notifications } = getNotificationsUnreadStore()
  const [notificationsPage, setNotificationsPage] = React.useState<
    "unread" | "read"
  >("unread")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  React.useEffect(() => {
    return () => {
      if (!open) setNotificationsPage("unread")
    }
  }, [open])

  useFetchNotificationsUnread()
  useNotification({
    ssePath: "/api/notifications/subscribe",
  })

  const {
    pageInfo,
    notifications: notificationsRead,
    fetch: fetchNotificationsRead,
  } = useFetchNotificationsRead()

  return (
    <Box mx={2}>
      <IconButton sx={{ p: 0.5 }} onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsIcon
            fontSize="large"
            sx={{
              color: yellow[600],
            }}
          />
        </Badge>
      </IconButton>
      <Menu
        elevation={0}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          root: {
            sx: {
              ".MuiList-root": { p: 0 },
            },
          },
          paper: {
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              maxHeight: 500,
              overflowY: "auto",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 80,
                width: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
              "&::-webkit-scrollbar": {
                width: "8px",
                borderRadius: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                position: "absolute",
                backgroundColor: "#495e57",
                borderRadius: "15px",
              },
            },
          },
        }}
      >
        <Box width={300} p={2}>
          {notificationsPage === "unread" ? (
            <NotificationsUnreadBox
              notifications={notifications}
              onNotificationsReadButtonClick={() =>
                setNotificationsPage("read")
              }
            />
          ) : (
            <NotificationsReadBox
              pageInfo={pageInfo}
              fetch={fetchNotificationsRead}
              notifications={notificationsRead}
              onNotificationsUnreadButtonClick={() =>
                setNotificationsPage("unread")
              }
            />
          )}
        </Box>
      </Menu>
    </Box>
  )
}

export default NotificationButton
