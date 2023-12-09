import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { workspaceNoticeDetailApi } from "api/workspaceNotice"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"

const useFetchWorkspaceNoticeDetail = (
  workspaceId: number,
  noticeId: number,
) => {
  const [workspaceNotice, setWorkspaceNotice] =
    React.useState<WorkspaceNoticeDetail>()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetchWorkspaceNoticeDetail = async () => {
    try {
      setIsFetching(true)
      const { data } = await workspaceNoticeDetailApi(workspaceId, noticeId)
      setWorkspaceNotice(data)
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
    fetchWorkspaceNoticeDetail()
  }, [workspaceId, noticeId])

  return { workspaceNotice, fetchWorkspaceNoticeDetail, isFetching, error }
}

export default useFetchWorkspaceNoticeDetail
