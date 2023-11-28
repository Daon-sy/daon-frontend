import React from "react"
import Box from "@mui/material/Box"
import useInputs from "hooks/useInputs"
import { useAlert } from "hooks/useAlert"
import { addTaskReply } from "api/task"
import { FormHelperText, TextField } from "@mui/material"

interface TaskReplyProps {
  workspaceId: number | undefined
  projectId: number
  taskId: number
  onReplyAdded: () => void
}

interface TaskReply {
  content: string
}

const initialState: TaskReply = {
  content: "",
}

const TaskReplyInput: React.FC<TaskReplyProps> = ({
  workspaceId,
  projectId,
  taskId,
  onReplyAdded,
}: TaskReplyProps) => {
  const [data, onChange, resetData] = useInputs<TaskReply>(initialState)
  const { addError } = useAlert()

  const createReplyBtn = () => {
    if (!workspaceId) return
    if (data.content.length === 0) {
      addError("댓글 내용은 필수 입력 값입니다")

      return
    }

    addTaskReply(workspaceId, projectId, taskId, data).then(() => {
      resetData()
      onReplyAdded()
    })
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box component="div" sx={{ height: "100%", width: "90%" }}>
        <TextField
          required
          placeholder="댓글을 입력해주세요"
          name="content"
          value={data.content}
          onChange={onChange}
          inputProps={{ maxLength: 500 }}
          sx={{
            height: "90%",
            width: "100%",
          }}
        />
        <FormHelperText sx={{ textAlign: "end" }}>
          {`${data.content?.length}/500자`}
        </FormHelperText>
      </Box>
      <Box
        component="input"
        type="button"
        value="입력"
        onClick={createReplyBtn}
        sx={{ position: "relative", height: "50px", top: "-10px" }}
      />
    </Box>
  )
}

export default TaskReplyInput
