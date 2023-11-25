import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { taskHistoryApi } from "api/task"
import { TaskHistory } from "_types/task"

const useFetchTaskHistory = (
  {
    workspaceId,
    projectId,
    taskId,
  }: {
    workspaceId: number
    projectId: number
    taskId: number
  },
  skip = false,
) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [isFirst, setIsFirst] = React.useState(true)
  const [isLast, setIsLast] = React.useState(true)
  const [page, setPage] = React.useState(-1)
  const [taskHistories, setTaskHistories] = React.useState<Array<TaskHistory>>(
    [],
  )
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchHistories = async () => {
    setIsFetching(true)

    try {
      const { data } = await taskHistoryApi(workspaceId, projectId, taskId, {
        page: page + 1,
      })
      const { first, last, pageNumber, content } = data
      setIsFirst(first)
      setIsLast(last)
      setPage(pageNumber)

      setTaskHistories(
        [...content, ...taskHistories]
          .filter(
            (h, i, arr) => i === arr.findIndex(loc => loc.revId === h.revId),
          )
          .sort((h1, h2) => -(h1.revId - h2.revId)),
      )
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  const fetchTopHistory = async () => {
    try {
      const { data } = await taskHistoryApi(workspaceId, projectId, taskId)
      const { content } = data
      if (content.length > 0) {
        setTaskHistories(
          [content[0], ...taskHistories]
            .filter(
              (h, i, arr) => i === arr.findIndex(loc => loc.revId === h.revId),
            )
            .sort((h1, h2) => -(h1.revId - h2.revId)),
        )
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    }
  }

  React.useEffect(() => {
    if (skip) return
    fetchHistories()
  }, [])

  return {
    fetchHistories,
    fetchTopHistory,
    taskHistories,
    isFirst,
    isLast,
    isFetching,
    error,
  }
}

export default useFetchTaskHistory
