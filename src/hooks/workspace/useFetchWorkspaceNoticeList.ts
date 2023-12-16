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
  keyword = "",
) => {
  const { workspaceNotices, setWorkspaceNotices } = getWorkspaceNoticesStore()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [paginationInfo, setPaginationInfo] = React.useState({
    first: true,
    last: true,
    pageNumber: 0,
    totalPage: 0,
    totalCount: 0,
  })

  const fetchWorkspaceNoticeList = async (
    fetchPage?: number,
    fetchKeyword?: string,
  ) => {
    try {
      setIsFetching(true)
      if (callback) callback()
      const { data } = await workspaceNoticeListApi(workspaceId, {
        page: fetchPage,
        size,
        keyword: fetchKeyword,
      })
      const {
        first,
        last,
        pageSize,
        pageNumber,
        contentSize,
        content,
        totalPage,
        totalCount,
      } = data
      setWorkspaceNotices(
        first,
        last,
        pageSize,
        pageNumber,
        contentSize,
        content,
        totalPage,
        totalCount,
      )
      setPaginationInfo({ first, last, pageNumber, totalPage, totalCount })
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
  }, [workspaceId, keyword, page, size])

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
