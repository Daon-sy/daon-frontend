import React from "react"
import { Box, Button } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { TaskReplyDetail } from "_types/task"
import { taskReplyListApi, modifyTaskReply } from "api/task"
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
  const [replySlice, setReplySlice] = React.useState({
    first: true,
    last: false,
    page: 0,
  })
  const fetchReplyList = async (page = 0, size = 3) => {
    if (workspace?.workspaceId) {
      const { data } = await taskReplyListApi(
        workspace.workspaceId,
        projectId,
        taskId,
        { page, size },
      )
      const { first, last, pageNumber, content } = data

      setReplies(
        [...content, ...replies]
          .filter(
            (r, i, arr) =>
              i === arr.findIndex(loc => loc.replyId === r.replyId),
          )
          .sort((h1, h2) => -(h1.replyId - h2.replyId)),
      )

      setReplySlice({
        first,
        last,
        page: pageNumber,
      })
    }
  }
  const handleReplyChanged = React.useCallback(() => {
    fetchReplyList()
  }, [fetchReplyList])

  const handleDeleteChanged = (replyId: number) => {
    setReplies(replies.filter(r => r.replyId !== replyId))
  }

  const handleModifyChanged = async (
    replyId: number,
    modifiedContent: string,
  ) => {
    if (workspace?.workspaceId) {
      await modifyTaskReply(workspace.workspaceId, projectId, taskId, replyId, {
        content: modifiedContent,
      })
      const updatedReplies = replies.map(reply => {
        if (reply.replyId === replyId) {
          return {
            ...reply,
            content: modifiedContent,
          }
        }
        return reply
      })

      setReplies(updatedReplies)
    }
  }

  React.useEffect(() => {
    fetchReplyList()
  }, [])

  return (
    <Box component="section" sx={{ width: "100%" }}>
      <TaskReplyInput
        workspaceId={workspace?.workspaceId}
        projectId={projectId}
        taskId={taskId}
        onReplyAdded={handleReplyChanged}
      />
      <Box component="ul">
        {replies.map(reply => (
          <TaskReplyItem
            key={reply.replyId}
            workspaceId={workspace?.workspaceId}
            projectId={projectId}
            taskId={taskId}
            reply={reply}
            onReplyModified={(replyId: number, modifiedContent: string) =>
              handleModifyChanged(reply.replyId, modifiedContent)
            }
            onReplyDeleted={() => handleDeleteChanged(reply.replyId)}
          />
        ))}
        <Button
          onClick={async () => {
            await fetchReplyList(replySlice.page + 1)
          }}
          sx={{
            width: "100%",
            textAlign: "center",
            ...(replySlice.last && { display: "none" }),
          }}
        >
          더보기
        </Button>
      </Box>
    </Box>
  )
}

export default TaskReply
