import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { workspaceListApi } from "api/workspace"
import { Workspace } from "_types/workspace"
import { getMyWorkspaceIdStore } from "store/userStore"

const useFetchWorkspaceList = (skip = false) => {
  const [workspaces, setWorkspaces] = React.useState<Workspace[]>([])
  const [isFetching, setIsFetching] = React.useState(false)
  const { setMyWorkspaceId } = getMyWorkspaceIdStore()
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchWorkspaceList = async () => {
    try {
      setIsFetching(true)
      const { data } = await workspaceListApi()
      const fetchedWorkspaces = data.workspaces
      setWorkspaces(data.workspaces)

      const personalWorkspace = fetchedWorkspaces.find(
        workspace => workspace.division === "PERSONAL",
      )
      if (personalWorkspace) {
        setMyWorkspaceId(personalWorkspace?.workspaceId)
      }
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
    fetchWorkspaceList()
  }, [])

  return { workspaces, fetchWorkspaceList, isFetching, error }
}

export default useFetchWorkspaceList
