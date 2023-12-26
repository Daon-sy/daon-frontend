import React from "react"
import { Box, Chip, Tooltip } from "@mui/material"
import { InviteWorkspaceNotification, Notification } from "_types/notification"
import NotificationCard from "components/notification/card/NotificationCard"
import { useTitleDialog } from "components/common/TitleDialog"
import JoinWorkspace from "components/workspace/JoinWorkspace"
import useReadNotification from "hooks/notification/useReadNotification"
import { useAlert } from "hooks/useAlert"

interface Props {
  notification: Notification<InviteWorkspaceNotification & { time: string }>
  removeCallback?: () => void
}

const InvitedWorkspace: React.FC<Props> = ({
  notification,
  removeCallback,
}) => {
  const { notificationId, data } = notification
  const { workspace, time } = data
  const { fetch: read } = useReadNotification()
  const {
    TitleDialog,
    open: openJoinWorkspaceDialog,
    close: closeJoinWorkspaceDialog,
  } = useTitleDialog()
  const { addError } = useAlert()

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle]}
        time={time}
        onClick={() => {
          if (notification.read) {
            addError("이미 참여한 워크스페이스입니다")
            return
          }
          openJoinWorkspaceDialog()
        }}
        removeCallback={removeCallback}
      >
        <Box mt={1 / 2} fontSize={14}>
          <Box display="flex" alignItems="center">
            <Box>워크스페이스 [</Box>
            <Tooltip title={workspace.workspaceTitle} arrow>
              <Box
                fontSize={14}
                fontWeight={500}
                maxWidth={160}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {workspace.workspaceTitle}
              </Box>
            </Tooltip>
            <Box>]에</Box>
          </Box>
          <Box mt={1 / 4} display="flex" alignItems="center">
            <Chip
              label="초대"
              size="small"
              sx={{ height: 20, minWidth: 40, borderRadius: 1 }}
              color="blue"
            />
            <Box pl={1 / 4}>되었습니다.</Box>
          </Box>
        </Box>
      </NotificationCard>
      <TitleDialog title="워크스페이스 참여" maxWidth="sm">
        <JoinWorkspace
          workspaceId={workspace.workspaceId}
          handleSuccess={() => {
            closeJoinWorkspaceDialog()
            if (!notification.read) read(notificationId)
          }}
          handleCancel={closeJoinWorkspaceDialog}
        />
      </TitleDialog>
    </>
  )
}

export default InvitedWorkspace
