import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Chip } from "@mui/material"
import {
  Notification,
  RegisteredTaskManagerNotification,
} from "_types/notification"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { useConfirmDialog } from "components/common/ConfirmDialog"
import NotificationCard from "components/notification/card/NotificationCard"

interface Props {
  notification: Notification<
    RegisteredTaskManagerNotification & { time: string }
  >
  removeCallback?: () => void
}

const RegisteredTaskManager: React.FC<Props> = ({
  notification,
  removeCallback,
}) => {
  const { notificationId, data } = notification
  const { workspace, project, task, time } = data

  const { ConfirmDialog, open: openConfirmDialog } = useConfirmDialog()
  const navigate = useNavigate()
  const { workspace: currentWorkspace } = getWorkspaceStore()
  const { setTaskDetailParam } = getTaskDetailViewStore()
  const handleConfirmClick = () => {
    if (
      currentWorkspace &&
      currentWorkspace.workspaceId !== workspace.workspaceId
    ) {
      navigate(
        `/workspace/${workspace.workspaceId}/project/${project.projectId}`,
        {
          state: { openTaskId: task.taskId },
        },
      )
    } else {
      setTaskDetailParam({
        workspaceId: workspace.workspaceId,
        projectId: project.projectId,
        taskId: task.taskId,
      })
    }
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
            <Box>할 일 [</Box>
            <Box
              fontSize={14}
              fontWeight={500}
              maxWidth={200}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {task.taskTitle}
            </Box>
            <Box>]의</Box>
          </Box>
          <Box mt={1 / 4} display="flex" alignItems="center">
            <Chip
              label="담당자"
              size="small"
              sx={{ height: 20, minWidth: 50, borderRadius: 1 }}
              color="secondary"
            />
            <Box pl={1 / 4}>로 지정되었습니다.</Box>
          </Box>
        </Box>
      </NotificationCard>
      <ConfirmDialog handleConfirm={handleConfirmClick} maxWidth="xs">
        <Typography>{`${workspace.workspaceTitle} 워크스페이스의 ${project.projectTitle} 프로젝트로 이동하시겠습니까?`}</Typography>
      </ConfirmDialog>
    </>
  )
}

export default RegisteredTaskManager
