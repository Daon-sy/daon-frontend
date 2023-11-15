import { Box } from "@mui/material"
import React from "react"
import TaskHeader from "components/task/TaskHeader"
import TaskKanbansWrapper from "components/task/kanban/TaskKanbansWrapper"
import TaskTableWrapper from "components/task/table/TaskTableWrapper"
import { TaskSummary } from "_types/task"

interface TaskViewProps {
  tasks: TaskSummary[]
}

const TaskView: React.FC<TaskViewProps> = ({ tasks }) => {
  const [viewType, setViewType] = React.useState<string>("kanban")
  const renderView = () => {
    switch (viewType) {
      case "kanban":
        return <TaskKanbansWrapper tasks={tasks} />
      case "table":
        return <TaskTableWrapper tasks={tasks} />
      default:
        return <TaskKanbansWrapper tasks={tasks} />
    }
  }

  return (
    <Box sx={{ height: "100%" }}>
      <TaskHeader viewType={viewType} setViewType={setViewType} />
      {renderView()}
    </Box>
  )
}

export default TaskView
