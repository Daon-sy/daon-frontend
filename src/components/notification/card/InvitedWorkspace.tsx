import React from "react"
import { Box, Chip } from "@mui/material"
import { InviteWorkspaceNotification, Notification } from "_types/notification"
import NotificationCard from "components/notification/card/NotificationCard"
import { useTitleDialog } from "components/common/TitleDialog"
import JoinWorkspace from "components/workspace/JoinWorkspace"

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

  const {
    TitleDialog,
    open: openJoinWorkspaceDialog,
    close: closeJoinWorkspaceDialog,
  } = useTitleDialog()

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle]}
        time={time}
        onClick={openJoinWorkspaceDialog}
        removeCallback={removeCallback}
      >
        <Box mt={1 / 2} fontSize={14}>
          <Box display="flex" alignItems="center">
            <Box>워크스페이스 [</Box>
            <Box
              fontSize={14}
              fontWeight={500}
              maxWidth={180}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {workspace.workspaceTitle}
            </Box>
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
          }}
          handleCancel={closeJoinWorkspaceDialog}
        />
      </TitleDialog>
    </>
  )
}

export default InvitedWorkspace
