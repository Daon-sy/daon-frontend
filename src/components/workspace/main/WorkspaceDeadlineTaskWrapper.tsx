import React from "react"
import { Box } from "@mui/material"
import { TaskSummary } from "_types/task"
import DeadlineTask from "components/task/deadlined/DeadlineTask"

interface Props {
  tasks: TaskSummary[]
}

const WorkspaceDeadlineTaskWrapper: React.FC<Props> = ({ tasks }) => {
  const memoTasks = React.useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const deadline = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 4,
    )
    return tasks
      .filter(task => task.progressStatus !== "PENDING")
      .filter(task => {
        if (!task.endDate) return false
        const endDate = new Date(task.endDate)
        return endDate < deadline && endDate >= today
      })
      .sort((t1, t2) => {
        // eslint-disable-next-line
        return new Date(t1.endDate!).getTime() - new Date(t2.endDate!).getTime()
      })
  }, [tasks])

  React.useEffect(() => {
    // console.log(memoTasks)
  }, [memoTasks])

  return (
    <Box
      component="ul"
      sx={{
        // p: 1,
        borderRadius: "6px",
        height: "100%",
        bgcolor: "#ffffff",
        scrollbarWidth: "0.5em",
        WebkitScrollSnapType: "none",
        overflowX: "hidden",
        overflowY: "scroll",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#495e57",
          borderRadius: "15px",
        },
        "&::-webkit-scrollbar-button": {
          height: "16px",
        },
      }}
    >
      <Box p={1}>
        {/* 할일 item */}
        {memoTasks.map(task => (
          <DeadlineTask key={task.taskId} task={task} />
        ))}
      </Box>
    </Box>
  )
}

export default WorkspaceDeadlineTaskWrapper
