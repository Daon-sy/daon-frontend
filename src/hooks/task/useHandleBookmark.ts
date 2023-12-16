import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { taskBookmarkApi } from "api/task"
import { useAlert } from "hooks/useAlert"

interface Props {
  workspaceId: number
  projectId: number
  boardId: number
  taskId: number
}

const useHandleBookmark = ({
  workspaceId,
  projectId,
  boardId,
  taskId,
}: Props) => {
  const [bookmarked, setBookmarked] = React.useState<boolean>()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess, addError } = useAlert()

  const handleBookmark = async () => {
    try {
      setIsFetching(true)
      const { data } = await taskBookmarkApi(
        workspaceId,
        projectId,
        boardId,
        taskId,
      )
      const { created } = data
      setBookmarked(created)
      addSuccess(created ? "북마크 등록" : "북마크 취소")
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

  return { bookmarked, handleBookmark, isFetching, error }
}

export default useHandleBookmark
