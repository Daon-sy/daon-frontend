import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { workspaceNoticeListApi } from "api/workspaceNotice"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"

const useFetchWorkspaceNoticeList = (workspaceId: number) => {
  const [workspaceNotices, setWorkspaceNotices] = React.useState<
    WorkspaceNoticeDetail[]
  >([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchWorkspaceNoticeList = async () => {
    try {
      setIsFetching(true)
      const { data } = await workspaceNoticeListApi(workspaceId)
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

  return { workspaceNotices, fetchWorkspaceNoticeList, isFetching, error }
}

export default useFetchWorkspaceNoticeList
