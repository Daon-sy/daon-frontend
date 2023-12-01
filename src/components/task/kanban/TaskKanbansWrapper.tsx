import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import { Stack } from "@mui/material"
import TaskKanbanBoard from "components/task/kanban/TaskKanbanBoard"
import { TaskSummary, TASK_STATUS } from "_types/task"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { modifyTaskProgressStatusApi } from "api/task"
import { getTaskListFilterStore } from "store/taskStore"

const list = [
  {
    progressStatus: "TODO",
    title: "예정",
    dividerColor: "primary.main",
  },
  {
    progressStatus: "PROCEEDING",
    title: "진행중",
    dividerColor: "secondary.main",
  },
  {
    progressStatus: "COMPLETED",
    title: "완료",
    dividerColor: "success.main",
  },
  {
    progressStatus: "PENDING",
    title: "보류",
    dividerColor: "error.main",
  },
]

interface TaskKanbansWrapperProps {
  tasks: TaskSummary[]
  renderProject?: boolean
}

const TaskKanbansWrapper: React.FC<TaskKanbansWrapperProps> = ({
  tasks,
  renderProject = false,
}: TaskKanbansWrapperProps) => {
  const workspaceId = location.pathname.split("/")[2]
  const [updateTasks, setUpdateTask] = useState<TaskSummary[]>([])
  const { filter } = getTaskListFilterStore()

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
        tasks={updateTasks
          // 키워드 필터링
          .filter(task =>
            filter.keyword
              ? task.title.toUpperCase().includes(filter.keyword.toUpperCase())
              : true,
          )
          // 프로젝트 필터링
          .filter(task =>
            filter.projectId
              ? task.project.projectId === filter.projectId
              : true,
          )
          // 보드 필터링
          .filter(task =>
            filter.boardId ? task.board?.boardId === filter.boardId : true,
          )
          // 담당자 필터링
          .filter(task => (filter.my ? task.myTask : true))
          // 긴급 필터링
          .filter(task => (filter.emergency ? task.emergency : true))
          .filter(
            task =>
              task.progressStatus === item.progressStatus && task !== null,
          )}
        renderProject={renderProject}
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
