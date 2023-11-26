import React from "react"
import { ErrorResponse } from "api"
import { modifyTaskApi, ModifyTaskRequestBody } from "api/task"
import { TaskDetail } from "_types/task"
import { useAlert } from "hooks/useAlert"
import axios from "axios"

interface Props {
  workspaceId: number
  projectId: number
  taskId: number
}

const useModifyTask = ({ workspaceId, projectId, taskId }: Props) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess, addError } = useAlert()

  const fetch = async (modifiedTask: TaskDetail) => {
    if (!modifiedTask.title) {
      addError("제목을 입력해주세요")
      return
    }

    if (!modifiedTask.board) {
      addError("보드를 선택해주세요")
      return
    }

    try {
      setIsFetching(true)
      const request: ModifyTaskRequestBody = {
        title: modifiedTask.title,
        content: modifiedTask.content,
        boardId: modifiedTask.board.boardId,
        startDate: modifiedTask.startDate,
        endDate: modifiedTask.endDate,
        taskManagerId: modifiedTask.taskManager?.projectParticipantId,
        emergency: modifiedTask.emergency,
        progressStatus: modifiedTask.progressStatus,
      }
      await modifyTaskApi(workspaceId, projectId, taskId, request)
      addSuccess("할 일을 수정했습니다.")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { fetch, isFetching, error }
}

export default useModifyTask