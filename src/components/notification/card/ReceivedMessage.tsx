/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Chip } from "@mui/material"
import { Notification, ReceiveMessageNotification } from "_types/notification"
import { getWorkspaceStore } from "store/userStore"
import { useConfirmDialog } from "components/common/ConfirmDialog"
import NotificationCard from "components/notification/card/NotificationCard"

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
  const handleConfirmClick = () => {
    if (
      currentWorkspace &&
      currentWorkspace.workspaceId !== workspace.workspaceId
    ) {
      console.error()
    }
  }

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle]}
        time={time}
        onClick={openConfirmDialog}
        removeCallback={removeCallback}
      >
        <Box mt={1 / 2} fontSize={14}>
          <Box display="flex" alignItems="center">
            <Box>참여자 [</Box>
            <Box
              fontSize={14}
              fontWeight={500}
              maxWidth={200}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {sender.name}
            </Box>
            <Box>]님으로 부터</Box>
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
      <ConfirmDialog handleConfirm={handleConfirmClick} maxWidth="xs">
        <Typography>{`${workspace.workspaceTitle} 워크스페이스의 ${sender.name}님이 보낸 쪽지를 확인하시겠습니까?`}</Typography>
      </ConfirmDialog>
    </>
  )
}

export default ReceivedMessage
