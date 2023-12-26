import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { searchMembersToInviteApi } from "api/workspace"

export interface Member {
  username: string
  name: string
  invited: boolean
}

const useSearchMembersToInvite = (workspaceId: number) => {
  const [members, setMembers] = React.useState<Member[]>([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetch = async (keyword: string) => {
    try {
      setIsFetching(true)
      const { data } = await searchMembersToInviteApi(workspaceId, keyword)
      setMembers(data.members)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  const clear = () => setMembers([])

  return { members, fetch, clear, isFetching, error }
}

export default useSearchMembersToInvite
