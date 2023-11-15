import React from "react"
import Box from "@mui/material/Box"
import { Chip, Divider } from "@mui/material"
import TaskCard from "components/task/kanban/TaskCard"
import { TaskSummary } from "_types/task"

interface Props {
  title: string
  dividerColor: string | null
  style: React.CSSProperties
  tasks: Array<TaskSummary>
}

const TaskKanbanBoard: React.FC<Props> = ({
  title,
  dividerColor,
  style,
  tasks,
}: Props) => {
  const renderTaskCards = () => tasks.map(task => <TaskCard task={task} />)

  return (
    <Box style={style}>
      <Box
        sx={{
          fontSize: 24,
          fontWeight: 500,
          paddingLeft: 0.5,
          paddingBottom: 2,
          margin: 0.5,
        }}
      >
        {title}
        <Chip
          label={tasks.length}
          variant="outlined"
          size="small"
          sx={{
            marginLeft: 2,
            paddingX: 1,
            color: "rgba(150, 150, 150)",
          }}
        />
      </Box>
      <Box
        sx={{
          margin: 0.5,
        }}
      >
        <Divider
          sx={{
            border: "2px solid",
            borderColor: dividerColor,
          }}
        />
      </Box>
      <Box
        sx={{
          margin: 1,
          marginTop: 2.5,
          paddingY: 0.1,
          backgroundColor: "rgba(242, 246, 252)",
          borderRadius: 2,
          height: "100%",
        }}
      >
        {renderTaskCards()}
      </Box>
    </Box>
  )
}

export default TaskKanbanBoard
