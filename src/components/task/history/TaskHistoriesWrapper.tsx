import React from "react"
import { TaskHistory } from "_types/task"
import TaskHistoryComponent from "components/task/history/TaskHistory"
import { Stack } from "@mui/material"

interface Props {
  taskHistories: Array<TaskHistory>
}

const TaskHistoriesWrapper = ({ taskHistories }: Props) => (
  <Stack mt={1} spacing={0.5}>
    {taskHistories.map(h => (
      <TaskHistoryComponent taskHistory={h} />
    ))}
  </Stack>
)

export default TaskHistoriesWrapper
