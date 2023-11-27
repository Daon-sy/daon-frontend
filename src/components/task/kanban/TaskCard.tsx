import React from "react"
import { Avatar, Box, Card, Chip } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import TaskBookmarkButton from "components/task/TaskBookmarkButton"
import useHandleBookmark from "hooks/task/useHandleBookmark"
import { TaskSummary } from "_types/task"
import { getTaskDetailViewStore } from "store/taskStore"

// 긴급 태그 컴포넌트
interface EmergencyTagProps {
  render: boolean
}

const EmergencyTag = ({ render }: EmergencyTagProps) =>
  render ? (
    <Box
      sx={{
        backgroundColor: "rgb(255,41,41)",
        display: "inline-block",
        fontSize: 12,
        fontWeight: 500,
        color: "white",
        marginLeft: 1.5,
        paddingX: 2,
        paddingTop: 1,
        paddingBottom: 0.3,
        borderTopLeftRadius: 200,
        borderTopRightRadius: 200,
      }}
    >
      긴급
    </Box>
  ) : null

interface Props {
  task: TaskSummary
}

const TaskCard: React.FC<Props> = React.memo(({ task }: Props) => {
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
      <EmergencyTag render={task.emergency} />
      <Card
        key={task.taskId}
        variant="outlined"
        sx={{
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
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box flexGrow={1} key={task.board?.boardId}>
              <Chip label={task.board?.title} color="primary" size="small" />
            </Box>
            <Box>
              <TaskBookmarkButton
                bookmarked={bookmarked}
                handleClick={handleBookmark}
              />
            </Box>
          </Box>
          <Box
            sx={{
              paddingTop: 1.5,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {task.title}
          </Box>
          <Box
            sx={{
              paddingY: 1,
              color: "gray",
              fontSize: 12,
            }}
          >
            ~ {task.endDate}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {task.taskManager ? (
              <Box sx={{ height: 28 }}>
                <Avatar sx={{ width: 28, height: 28 }} />
              </Box>
            ) : null}
            <Box sx={{ marginLeft: 1 }}>{task.taskManager?.name}</Box>
          </Box>
        </Box>
      </Card>
    </Box>
  )
})
export default TaskCard
