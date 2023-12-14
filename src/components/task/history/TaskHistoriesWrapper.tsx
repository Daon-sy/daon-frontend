import React from "react"
import { TaskHistory } from "_types/task"
import TaskHistoryComponent from "components/task/history/TaskHistory"
import { Stack } from "@mui/material"
import NoData from "components/common/NoData"

interface Props {
  taskHistories: Array<TaskHistory>
}

const TaskHistoriesWrapper = ({ taskHistories }: Props) => (
  <Stack mt={1} spacing={0.5}>
    {taskHistories.length === 0 && (
      <NoData
        content="히스토리가 없습니다"
        width="120px"
        height="60px"
        sx={{ height: "180px" }}
      />
    )}
    {taskHistories.map(h => (
      <TaskHistoryComponent taskHistory={h} />
    ))}
  </Stack>
)

export default TaskHistoriesWrapper
