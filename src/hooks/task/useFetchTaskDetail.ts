import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { taskDetailApi } from "api/task"
import { TaskDetail } from "_types/task"

const useFetchTaskDetail = (
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
  skip = false,
) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [taskDetail, setTaskDetail] = React.useState<
    TaskDetail | undefined | null
  >()
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchTaskDetail = async () => {
    setIsFetching(true)

    try {
      const { data } = await taskDetailApi(
        workspaceId,
        projectId,
        boardId,
        taskId,
      )
      setTaskDetail(data)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (skip) return
    fetchTaskDetail()
  }, [])

  return { taskDetail, fetchTaskDetail, isFetching, error }
}

export default useFetchTaskDetail
