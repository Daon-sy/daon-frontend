import React from "react"
import { TaskSummary } from "_types/TaskType"
import Box from "@mui/material/Box"
import { Avatar, Chip, Stack, ToggleButton } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { getTaskTableStore } from "store/taskTableStore"

// 북마크 버튼 아이콘
interface BookmarkButtonProps {
  selected: boolean
}

const BookmarkButton = ({ selected }: BookmarkButtonProps) => {
  const iconSx = {
    fontSize: "small",
  }

  return (
    <ToggleButton
      value="check"
      selected={selected}
      size="small"
      sx={{
        padding: 0.5,
      }}
    >
      {selected ? <StarIcon sx={iconSx} /> : <StarBorderIcon sx={iconSx} />}
    </ToggleButton>
  )
}

interface Props {
  task: TaskSummary
  borderColor: string
}

const TaskCell: React.FC<Props> = ({ task, borderColor }: Props) => {
  const { cellWidth } = getTaskTableStore()
  const {
    titleCellWidth,
    boardCellWidth,
    endDateCellWidth,
    taskManagerCellWidth,
  } = cellWidth

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          border: "1px solid",
          borderColor,
          marginY: "-1px",
          marginX: "-1px",
        }}
      >
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
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          {task.taskId}
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
            fontWeight: 400,
          }}
        >
          <Box flexGrow={1}>{task.title}</Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ marginRight: 1 }}>
              <BookmarkButton selected={task.bookmark} />
            </Box>
          </Box>
        </Box>
        <Box
          key={task.board.boardId}
          sx={{
            width: boardCellWidth,
            paddingX: 1,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          <Chip label={task.board.name} color="primary" size="small" />
        </Box>
        <Box
          sx={{
            width: endDateCellWidth,
            paddingX: 1,
            paddingY: 1,
            color: "gray",
            fontSize: 12,
            border: "1px solid",
            borderColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginY: "-1px",
            marginLeft: "-1px",
          }}
        >
          ~ {task.endDate}
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
          <Box>
            <Avatar sx={{ width: 26, height: 26 }} />
          </Box>
          <Box sx={{ marginLeft: 1, fontSize: 14 }}>
            {task.taskManager.name}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default TaskCell
