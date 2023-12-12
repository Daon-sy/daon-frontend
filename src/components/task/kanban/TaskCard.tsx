import React from "react"
import { Avatar, Box, Card, Chip, Stack } from "@mui/material"
import CommentIcon from "@mui/icons-material/Comment"
import { getWorkspaceStore } from "store/userStore"
import TaskBookmarkButton from "components/task/TaskBookmarkButton"
import useHandleBookmark from "hooks/task/useHandleBookmark"
import { TaskSummary } from "_types/task"
import { getTaskDetailViewStore } from "store/taskStore"
import Typography from "@mui/material/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"
import ColorAvatar from "components/common/ColorAvatar"

interface Props {
  task: TaskSummary
  renderProject?: boolean
}

const TaskCard: React.FC<Props> = React.memo(
  ({ task, renderProject = false }: Props) => {
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
      <Box
        sx={{
          m: 1,
        }}
      >
        <Card
          key={task.taskId}
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: task.emergency ? "lightRed.main" : "background.default",
            borderRadius: 2,
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
          <Box sx={{ padding: 1, paddingX: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box flexGrow={1} key={task.board?.boardId}>
                {renderProject ? (
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
                      maxWidth: task.board ? 80 : 150,
                    }}
                  />
                ) : null}
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
                    maxWidth: renderProject ? 80 : 150,
                  }}
                />
              </Box>
              {task.emergency ? (
                <Typography
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: "24px",
                    position: "relative",
                    top: -1,
                  }}
                >
                  <FontAwesomeIcon icon={faFire} color="red" />
                </Typography>
              ) : null}
              <Box>
                <TaskBookmarkButton
                  bookmarked={bookmarked}
                  handleClick={handleBookmark}
                />
              </Box>
            </Box>
            <Box
              sx={{
                paddingTop: 1,
                fontSize: 16,
                fontWeight: "bold",
                wordBreak: "break-all",
                lineHeight: 1.2,
              }}
            >
              {task.title}
            </Box>
            <Box mt={1} color="gray">
              {task.endDate ? (
                <Typography sx={{ fontSize: 12 }}>
                  마감일: {task.endDate}
                </Typography>
              ) : null}
              <Box display="flex" alignItems="center" color="gray">
                <Box
                  flexGrow={1}
                  sx={{ display: "flex", alignItems: "center" }}
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
                <Box mt={task.endDate ? 0.5 : 0}>
                  <Stack alignItems="center" spacing={0.5} direction="row">
                    <CommentIcon sx={{ fontSize: 14 }} />
                    <Typography fontSize={12}>{task.replyCount}</Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    )
  },
)
export default TaskCard
