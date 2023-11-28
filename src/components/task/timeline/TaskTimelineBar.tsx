import React from "react"
import { Box, Tooltip } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTimelineStore } from "store/taskTimelineStore"
import { TaskSummary } from "_types/task"

interface Props {
  task: TaskSummary
  index?: number
  baseYearMonth: {
    year: number
    month: number
  }
  minStartDate: Date
  totalWidth: number
}

const TaskTimelineBar = ({
  task,
  index = 0,
  baseYearMonth,
  minStartDate,
  totalWidth,
}: Props) => {
  const { workspace } = getWorkspaceStore()
  const { setTaskDetailParam } = getTaskDetailViewStore()
  const { props: timelineProps } = getTaskTimelineStore()
  const { dateWidth, taskHeight } = timelineProps

  const renderPaintedLine = () => {
    if (task.startDate && task.endDate) {
      const start = new Date(task.startDate)
      const end = new Date(task.endDate)
      const dateCount =
        Math.abs((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)) + 1
      const { year: baseYear, month: baseMonth } = baseYearMonth
      const blankCount = Math.abs(
        (start.getTime() - new Date(baseYear, baseMonth - 1, 1).getTime()) /
          (1000 * 60 * 60 * 24),
      )

      const monthSub =
        (minStartDate.getFullYear() - baseYear) * 12 +
        (minStartDate.getMonth() - baseMonth)

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={`${task.startDate} ~ ${task.endDate}`} arrow>
            <Box
              sx={{
                position: "relative",
                left: blankCount * dateWidth - (monthSub + 1),
                borderRadius: 1,
                height: taskHeight * 0.55,
                width: dateCount * dateWidth - 1,
                backgroundColor: "#B96BC6",
                "&:hover": {
                  backgroundColor: "rgba(185,107,198,0.74)",
                },
              }}
              onClick={() =>
                setTaskDetailParam({
                  workspaceId: workspace?.workspaceId || 0,
                  projectId: task.project.projectId,
                  taskId: task.taskId,
                })
              }
            />
          </Tooltip>
          <Box
            sx={{
              color: "#797979",
              fontSize: 12,
              position: "relative",
              left: blankCount * dateWidth + 5,
            }}
          >
            {task.title}
          </Box>
        </Box>
      )
    }

    return null
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: totalWidth,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: taskHeight,
          display: "flex",
          alignItems: "center",
          backgroundColor: index % 2 === 0 ? "#ffffff" : "#F7F8F9FF",
        }}
      >
        {renderPaintedLine()}
      </Box>
    </Box>
  )
}

export default TaskTimelineBar
