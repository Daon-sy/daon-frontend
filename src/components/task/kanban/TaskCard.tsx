import React from "react"
import { Avatar, Box, Card, Chip, ToggleButton } from "@mui/material"
import { TaskSummary } from "_types/task"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import Tooltip from "@mui/material/Tooltip"

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

// 북마크 버튼 아이콘
interface BookmarkButtonProps {
  selected: boolean
}

const BookmarkButton = ({ selected }: BookmarkButtonProps) => {
  const iconSx = {
    fontSize: 20,
  }

  return (
    <Tooltip title="북마크" arrow>
      <ToggleButton
        value="check"
        selected={false}
        sx={{
          padding: 0.5,
          borderStyle: "none",
        }}
      >
        {selected ? (
          <BookmarkIcon sx={{ ...iconSx, color: "#82b89b" }} />
        ) : (
          <BookmarkBorderIcon sx={iconSx} />
        )}
      </ToggleButton>
    </Tooltip>
  )
}

interface Props {
  task: TaskSummary
}

const TaskCard: React.FC<Props> = React.memo(({ task }: Props) => {
  const [detailModalOpen, setDetailModalOpen] = React.useState(false)

  return (
    <>
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
          onClick={() => setDetailModalOpen(true)}
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
                <BookmarkButton selected={task.bookmark} />
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
      {detailModalOpen ? (
        <TaskDetailModal
          projectId={task.project.projectId}
          taskId={task.taskId}
          open={detailModalOpen}
          handleClose={() => setDetailModalOpen(false)}
        />
      ) : null}
    </>
  )
})
export default TaskCard
