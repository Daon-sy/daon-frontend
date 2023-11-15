import React, { useEffect, useState } from "react"
import TaskView from "components/task/TaskView"
import { TaskSummary } from "_types/task"
import { taskListApi } from "api/task"
import Box from "@mui/material/Box"

const ProjectMytaskView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskSummary[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceId = location.pathname.split("/")[2]
        const projectId = location.pathname.split("/")[4]
        const response = await taskListApi(+workspaceId, {
          projectId: +projectId,
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
      <h1>프로젝트 내 할일 View 페이지</h1>
      <TaskView tasks={tasks} />
    </Box>
  )
}

export default ProjectMytaskView
