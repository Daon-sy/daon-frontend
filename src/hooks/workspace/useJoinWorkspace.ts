import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { joinWorkspaceApi, JoinWorkspaceRequestBody } from "api/workspace"
import { useAlert } from "hooks/useAlert"

const useJoinWorkspace = (callback?: () => void) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const navigate = useNavigate()
  const { addSuccess } = useAlert()

  const fetch = async (
    workspaceId: number,
    requestBody: JoinWorkspaceRequestBody,
  ) => {
    try {
      setIsFetching(true)
      await joinWorkspaceApi(workspaceId, requestBody)
      addSuccess("워크스페이스 참여 성공")

      if (callback) callback()

      navigate(`/workspace/${workspaceId}`)
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

export default useJoinWorkspace
