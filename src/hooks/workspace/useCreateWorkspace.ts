import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { createWorkspaceApi, CreateWorkspaceRequestBody } from "api/workspace"
import { useAlert } from "hooks/useAlert"
import useFetchWorkspaceList from "hooks/workspace/useFetchWorkspaceList"

const useCreateWorkspace = (callback?: () => void) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const navigate = useNavigate()
  const { addSuccess } = useAlert()
  const { fetchWorkspaceList } = useFetchWorkspaceList(true)

  const fetch = async (requestBody: CreateWorkspaceRequestBody) => {
    try {
      setIsFetching(true)
      const { data } = await createWorkspaceApi(requestBody)
      const { workspaceId } = data
      fetchWorkspaceList()
      addSuccess("워크스페이스가 생성되었습니다")

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

export default useCreateWorkspace
