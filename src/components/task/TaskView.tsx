import { Box } from "@mui/material"
import React from "react"
import TaskHeader from "components/task/TaskHeader"
import TaskKanbansWrapper from "components/task/kanban/TaskKanbansWrapper"
import TaskTableWrapper from "components/task/table/TaskTableWrapper"

const TaskView = () => {
  const [viewType, setViewType] = React.useState<string>("kanban")

  const renderView = () => {
    switch (viewType) {
      case "kanban":
        return <TaskKanbansWrapper />
      case "table":
        return <TaskTableWrapper />
      default:
        return <TaskKanbansWrapper />
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
