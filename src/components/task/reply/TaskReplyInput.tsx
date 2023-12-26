import React, { useState } from "react"
import Box from "@mui/material/Box"
import useInputs from "hooks/useInputs"
import { useAlert } from "hooks/useAlert"
import { addTaskReply } from "api/task"
import { FormHelperText, TextField } from "@mui/material"

interface TaskReplyProps {
  workspaceId: number | undefined
  projectId: number
  boardId: number
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
  boardId,
  taskId,
  onReplyAdded,
}: TaskReplyProps) => {
  const [data, onChange, resetData] = useInputs<TaskReply>(initialState)
  const { addSuccess, addError } = useAlert()
  const [isThrottling, setIsThrottling] = useState<boolean>(false)

  const createReply = () => {
    if (!workspaceId) return
    if (!data.content || data.content.trim().length === 0) {
      addError("댓글 내용은 필수 입력 값입니다")
      return
    }

    addTaskReply(workspaceId, projectId, boardId, taskId, data)
      .then(() => {
        addSuccess("댓글이 등록 되었습니다")
        resetData()
        onReplyAdded()
      })
      .catch(error => {
        addError("댓글 등록에 실패했습니다")
        console.error(error)
      })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()

      if (!isThrottling) {
        createReply()
        setIsThrottling(true)

        setTimeout(() => {
          setIsThrottling(false)
        }, 500)
      }
    }
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
      <Box component="div" sx={{ height: "100%", width: "100%" }}>
        <TextField
          required
          multiline
          maxRows={2}
          size="small"
          placeholder={
            "댓글 입력 후, 엔터키를 눌러주세요 😄\n◼ 줄바꿈은  shift+Enter를 입력해주세요"
          }
          name="content"
          value={data.content}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          inputProps={{ maxLength: 500 }}
          sx={{
            height: "100%",
            width: "100%",
          }}
        />
        <FormHelperText sx={{ textAlign: "end" }}>
          {`${data.content?.length}/500자`}
        </FormHelperText>
      </Box>
    </Box>
  )
}

export default TaskReplyInput
