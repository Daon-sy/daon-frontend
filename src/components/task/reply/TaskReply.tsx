import React from "react"
import Box from "@mui/material/Box"
import { getWorkspaceStore } from "store/userStore"
import { TaskReplyDetail } from "_types/task"
import { taskReplyListApi } from "api/task"
import TaskReplyItem from "./TaskReplyItem"
import TaskReplyInput from "./TaskReplyInput"

interface TaskReplyProps {
  projectId: number
  taskId: number
}

const TaskReply: React.FC<TaskReplyProps> = ({
  projectId,
  taskId,
}: TaskReplyProps) => {
  const { workspace } = getWorkspaceStore()
  const [replies, setReplies] = React.useState<TaskReplyDetail[]>([])

  const fetchReplyList = async () => {
    if (workspace?.workspaceId) {
      try {
        const { data } = await taskReplyListApi(
          workspace.workspaceId,
          projectId,
          taskId,
        )
        setReplies(data.taskReplies)
      } catch (error) {
        console.error("Error fetching reply list:", error)
      }
    }
  }

  React.useEffect(() => {
    fetchReplyList()
  }, [replies.length])

  return (
    <Box component="section" sx={{ width: "100%" }}>
      <TaskReplyInput
        workspaceId={workspace?.workspaceId}
        projectId={projectId}
        taskId={taskId}
      />
      <Box component="ul">
        {replies.map(reply => (
          <TaskReplyItem
            key={reply.replyId}
            workspaceId={workspace?.workspaceId}
            projectId={projectId}
            taskId={taskId}
            reply={reply}
          />
        ))}
      </Box>
    </Box>
  )
}

export default TaskReply
