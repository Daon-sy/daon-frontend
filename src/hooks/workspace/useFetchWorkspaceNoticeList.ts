import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { workspaceNoticeListApi } from "api/workspaceNotice"
import { getWorkspaceNoticesStore } from "store/userStore"

const useFetchWorkspaceNoticeList = (
  workspaceId: number,
  callback?: () => void,
) => {
  const { workspaceNotices, setWorkspaceNotices } = getWorkspaceNoticesStore()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchWorkspaceNoticeList = async () => {
    try {
      setIsFetching(true)
      const { data } = await workspaceNoticeListApi(workspaceId)
      if (callback) callback()

      setWorkspaceNotices(data.workspaceNotices)
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
    fetchWorkspaceNoticeList()
  }, [workspaceId])

  const memoizedWorkspaceNotices = React.useMemo(
    () => workspaceNotices,
    [workspaceNotices],
  )

  return {
    workspaceNotices: memoizedWorkspaceNotices,
    fetchWorkspaceNoticeList,
    isFetching,
    error,
  }
}

export default useFetchWorkspaceNoticeList
