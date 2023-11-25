import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { taskListApi } from "api/task"
import { TaskSummary } from "_types/task"

interface Props {
  workspaceId: number
  params?: {
    projectId?: number
    boardId?: number
    bookmarked?: boolean
    my?: boolean
  }
}

const useFetchTaskList = ({ workspaceId, params }: Props, skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [tasks, setTasks] = React.useState<TaskSummary[]>([])
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchTaskList = async () => {
    setIsFetching(true)

    try {
      const { data } = await taskListApi(workspaceId, params)
      setTasks(data.tasks)
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
    fetchTaskList()
  }, [])

  return { tasks, fetchTaskList, isFetching, error }
}

export default useFetchTaskList
