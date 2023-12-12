import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { logoutApi } from "api/auth"
import { useAlert } from "hooks/useAlert"
import { getTokenStore } from "store/tokenStore"
import {
  getMyMemberDetailStore,
  getMyWorkspaceIdStore,
  getProjectsStore,
  getProjectStore,
  getWorkspaceListStore,
  getWorkspaceStore,
} from "store/userStore"

const useLogout = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()

  const { clear: clearToken } = getTokenStore()
  const { clear: clearMyMemberDetail } = getMyMemberDetailStore()
  const { clear: clearWorkspaceDetail } = getWorkspaceStore()
  const { clear: clearProjectDetail } = getProjectStore()
  const { clear: clearProjects } = getProjectsStore()
  const { setWorkspaceList } = getWorkspaceListStore()
  const { setMyWorkspaceId } = getMyWorkspaceIdStore()

  const fetch = async (callback?: () => void) => {
    try {
      setIsFetching(true)
      await logoutApi()
      clearToken()
      clearMyMemberDetail()
      clearWorkspaceDetail()
      clearProjectDetail()
      clearProjects()
      setWorkspaceList([])
      setMyWorkspaceId(undefined)
      addSuccess("로그아웃 완료")
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

export default useLogout
