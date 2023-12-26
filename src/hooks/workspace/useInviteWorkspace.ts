import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { inviteWorkspace } from "api/workspace"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import { useAlert } from "hooks/useAlert"

const useInviteWorkspace = (workspaceId: number) => {
  const { addSuccess } = useAlert()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetch = async (username: string, role: WORKSPACE_PARTICIPANT_ROLE) => {
    try {
      setIsFetching(true)
      await inviteWorkspace(workspaceId, { username, role })
      addSuccess("사용자 초대 완료")
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

export default useInviteWorkspace
