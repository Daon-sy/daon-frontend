// 임시
/* eslint-disable */
import React from "react"
import {
  IconButton,
  Typography,
  Badge,
  Box,
  ListItem,
  Paper,
  Menu,
  TypographyProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { yellow } from "@mui/material/colors"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { getNotificationStore } from "store/notificationStore"
import {
  Notification,
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  RegisteredTaskManagerNotification,
} from "_types/notification"

const StyledTypography = styled((props: TypographyProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Typography {...props} />
))(({ theme }) => ({
  fontSize: 14,
}))

const RegisteredTaskManagerNoti = ({
  notificationId,
  workspaceTitle,
  projectTitle,
  taskTitle,
}: {
  notificationId: number
  workspaceTitle: string
  projectTitle: string
  taskTitle: string
}) => (
  <>
    <StyledTypography>
      할 일 [<StyledTypography component="span">{taskTitle}</StyledTypography>
      ]의 담당자로 지정되었습니다.
    </StyledTypography>
    <StyledTypography>
      워크스페이스[
      <StyledTypography component="span">
        {workspaceTitle}
      </StyledTypography>] {">"} 프로젝트[
      <StyledTypography component="span">{projectTitle}</StyledTypography>]
    </StyledTypography>
  </>
)

const InviteWorkspaceNoti = ({
  notificationId,
  workspaceTitle,
}: {
  notificationId: number
  workspaceTitle: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>]에
    초대되었습니다.
  </StyledTypography>
)

const InviteProjectNoti = ({
  notificationId,
  workspaceTitle,
  projectTitle,
}: {
  notificationId: number
  workspaceTitle: string
  projectTitle: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>]의
    프로젝트[
    <StyledTypography component="span">{projectTitle}</StyledTypography>]에
    초대되었습니다.
  </StyledTypography>
)

const DeportationWorkspaceNoti = ({
  notificationId,
  workspaceTitle,
}: {
  notificationId: number
  workspaceTitle: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>
    ]에서 내보내졌습니다.
  </StyledTypography>
)

const DeportationProjectNoti = ({
  notificationId,
  workspaceTitle,
  projectTitle,
}: {
  notificationId: number
  workspaceTitle: string
  projectTitle: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>]의
    프로젝트[
    <StyledTypography component="span">{projectTitle}</StyledTypography>]에서
    내보내졌습니다.
  </StyledTypography>
)

const renderNotification = (noti: Notification) => {
  switch (noti.type) {
    case "REGISTERED_TASK_MANAGER": {
      const { workspace, project, task } =
        noti.data as RegisteredTaskManagerNotification
      return (
        <RegisteredTaskManagerNoti
          notificationId={noti.notificationId}
          workspaceTitle={workspace.workspaceTitle}
          projectTitle={project.projectTitle}
          taskTitle={task.taskTitle}
        />
      )
    }
    case "INVITE_WORKSPACE": {
      const { workspace } = noti.data as InviteWorkspaceNotification
      return (
        <InviteWorkspaceNoti
          notificationId={noti.notificationId}
          workspaceTitle={workspace.workspaceTitle}
        />
      )
    }
    case "INVITE_PROJECT": {
      const { workspace, project } = noti.data as InviteProjectNotification
      return (
        <InviteProjectNoti
          notificationId={noti.notificationId}
          workspaceTitle={workspace.workspaceTitle}
          projectTitle={project.projectTitle}
        />
      )
    }
    case "DEPORTATION_WORKSPACE": {
      const { workspace } = noti.data as DeportationWorkspaceNotification
      return (
        <DeportationWorkspaceNoti
          notificationId={noti.notificationId}
          workspaceTitle={workspace.workspaceTitle}
        />
      )
    }
    case "DEPORTATION_PROJECT": {
      const { workspace, project } = noti.data as DeportationProjectNotification
      return (
        <DeportationProjectNoti
          notificationId={noti.notificationId}
          workspaceTitle={workspace.workspaceTitle}
          projectTitle={project.projectTitle}
        />
      )
    }
    default:
      return null
  }
}

const NotificationButton = () => {
  const { notifications } = getNotificationStore()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          paper: {
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              maxWidth: 300,
              maxHeight: 400,
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
        {notifications.length === 0 ? (
          <ListItem disablePadding>{123}</ListItem>
        ) : (
          notifications.map(noti => (
            <ListItem disablePadding>
              <Paper
                variant="outlined"
                sx={{
                  width: "100%",
                  "&:hover": { backgroundColor: "background.default" },
                }}
              >
                {renderNotification(noti)}
              </Paper>
            </ListItem>
          ))
        )}
      </Menu>
    </Box>
  )
}

export default NotificationButton
