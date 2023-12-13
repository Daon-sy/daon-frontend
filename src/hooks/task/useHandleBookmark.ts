import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { taskBookmarkApi } from "api/task"
import { useAlert } from "hooks/useAlert"

interface Props {
  workspaceId: number
  projectId: number
  taskId: number
}

const useHandleBookmark = ({ workspaceId, projectId, taskId }: Props) => {
  const [bookmarked, setBookmarked] = React.useState<boolean>()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()

  const handleBookmark = async () => {
    try {
      setIsFetching(true)
      const { data } = await taskBookmarkApi(workspaceId, projectId, taskId)
      const { created } = data
      console.log(created)
      setBookmarked(created)
      addSuccess(created ? "북마크 등록" : "북마크 취소")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { bookmarked, handleBookmark, isFetching, error }
}

export default useHandleBookmark
