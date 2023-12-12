import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { WorkspaceParticipant } from "_types/workspace"
import { workspaceParticipantListApi } from "api/workspace"

const useFetchWorkspaceParticipants = (workspaceId: number, skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [workspaceParticipants, setWorkspaceParticipants] =
    React.useState<WorkspaceParticipant[]>()

  const fetch = async () => {
    try {
      setIsFetching(true)
      const { data: responseData } =
        await workspaceParticipantListApi(workspaceId)
      const { workspaceParticipants: respWorkspaceParticipants } = responseData
      setWorkspaceParticipants(respWorkspaceParticipants)
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
    fetch()
  }, [])

  return { workspaceParticipants, fetch, isFetching, error }
}

export default useFetchWorkspaceParticipants
