import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Stack } from "@mui/material"
import TaskKanbanBoard from "components/task/kanban/TaskKanbanBoard"
import { taskListApi } from "api/task"
import { TaskSummary } from "_types/task"

const list = [
  {
    progressStatus: "TODO",
    title: "할 일",
    dividerColor: "rgba(29, 28, 53)",
  },
  {
    progressStatus: "PROCEEDING",
    title: "진행중",
    dividerColor: "rgba(40, 101, 249)",
  },
  {
    progressStatus: "COMPLETED",
    title: "완료됨",
    dividerColor: "rgba(110, 188, 81)",
  },
  {
    progressStatus: "PENDING",
    title: "보류중",
    dividerColor: "rgba(254, 171, 119)",
  },
]

const TaskKanbansWrapper: React.FC = () => {
  const [tasks, setTasks] = useState<TaskSummary[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceId = location.pathname.split("/")[2]
        const projectId = location.pathname.split("/")[4]
        const response = await taskListApi(+workspaceId, {
          projectId: +projectId,
        })
        setTasks(response.data.tasks)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchData() // fetchData 함수 호출
  }, [])

  const renderKanbanBoards = () =>
    list.map(item => (
      <TaskKanbanBoard
        key={item.progressStatus}
        title={item.title}
        style={{ width: "100%" }}
        dividerColor={item.dividerColor}
        tasks={tasks.filter(
          task => task.progressStatus === item.progressStatus && task !== null,
        )}
      />
    ))

  return (
    <Box
      sx={{
        paddingRight: 5,
        width: "100%",
        height: "80%",
        minHeight: "555px",
        overflow: "scroll",
        overflowX: "hidden",
        marginTop: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
          padding: 1,
          marginTop: 2,
        }}
        spacing={2}
      >
        {renderKanbanBoards()}
      </Stack>
    </Box>
  )
}

export default TaskKanbansWrapper
