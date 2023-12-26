import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { removeTaskApi } from "api/task"
import { useAlert } from "hooks/useAlert"

const useRemoveTask = (
  {
    workspaceId,
    projectId,
    boardId,
    taskId,
  }: {
    workspaceId: number
    projectId: number
    boardId: number
    taskId: number
  },
  callback?: () => void,
) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess, addError } = useAlert()

  const fetch = async () => {
    try {
      setIsFetching(true)
      await removeTaskApi(workspaceId, projectId, boardId, taskId)
      addSuccess("태스크를 삭제하였습니다")
      if (callback) callback()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        const errorResponse = response?.data as ErrorResponse
        setError(errorResponse)
        const { errorCode } = errorResponse
        if (errorCode === 5000) {
          addError("존재하지 않는 할 일 입니다")
        }
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { fetch, isFetching, error }
}

export default useRemoveTask
