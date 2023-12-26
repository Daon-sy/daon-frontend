import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { createTaskApi, CreateTaskRequestBody } from "api/task"
import { useAlert } from "hooks/useAlert"

interface Props {
  workspaceId: number
}

const useCreateTask = ({ workspaceId }: Props, callback?: () => void) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess, addError } = useAlert()

  const fetch = async (projectId: number, data: CreateTaskRequestBody) => {
    try {
      if (!projectId || projectId === 0) {
        addError("프로젝트를 선택해주세요")
        return
      }

      if (!data.boardId || data.boardId === 0) {
        addError("보드를 선택하세요")
        return
      }

      if (!data.title) {
        addError("할 일 제목을 입력해주세요")
        return
      }

      setIsFetching(true)
      const { data: responseBody } = await createTaskApi(
        workspaceId,
        projectId,
        data.boardId,
        {
          ...data,
          title: data.title.length <= 20 ? data.title : data.title.slice(0, 20),
        },
      )
      const { taskId } = responseBody
      addSuccess(`할 일(#${taskId})이 생성되었습니다.`)

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

export default useCreateTask
