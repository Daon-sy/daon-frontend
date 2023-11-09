import React from "react"
import Box from "@mui/material/Box"
import { Stack } from "@mui/material"
import TaskKanbanBoard from "components/task/kanban/TaskKanbanBoard"

const tasks = [
  {
    taskId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "PROCEEDING",
    board: {
      boardId: 1,
      name: "회원 기능 개발",
    },
    emergency: false,
    bookmark: true,
    taskManager: {
      projectParticipantId: 1,
      name: "유하영",
      profileImageUrl: null,
    },
  },
  {
    taskId: 2,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "TODO",
    board: {
      boardId: 1,
      name: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 1,
      name: "유하영",
      profileImageUrl: null,
    },
  },
  {
    taskId: 3,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "COMPLETED",
    board: {
      boardId: 1,
      name: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 1,
      name: "유하영",
      profileImageUrl: null,
    },
  },
  {
    taskId: 4,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "PENDING",
    board: {
      boardId: 1,
      name: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 1,
      name: "유하영",
      profileImageUrl: null,
    },
  },
  {
    taskId: 5,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "COMPLETED",
    board: {
      boardId: 1,
      name: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 1,
      name: "유하영",
      profileImageUrl: null,
    },
  },
  {
    taskId: 6,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "TODO",
    board: {
      boardId: 1,
      name: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 1,
      name: "유하영",
      profileImageUrl: null,
    },
  },
]

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
  const renderKanbanBoards = () =>
    list.map(item => (
      <TaskKanbanBoard
        title={item.title}
        style={{ width: "100%" }}
        dividerColor={item.dividerColor}
        tasks={tasks.filter(
          task => task.progressStatus === item.progressStatus,
        )}
      />
    ))

  return (
    <Box
      sx={{
        paddingRight: 5,
        backgroundColor: "white",
        width: "100%",
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