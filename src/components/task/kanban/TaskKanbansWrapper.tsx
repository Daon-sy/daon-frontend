import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import { Stack } from "@mui/material"
import TaskKanbanBoard from "components/task/kanban/TaskKanbanBoard"
import { TaskSummary, TASK_STATUS } from "_types/task"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { modifyTaskProgressStatusApi } from "api/task"

interface TaskKanbansWrapperProps {
  tasks: TaskSummary[]
}

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

const TaskKanbansWrapper: React.FC<TaskKanbansWrapperProps> = ({
  tasks,
}: TaskKanbansWrapperProps) => {
  const workspaceId = location.pathname.split("/")[2]
  const [updateTasks, setUpdateTask] = useState<TaskSummary[]>([])

  useEffect(() => {
    setUpdateTask(tasks)
  }, [tasks])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const { destination, draggableId } = result
    const updatedTasks = [...updateTasks]
    const movedTaskIndex = updatedTasks.findIndex(
      task => task.taskId === +draggableId,
    )
    const movedTask = updatedTasks[movedTaskIndex]
    updatedTasks.splice(movedTaskIndex, 1)
    updatedTasks.splice(destination.index, 0, movedTask)
    movedTask.progressStatus = destination.droppableId as TASK_STATUS
    // API 호출 및 업데이트
    modifyTaskProgressStatusApi(
      +workspaceId,
      movedTask.project.projectId,
      movedTask.taskId,
      {
        ...movedTask,
      },
    )
    setUpdateTask(updatedTasks)
  }
  const renderKanbanBoards = () =>
    list.map(item => (
      <TaskKanbanBoard
        key={item.progressStatus}
        title={item.title}
        style={{ width: "100%" }}
        dividerColor={item.dividerColor}
        progressStatus={item.progressStatus}
        tasks={updateTasks.filter(
          task => task.progressStatus === item.progressStatus && task !== null,
        )}
      />
    ))

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
    </DragDropContext>
  )
}

export default TaskKanbansWrapper
