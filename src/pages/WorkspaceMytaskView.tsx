import React, { useEffect, useState } from "react"
import TaskView from "components/task/TaskView"
import { TaskSummary } from "_types/task"
import { taskListApi } from "api/task"
import Box from "@mui/material/Box"

const WorkspaceMytaskView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskSummary[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceId = location.pathname.split("/")[2]
        const response = await taskListApi(+workspaceId, {
          my: true,
        })
        setTasks(response.data.tasks)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <h1>워크스페이스 내 나의 전체 할일</h1>
      <TaskView tasks={tasks} />
    </Box>
  )
}

export default WorkspaceMytaskView
