import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { workspaceDetailApi } from "api/workspace"
import { getWorkspaceStore } from "store/userStore"

const useFetchWorkspaceDetail = (workspaceId: number, skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { workspace, setWorkspace } = getWorkspaceStore()

  const fetchWorkspaceDetail = async () => {
    try {
      setIsFetching(true)
      const { data } = await workspaceDetailApi(workspaceId)
      setWorkspace(data)
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
    fetchWorkspaceDetail()
  }, [])

  return { workspaceDetail: workspace, fetchWorkspaceDetail, isFetching, error }
}

export default useFetchWorkspaceDetail
