import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { createProjectBoardApi } from "api/project"
import { useAlert } from "hooks/useAlert"

interface Props {
  workspaceId: number
  projectId: number
  boardTitle: string
}

const useCreateBoard = ({ workspaceId, projectId, boardTitle }: Props) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess, addError } = useAlert()

  const fetch = async (callback?: () => void) => {
    if (!boardTitle) {
      addError("보드명을 입력해주세요")
      return
    }

    try {
      setIsFetching(true)
      await createProjectBoardApi(workspaceId, projectId, { title: boardTitle })
      addSuccess(`"${boardTitle}" 보드가 생성되었습니다`)
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

export default useCreateBoard
