import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { removeWorkspaceNoticeApi } from "api/workspaceNotice"
import { useAlert } from "hooks/useAlert"
import useFetchWorkspaceNoticeList from "./useFetchWorkspaceNoticeList"

const useRemoveWorkspaceNotice = (workspaceId: number, noticeId: number) => {
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const { fetchWorkspaceNoticeList } = useFetchWorkspaceNoticeList(workspaceId)

  const removeNotice = async () => {
    try {
      await removeWorkspaceNoticeApi(workspaceId, noticeId)
      addSuccess("공지사항이 삭제되었습니다.")
      fetchWorkspaceNoticeList()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    }
  }

  return { removeNotice, error }
}

export default useRemoveWorkspaceNotice
