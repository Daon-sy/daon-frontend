import React from "react"
import { Box, Chip, Tooltip } from "@mui/material"
import {
  DeportationProjectNotification,
  Notification,
} from "_types/notification"
import NotificationCard from "components/notification/card/NotificationCard"
import { useAlertDialog } from "components/common/AlertDialog"
import useReadNotification from "hooks/notification/useReadNotification"
import ConfirmOutMemberAlarmComponent from "components/common/confirm/ConfirmOutMemberAlarm"
import useFetchProjectList from "hooks/project/useFetchProjectList"
import { useParams } from "react-router-dom"

interface Props {
  notification: Notification<DeportationProjectNotification & { time: string }>
  removeCallback?: () => void
}

const DeportatedProject: React.FC<Props> = ({
  notification,
  removeCallback,
}) => {
  const { notificationId, data } = notification
  const { workspace, project, time } = data

  const { fetch: read } = useReadNotification()
  const { AlertDialog, open: openAlertDialog } = useAlertDialog()
  const { fetchProjectList } = useFetchProjectList(workspace.workspaceId, true)
  const { workspaceId } = useParams()

  return (
    <>
      <NotificationCard
        key={notificationId}
        notification={notification}
        paths={[workspace.workspaceTitle, project.projectTitle]}
        time={time}
        onClick={openAlertDialog}
        removeCallback={removeCallback}
      >
        <Box mt={1 / 2} fontSize={14}>
          <Box display="flex" alignItems="center">
            <Box>프로젝트 [</Box>
            <Tooltip title={project.projectTitle} arrow>
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
            </Tooltip>
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
      <AlertDialog
        handleConfirm={() => {
          if (!notification.read) read(notificationId)
          if (workspaceId && Number(workspaceId) === workspace.workspaceId) {
            fetchProjectList()
          }
        }}
      >
        <ConfirmOutMemberAlarmComponent
          title="프로젝트"
          contents1={`[${workspace.workspaceTitle}] 워크스페이스  >`}
          contents2={`[${project.projectTitle}] 프로젝트`}
        />
      </AlertDialog>
    </>
  )
}

export default DeportatedProject
