import React from "react"
import { Avatar, Chip, Stack, Box } from "@mui/material"
import { TaskSummary } from "_types/task"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTableStore } from "store/taskTableStore"
import TaskBookmarkButton from "components/task/TaskBookmarkButton"
import useHandleBookmark from "hooks/task/useHandleBookmark"
import Typography from "@mui/material/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"

interface Props {
  task: TaskSummary
  borderColor: string
  renderProject?: boolean
}

const TaskCell: React.FC<Props> = React.memo(
  ({ task, borderColor, renderProject = false }: Props) => {
    const { cellWidth } = getTaskTableStore()
    const {
      titleCellWidth,
      boardCellWidth,
      projectCellWidth,
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
            bgcolor: task.emergency ? "lightRed.main" : "background.default",
            border: "1px solid",
            borderColor,
            marginY: "-1px",
            // marginX: "-1px",
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
              fontSize: 12,
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
            <Box flexGrow={1} sx={{ fontSize: 16, fontWeight: "bold" }}>
              <Box display="flex" alignItems="center">
                {task.emergency ? (
                  <Typography mr={0.5}>
                    <FontAwesomeIcon icon={faFire} color="red" />
                  </Typography>
                ) : null}
                {task.title}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ marginRight: 1 }}>
                <TaskBookmarkButton
                  bookmarked={bookmarked}
                  handleClick={handleBookmark}
                />
              </Box>
            </Box>
          </Box>
          {renderProject ? (
            <Box
              key={task.project?.projectId}
              sx={{
                width: projectCellWidth,
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
              <Chip
                label={task.project.title}
                color="secondary"
                size="small"
                sx={{
                  fontSize: 12,
                  borderRadius: 1.5,
                  mr: 1,
                  fontWeight: 900,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 80,
                }}
              />
            </Box>
          ) : null}
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
            <Chip
              label={task.board?.title}
              color="green"
              size="small"
              sx={{
                fontSize: 12,
                borderRadius: 1.5,
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 100,
              }}
            />
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
            {task.endDate ? (
              <Typography sx={{ fontSize: 12 }}>{task.endDate}</Typography>
            ) : null}
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
            {task.taskManager ? (
              <>
                <Box>
                  <Avatar sx={{ width: 16, height: 16 }} />
                </Box>
                <Box
                  sx={{
                    marginLeft: 0.5,
                    fontSize: 12,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.taskManager?.name}
                </Box>
              </>
            ) : null}
          </Box>
        </Stack>
      </Box>
    )
  },
)

export default TaskCell
