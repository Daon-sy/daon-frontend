import React from "react"
import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import TaskTable from "components/task/table/TaskTable"
import { getTaskTableStore } from "store/taskTableStore"

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
}

const TaskTableWrapper: React.FC<TaskTableWrapperProps> = ({ tasks }) => {
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
        height: "80%",
        minHeight: "555px",
        overflow: "scroll",
        overflowX: "hidden",
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
