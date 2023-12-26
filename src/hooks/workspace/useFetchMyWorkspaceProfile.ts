import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { myWorkspaceParticipantDetailApi } from "api/workspace"
import { getWorkspaceStore } from "store/userStore"

const useFetchMyWorkspaceProfile = (workspaceId: number, skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { myProfile, setMyProfile } = getWorkspaceStore()

  const fetchMyWorkspaceProfile = async () => {
    try {
      setIsFetching(true)
      const { data } = await myWorkspaceParticipantDetailApi(workspaceId)
      setMyProfile(data)
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
    fetchMyWorkspaceProfile()
  }, [])

  return {
    myWorkspaceProfile: myProfile,
    fetchMyWorkspaceProfile,
    isFetching,
    error,
  }
}

export default useFetchMyWorkspaceProfile
