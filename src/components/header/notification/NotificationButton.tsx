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
import useReadNotification from "hooks/notification/useReadNotification"
import useFetchNotifications from "hooks/notification/useFetchNotifications"
import useNotification from "hooks/sse/useNotification"
import { useTitleDialog } from "components/common/TitleDialog"
import JoinWorkspace from "components/workspace/JoinWorkspace"

const StyledTypography = styled((props: TypographyProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Typography {...props} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  fontSize: 14,
}))

const RegisteredTaskManagerNoti = ({
  workspaceTitle,
  projectTitle,
  taskTitle,
  time,
}: {
  workspaceTitle: string
  projectTitle: string
  taskTitle: string
  time: string
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
    <StyledTypography>{time}</StyledTypography>
  </>
)

const InviteWorkspaceNoti = ({
  workspaceTitle,
  time,
}: {
  workspaceTitle: string
  time: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>]에
    초대되었습니다.
    <StyledTypography>{time}</StyledTypography>
  </StyledTypography>
)

const InviteProjectNoti = ({
  workspaceTitle,
  projectTitle,
  time,
}: {
  workspaceTitle: string
  projectTitle: string
  time: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>]의
    프로젝트[
    <StyledTypography component="span">{projectTitle}</StyledTypography>]에
    초대되었습니다.
    <StyledTypography>{time}</StyledTypography>
  </StyledTypography>
)

const DeportationWorkspaceNoti = ({
  workspaceTitle,
  time,
}: {
  workspaceTitle: string
  time: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>
    ]에서 내보내졌습니다.
    <StyledTypography>{time}</StyledTypography>
  </StyledTypography>
)

const DeportationProjectNoti = ({
  workspaceTitle,
  projectTitle,
  time,
}: {
  workspaceTitle: string
  projectTitle: string
  time: string
}) => (
  <StyledTypography>
    워크스페이스[
    <StyledTypography component="span">{workspaceTitle}</StyledTypography>]의
    프로젝트[
    <StyledTypography component="span">{projectTitle}</StyledTypography>]에서
    내보내졌습니다.
    <StyledTypography>{time}</StyledTypography>
  </StyledTypography>
)

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

  useFetchNotifications()
  useNotification({
    ssePath: "/api/notifications/subscribe",
  })

  const { fetch: readNotification } = useReadNotification()

  const {
    TitleDialog,
    open: openJoinWorkspaceDialog,
    close: closeJoinWorkspaceDialog,
  } = useTitleDialog()

  const [selectedNoti, setSelectedNoti] = React.useState<
    | {
        notificationId: number
        workspaceId: number
      }
    | undefined
  >()

  React.useEffect(() => {
    if (selectedNoti) {
      openJoinWorkspaceDialog()
    }
  }, [selectedNoti])

  const renderNotification = (noti: Notification) => {
    switch (noti.type) {
      case "REGISTERED_TASK_MANAGER": {
        const { workspace, project, task, time } =
          noti.data as RegisteredTaskManagerNotification & { time: string }
        return (
          <Box onClick={() => readNotification(noti.notificationId)}>
            <RegisteredTaskManagerNoti
              workspaceTitle={workspace.workspaceTitle}
              projectTitle={project.projectTitle}
              taskTitle={task.taskTitle}
              time={time}
            />
          </Box>
        )
      }
      case "INVITE_WORKSPACE": {
        const { workspace, time } = noti.data as InviteWorkspaceNotification & {
          time: string
        }
        return (
          <Box
            onClick={() => {
              setSelectedNoti({
                notificationId: noti.notificationId,
                workspaceId: workspace.workspaceId,
              })
            }}
          >
            <InviteWorkspaceNoti
              workspaceTitle={workspace.workspaceTitle}
              time={time}
            />
          </Box>
        )
      }
      case "INVITE_PROJECT": {
        const { workspace, project, time } =
          noti.data as InviteProjectNotification & {
            time: string
          }
        return (
          <Box onClick={() => readNotification(noti.notificationId)}>
            <InviteProjectNoti
              workspaceTitle={workspace.workspaceTitle}
              projectTitle={project.projectTitle}
              time={time}
            />
          </Box>
        )
      }
      case "DEPORTATION_WORKSPACE": {
        const { workspace, time } =
          noti.data as DeportationWorkspaceNotification & {
            time: string
          }
        return (
          <Box onClick={() => readNotification(noti.notificationId)}>
            <DeportationWorkspaceNoti
              workspaceTitle={workspace.workspaceTitle}
              time={time}
            />
          </Box>
        )
      }
      case "DEPORTATION_PROJECT": {
        const { workspace, project, time } =
          noti.data as DeportationProjectNotification & { time: string }
        return (
          <Box onClick={() => readNotification(noti.notificationId)}>
            <DeportationProjectNoti
              workspaceTitle={workspace.workspaceTitle}
              projectTitle={project.projectTitle}
              time={time}
            />
          </Box>
        )
      }
      default:
        return null
    }
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
          <ListItem disablePadding>empty set</ListItem>
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
      <TitleDialog title="워크스페이스 참여" maxWidth="sm">
        <JoinWorkspace
          workspaceId={selectedNoti ? selectedNoti.workspaceId : 0}
          handleSuccess={() => {
            readNotification(selectedNoti ? selectedNoti.notificationId : 0)
            closeJoinWorkspaceDialog()
            handleClose()
          }}
          handleCancel={closeJoinWorkspaceDialog}
        />
      </TitleDialog>
    </Box>
  )
}

export default NotificationButton
