import React from "react"
import { Badge, Box, IconButton, Menu } from "@mui/material"
import { yellow } from "@mui/material/colors"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { getNotificationsUnreadStore } from "store/notificationStore"
import useNotification from "hooks/sse/useNotification"
import useFetchNotificationsUnread from "hooks/notification/useFetchNotificationsUnread"
import useFetchNotificationsRead from "hooks/notification/useFetchNotificationsRead"
import NotificationsUnreadBox from "components/notification/NotificationsUnreadBox"
import NotificationsReadBox from "components/notification/NotificationsReadBox"
import { getMyMemberDetailStore } from "store/userStore"
import CloseIcon from "@mui/icons-material/Close"
import { useSnackbar } from "notistack"
import { NotificationType } from "_types/notification"

const useNotiSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { mySettings } = getMyMemberDetailStore()
  return (type: NotificationType) => {
    if (mySettings?.notified) {
      enqueueSnackbar(
        type === "RECEIVE_MESSAGE"
          ? "쪽지가 도착했습니다."
          : "알림이 도착했습니다.",
        {
          variant: "info",
          style: {
            backgroundColor: type === "RECEIVE_MESSAGE" ? "#7DB249" : "#FFBE00",
            fontWeight: 500,
          },
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
          SnackbarProps: { style: { top: 60 } },
          action: key => (
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={() => closeSnackbar(key)}
            >
              <CloseIcon />
            </IconButton>
          ),
        },
      )
    }
  }
}

const NotificationButton = () => {
  const { notifications, isNewIssued, setIsNewIssued } =
    getNotificationsUnreadStore()
  const [notificationsPage, setNotificationsPage] = React.useState<
    "unread" | "read"
  >("unread")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const notiSnackbar = useNotiSnackbar()
  React.useEffect(() => {
    if (isNewIssued) {
      if (notifications.length > 0) {
        notiSnackbar(notifications[0].type)
      }
      setIsNewIssued(false)
    }
  }, [isNewIssued])

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
              // height: 500,
              overflowY: "scroll",
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
              "&::-webkit-scrollbar-button:vertical:start:increment": {
                display: "block",
                height: 72,
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
        <Box width={300} pl={2} pr={1}>
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
