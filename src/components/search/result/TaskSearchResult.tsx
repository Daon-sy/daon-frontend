/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Chip, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"
import { SearchTaskResult } from "api/search"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import ConfirmDialog from "components/common/ConfirmDialog"
import { TASK_STATUS_SET } from "_types/task"
import ConfirmMovementComponent from "../../common/confirm/ConfirmMovement"

interface Props {
  task: SearchTaskResult
}

const TaskSearchResult: React.FC<Props> = ({ task }) => {
  const {
    taskId,
    project,
    board,
    title: taskTitle,
    taskManager,
    startDate,
    endDate,
    progressStatus,
    emergency,
    replyCount,
    workspace,
    createdAt,
    modifiedAt,
  } = task

  const { projectId, title: projectTitle } = project

  const { workspaceId, title: workspaceTitle } = workspace

  const [confirmDialogData, setConfirmDialogData] = React.useState<{
    children: React.ReactNode
    handleConfirm: () => void
  }>()

  const navigate = useNavigate()
  const { workspace: currentWorkspace } = getWorkspaceStore()
  const { setTaskDetailParam } = getTaskDetailViewStore()
  const handleResultClick = () => {
    if (currentWorkspace && currentWorkspace.workspaceId !== workspaceId) {
      setConfirmDialogData({
        children: (
          <ConfirmMovementComponent
            title="프로젝트"
            contents1={`[${workspaceTitle}] 워크스페이스  >`}
            contents2={`[${projectTitle}] 프로젝트`}
          />
        ),
        handleConfirm: () =>
          navigate(`/workspace/${workspaceId}/project/${projectId}`, {
            state: { openTaskId: taskId },
          }),
      })
    } else {
      setTaskDetailParam({
        workspaceId,
        projectId,
        boardId: board?.boardId || 0,
        taskId,
      })
    }
  }

  return (
    <Box
      key={`tsk${taskId}`}
      p={0.5}
      sx={{
        "&:hover": {
          backgroundColor: "background.default",
          cursor: "pointer",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        borderRadius={1}
        onClick={handleResultClick}
      >
        {task.emergency ? (
          <Typography
            sx={{
              mr: 0.5,
              display: "inline-flex",
              alignItems: "center",
              height: "16px",
              position: "relative",
            }}
          >
            <FontAwesomeIcon icon={faFire} color="red" />
          </Typography>
        ) : null}
        <Chip
          label={
            TASK_STATUS_SET.find(ts => ts.value === progressStatus)
              ?.description || "TODO"
          }
          size="small"
          variant="outlined"
          sx={{ mr: 0.5, fontSize: 10, height: 16, borderRadius: 1 }}
        />
        <Typography fontSize={14} color="primary">
          {taskTitle}
        </Typography>
      </Box>
      <Box>
        <Typography
          // ml={2}
          fontSize={12}
        >{`(${workspaceTitle}-${projectTitle}에서 생성됨)`}</Typography>
      </Box>
      {confirmDialogData ? (
        <ConfirmDialog
          open={!!confirmDialogData}
          handleConfirm={confirmDialogData.handleConfirm}
          handleClose={() => setConfirmDialogData(undefined)}
        >
          {confirmDialogData?.children}
        </ConfirmDialog>
      ) : null}
    </Box>
  )
}

export default TaskSearchResult
