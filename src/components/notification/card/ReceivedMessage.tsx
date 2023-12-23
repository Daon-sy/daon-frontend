/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Chip, Tooltip } from "@mui/material"
import { Notification, ReceiveMessageNotification } from "_types/notification"
import { getWorkspaceStore } from "store/userStore"
import { useConfirmDialog } from "components/common/ConfirmDialog"
import NotificationCard from "components/notification/card/NotificationCard"
import useReadNotification from "hooks/notification/useReadNotification"
import ConfirmMovementComponent from "components/common/confirm/ConfirmMovement"

interface Props {
  notification: Notification<ReceiveMessageNotification & { time: string }>
  removeCallback?: () => void
}

const ReceivedMessage: React.FC<Props> = ({ notification, removeCallback }) => {
  const { notificationId, data } = notification
  const { workspace, message, time } = data
  const { messageId, sender } = message

  const { ConfirmDialog, open: openConfirmDialog } = useConfirmDialog()
  const navigate = useNavigate()
  const { workspace: currentWorkspace } = getWorkspaceStore()
  const { fetch: read } = useReadNotification()
  const anotherWorkspace = () =>
    currentWorkspace && currentWorkspace.workspaceId !== workspace.workspaceId
  const handleConfirmClick = () => {
    if (!notification.read) read(notificationId)
    navigate(`/workspace/${workspace.workspaceId}`, {
      state: { openMessage: true },
    })
  }

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle]}
        time={time}
        onClick={() => {
          if (anotherWorkspace()) openConfirmDialog()
          else navigate(".", { state: { openMessage: true } })
        }}
        removeCallback={removeCallback}
      >
        <Box mt={1 / 2} fontSize={14}>
          <Box display="flex" alignItems="center">
            <Box>참여자 [</Box>
            <Tooltip title={sender.name} arrow>
              <Box
                fontSize={14}
                fontWeight={500}
                maxWidth={160}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {sender.name}
              </Box>
            </Tooltip>
            <Box>]님으로부터</Box>
          </Box>
          <Box mt={1 / 4} display="flex" alignItems="center">
            <Chip
              label="쪽지"
              size="small"
              sx={{ height: 20, minWidth: 40, borderRadius: 1 }}
              color="green"
            />
            <Box pl={1 / 4}>가 도착하였습니다.</Box>
          </Box>
        </Box>
      </NotificationCard>
      {anotherWorkspace() ? (
        <ConfirmDialog handleConfirm={handleConfirmClick} maxWidth="xs">
          <ConfirmMovementComponent
            title="워크스페이스"
            contents1={`[${workspace.workspaceTitle}] 워크스페이스`}
          />
        </ConfirmDialog>
      ) : null}
    </>
  )
}

export default ReceivedMessage
