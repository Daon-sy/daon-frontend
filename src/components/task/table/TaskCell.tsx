import React from "react"
import { Chip, Stack, Box, Tooltip } from "@mui/material"
import { TaskSummary } from "_types/task"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTableStore } from "store/taskTableStore"
import TaskBookmarkButton from "components/task/TaskBookmarkButton"
import useHandleBookmark from "hooks/task/useHandleBookmark"
import Typography from "@mui/material/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"
import ColorAvatar from "components/common/ColorAvatar"

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
    const { bookmarked: handleBookmarkResponse, handleBookmark } =
      useHandleBookmark({
        workspaceId: workspace?.workspaceId || 0,
        projectId: task.project.projectId,
        boardId: task.board?.boardId || 0,
        taskId: task.taskId,
      })
    const [bookmarked, setBookmarked] = React.useState(false)
    React.useEffect(() => {
      setBookmarked(task.bookmark || false)
    }, [task])
    React.useEffect(() => {
      if (typeof handleBookmarkResponse === "boolean")
        setBookmarked(handleBookmarkResponse)
    }, [handleBookmarkResponse])

    return (
      <Box>
        <Stack
          direction="row"
          sx={{
            bgcolor: task.emergency ? "lightRed.main" : "background.default",
            border: "1px solid",
            borderColor,
            marginY: "-1px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() =>
            setTaskDetailParam({
              workspaceId: workspace?.workspaceId || 0,
              projectId: task.project.projectId,
              boardId: task.board?.boardId || 0,
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
            <Box flexGrow={1} sx={{ fontSize: 14, fontWeight: "bold" }}>
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
              <Tooltip title={`프로젝트명: ${task.board?.title}`}>
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
                    // maxWidth: 80,
                  }}
                />
              </Tooltip>
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
            <Tooltip title={`보드명: ${task.board?.title}`}>
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
                  // maxWidth: 100,
                }}
              />
            </Tooltip>
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
              marginY: "-1px",
              marginLeft: "-1px",
            }}
          >
            {task.endDate ? (
              <Tooltip title={`마감일: ${task.endDate}`}>
                <Typography sx={{ fontSize: 12 }}>{task.endDate}</Typography>
              </Tooltip>
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
                  <ColorAvatar
                    id={task.taskManager.projectParticipantId}
                    src={task.taskManager.imageUrl}
                    sx={{ width: 16, height: 16 }}
                  />
                </Box>
                <Tooltip title={`담당자: ${task.taskManager?.name}`}>
                  <Box
                    sx={{
                      marginLeft: 1 / 4,
                      fontSize: 12,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {task.taskManager?.name}
                  </Box>
                </Tooltip>
              </>
            ) : null}
          </Box>
        </Stack>
      </Box>
    )
  },
)

export default TaskCell
