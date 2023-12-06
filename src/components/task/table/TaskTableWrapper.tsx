import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import TaskTable from "components/task/table/TaskTable"
import { getTaskTableStore } from "store/taskTableStore"
import { TASK_STATUS, TaskSummary } from "_types/task"
import { getTaskListFilterStore } from "store/taskStore"
import { modifyTaskProgressStatusApi } from "api/task"

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TaskTableHeader: React.FC = () => {
  const { cellWidth } = getTaskTableStore()
  const {
    titleCellWidth,
    boardCellWidth,
    endDateCellWidth,
    taskManagerCellWidth,
  } = cellWidth

  const borderColor = "rgb(224, 224, 224)"

  return (
    <Box
      sx={{
        fontWeight: 500,
        color: "rgb(100,100,100)",
        border: "1px solid",
        borderColor,
        marginY: "-1px",
      }}
    >
      <Stack direction="row">
        <Box
          sx={{
            width: 40,
            height: 40,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          #
        </Box>
        <Box
          sx={{
            width: titleCellWidth,
            paddingX: 1,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          <Box flexGrow={1}>Task 제목</Box>
        </Box>
        <Box
          sx={{
            width: boardCellWidth,
            paddingX: 1,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          보드명
        </Box>
        <Box
          sx={{
            width: endDateCellWidth,
            paddingX: 1,
            paddingY: 1,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          마감일
        </Box>
        <Box
          sx={{
            width: taskManagerCellWidth,
            paddingLeft: 1,
            paddingRight: 2,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          <Box>담당자</Box>
        </Box>
      </Stack>
    </Box>
  )
}

interface TaskTableWrapperProps {
  tasks: TaskSummary[]
  renderProject?: boolean
}

const TaskTableWrapper: React.FC<TaskTableWrapperProps> = ({
  tasks,
  renderProject = false,
}) => {
  const { workspaceId } = useParams()
  const [updateTasks, setUpdateTask] = useState<TaskSummary[]>([])
  const { filter } = getTaskListFilterStore()

  useEffect(() => {
    setUpdateTask(tasks)
  }, [tasks])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !workspaceId) {
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
      Number(workspaceId),
      movedTask.project.projectId,
      movedTask.taskId,
      {
        ...movedTask,
      },
    )
    setUpdateTask(updatedTasks)
  }

  const renderTables = () =>
    list.map(item => (
      <TaskTable
        key={item.progressStatus}
        title={item.title}
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
          .filter(task => task.progressStatus === item.progressStatus)}
        renderProject={renderProject}
      />
    ))

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "8px",
            borderColor: "#C8C8C8FF",
          },
          "&::-webkit-scrollbar-thumb": {
            position: "absolute",
            backgroundColor: "#495e57",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-button": {
            width: "0px",
            height: "0px",
          },
        }}
      >
        <Stack
          sx={{
            width: "100%",
            paddingX: 0,
          }}
          spacing={2}
        >
          {/* <TaskTableHeader /> */}
          {renderTables()}
        </Stack>
      </Box>
    </DragDropContext>
  )
}

export default TaskTableWrapper
