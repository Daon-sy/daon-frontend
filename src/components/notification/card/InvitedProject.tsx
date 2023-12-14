import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Chip, Typography } from "@mui/material"
import { InviteProjectNotification, Notification } from "_types/notification"
import NotificationCard from "components/notification/card/NotificationCard"
import { useConfirmDialog } from "components/common/ConfirmDialog"
import ConfirmMovementComponent from "../../common/confirm/ConfirmMovement"

interface Props {
  notification: Notification<InviteProjectNotification & { time: string }>
  removeCallback?: () => void
}

const InvitedProject: React.FC<Props> = ({ notification, removeCallback }) => {
  const { notificationId, data } = notification
  const { workspace, project, time } = data

  const { ConfirmDialog, open: openConfirmDialog } = useConfirmDialog()
  const navigate = useNavigate()
  const handleConfirmClick = () => {
    navigate(`/workspace/${workspace.workspaceId}/project/${project.projectId}`)
  }

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle, project.projectTitle]}
        time={time}
        onClick={openConfirmDialog}
        removeCallback={removeCallback}
      >
        <Box mt={1 / 2} fontSize={14}>
          <Box display="flex" alignItems="center">
            <Box>프로젝트 [</Box>
            <Box
              fontSize={14}
              fontWeight={500}
              maxWidth={180}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {project.projectTitle}
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
      <ConfirmDialog handleConfirm={handleConfirmClick} maxWidth="xs">
        <ConfirmMovementComponent
          title="프로젝트"
          contents1={`[${workspace.workspaceTitle}] 워크스페이스  >`}
          contents2={`[${project.projectTitle}] 프로젝트`}
        />
      </ConfirmDialog>
    </>
  )
}

export default InvitedProject
