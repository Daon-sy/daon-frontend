import React from "react"
import { Box, Chip, Typography } from "@mui/material"
import {
  DeportationWorkspaceNotification,
  Notification,
} from "_types/notification"
import { useAlertDialog } from "components/common/AlertDialog"
import NotificationCard from "components/notification/card/NotificationCard"

interface Props {
  notification: Notification<
    DeportationWorkspaceNotification & { time: string }
  >
  removeCallback?: () => void
}

const DeportatedWorkspace: React.FC<Props> = ({
  notification,
  removeCallback,
}) => {
  const { notificationId, data } = notification
  const { workspace, time } = data

  const { AlertDialog, open: openAlertDialog } = useAlertDialog()

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle]}
        time={time}
        onClick={openAlertDialog}
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
            <Box>]에서</Box>
          </Box>
          <Box mt={1 / 4} display="flex" alignItems="center">
            <Chip
              label="내보내기"
              size="small"
              sx={{ height: 20, minWidth: 40, borderRadius: 1 }}
              color="error"
            />
            <Box pl={1 / 4}>되었습니다.</Box>
          </Box>
        </Box>
      </NotificationCard>
      <AlertDialog>
        <Typography>{`${workspace.workspaceTitle} 워크스페이스에서 내보내기 되었습니다.`}</Typography>
      </AlertDialog>
    </>
  )
}

export default DeportatedWorkspace