import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { workspaceNoticeListApi } from "api/workspaceNotice"
import { getWorkspaceNoticesStore } from "store/userStore"

const useFetchWorkspaceNoticeList = (
  workspaceId: number,
  callback?: () => void,
  page = 1,
  size = 4,
) => {
  const { workspaceNotices, setWorkspaceNotices } = getWorkspaceNoticesStore()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [paginationInfo, setPaginationInfo] = React.useState({
    first: true,
    last: true,
    pageNumber: 0,
    totalPage: 0,
  })

  const fetchWorkspaceNoticeList = async (fetchPage?: number) => {
    try {
      setIsFetching(true)
      if (callback) callback()
      const { data } = await workspaceNoticeListApi(workspaceId, {
        page: fetchPage,
        size,
      })
      const { first, last, pageNumber, content, totalPage } = data
      setWorkspaceNotices(content)
      setPaginationInfo({ first, last, pageNumber, totalPage })
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
  }, [workspaceId, page, size])

  const memoizedWorkspaceNotices = React.useMemo(
    () => workspaceNotices,
    [workspaceNotices],
  )

  return {
    workspaceNotices: memoizedWorkspaceNotices,
    fetchWorkspaceNoticeList,
    isFetching,
    error,
    paginationInfo,
  }
}

export default useFetchWorkspaceNoticeList
