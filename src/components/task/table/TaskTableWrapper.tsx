import React from "react"
import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import TaskTable from "components/task/table/TaskTable"
import { getTaskTableStore } from "store/taskTableStore"

const tasks = [
  {
    taskId: 1,
    projectId: 1,
    workspaceId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "PROCEEDING",
    board: {
      boardId: 1,
      title: "로그인 처리 및 토큰 개발ㅇ",
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
    projectId: 1,
    workspaceId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "TODO",
    board: {
      boardId: 1,
      title: "회원 기능 개발",
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
    projectId: 1,
    workspaceId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "COMPLETED",
    board: {
      boardId: 2,
      title: "회의",
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
    projectId: 1,
    workspaceId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "PENDING",
    board: {
      boardId: 1,
      title: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 2,
      name: "김아무개",
      profileImageUrl: null,
    },
  },
  {
    taskId: 5,
    projectId: 1,
    workspaceId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "COMPLETED",
    board: {
      boardId: 1,
      title: "회원 기능 개발",
    },
    emergency: true,
    bookmark: false,
    taskManager: {
      projectParticipantId: 3,
      name: "성은",
      profileImageUrl: null,
    },
  },
  {
    taskId: 6,
    projectId: 1,
    workspaceId: 1,
    title: "업무 관리 시스템",
    startDate: "2023-11-01",
    endDate: "2023-11-31",
    progressStatus: "TODO",
    board: {
      boardId: 1,
      title: "회원 기능 개발",
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

const TaskTableWrapper: React.FC = () => {
  const renderTables = () =>
    list.map(item => (
      <TaskTable
        title={item.title}
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
        sx={{
          width: "100%",
          padding: 1,
          marginTop: 2,
        }}
        spacing={2}
      >
        <TaskTableHeader />
        {renderTables()}
      </Stack>
    </Box>
  )
}

export default TaskTableWrapper
