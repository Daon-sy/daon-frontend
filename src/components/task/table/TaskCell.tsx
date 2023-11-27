import React from "react"
import { Avatar, Chip, Stack, Box } from "@mui/material"
import { TaskSummary } from "_types/task"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTableStore } from "store/taskTableStore"
import TaskBookmarkButton from "components/task/TaskBookmarkButton"
import useHandleBookmark from "hooks/task/useHandleBookmark"

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

  const { workspace } = getWorkspaceStore()
  const { setTaskDetailParam } = getTaskDetailViewStore()
  const { bookmarked, handleBookmark } = useHandleBookmark(
    {
      workspaceId: workspace?.workspaceId || 0,
      projectId: task.project.projectId,
      taskId: task.taskId,
    },
    task.bookmark,
  )

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          border: "1px solid",
          borderColor,
          marginY: "-1px",
          marginX: "-1px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() =>
          setTaskDetailParam({
            workspaceId: workspace?.workspaceId || 0,
            projectId: task.project.projectId,
            taskId: task.taskId,
          })
        }
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
              <TaskBookmarkButton
                bookmarked={bookmarked}
                handleClick={handleBookmark}
              />
            </Box>
          </Box>
        </Box>
        <Box
          key={task.board?.boardId}
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
          <Chip label={task.board?.title} color="primary" size="small" />
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
            {task.taskManager?.name}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default TaskCell
