import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { removeTaskApi } from "api/task"
import { useAlert } from "hooks/useAlert"

const useRemoveTask = (
  {
    workspaceId,
    projectId,
    taskId,
  }: {
    workspaceId: number
    projectId: number
    taskId: number
  },
  callback?: () => void,
) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()

  const fetch = async () => {
    try {
      setIsFetching(true)
      await removeTaskApi(workspaceId, projectId, taskId)
      addSuccess("태스크를 삭제하였습니다")
      if (callback) callback()
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

export default useRemoveTask
