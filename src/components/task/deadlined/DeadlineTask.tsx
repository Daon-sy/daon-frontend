import React from "react"
import { Box, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"
import { TaskSummary } from "_types/task"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"

interface Props {
  task: TaskSummary
}

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const selectColor = (num: number): string => {
  switch (num) {
    case 0:
      return "#AE3A1E"
    case 1:
      return "#FFB83B"
    case 2:
      return "#568a35"
    case 3:
      return "#585858"
    // return "#C8C8C8FF"
    default:
      return "#FFB83B"
  }
}

const DeadlineTask: React.FC<Props> = ({ task }) => {
  const { workspace } = getWorkspaceStore()
  const { setTaskDetailParam } = getTaskDetailViewStore()

  const endDate = task.endDate ? new Date(task.endDate) : new Date()
  const deadline = Math.floor(
    Math.abs((today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)),
  )

  return (
    <Box
      sx={{
        mb: "5px",
        width: "100%",
        height: "50px",
        paddingY: "8px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #cecece",
        borderRadius: "15px",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#dcdcdc",
        },
      }}
      onClick={() =>
        setTaskDetailParam({
          workspaceId: workspace?.workspaceId || 0,
          projectId: task.project.projectId,
          taskId: task.taskId,
        })
      }
    >
      {/* 날짜 */}
      <Box
        sx={{
          lineHeight: "50px",
          color: "white",
          bgcolor: selectColor(deadline),
          paddingY: "9px",
          width: 50,
          minWidth: 50,
          textAlign: "center",
          borderTopLeftRadius: "6px",
          borderBottomLeftRadius: "6px",
          left: -1,
          position: "relative",
        }}
      >
        {deadline === 0 ? "today" : `D-${deadline}`}
      </Box>
      {/* 내용 */}
      <Box
        sx={{
          pl: 0.5,
          overflow: "hidden",
        }}
      >
        <Box fontSize={12} color="#858585">
          {task.project.title}
        </Box>
        <Box>
          {task.emergency ? (
            <Typography mr={0.5} component="span">
              <FontAwesomeIcon icon={faFire} color="red" />
            </Typography>
          ) : null}
          <Typography
            component="span"
            sx={{
              pr: 1,
              color: "deepGray.main",
              fontSize: "16px",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
            }}
          >
            {task.title}
          </Typography>
        </Box>
        <Box color="#858585" fontSize={12} fontWeight={500}>
          {task.endDate}
        </Box>
      </Box>
    </Box>
  )
}

export default DeadlineTask
