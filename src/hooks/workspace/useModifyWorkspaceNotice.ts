import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { useAlert } from "hooks/useAlert"
import {
  ModifyWorkspaceNoticeRequestBody,
  modifyWorkspaceNoticeApi,
} from "api/workspaceNotice"
// import useFetchWorkspaceNoticeDetail from "./useFetchWorkspaceNoticeDetail"
import useFetchWorkspaceNoticeList from "./useFetchWorkspaceNoticeList"

const useModifyWorkspaceNotice = (workspaceId: number, noticeId: number) => {
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const { fetchWorkspaceNoticeList } = useFetchWorkspaceNoticeList(workspaceId)
  // const { fetchWorkspaceNoticeDetail } = useFetchWorkspaceNoticeDetail(
  //   workspaceId,
  //   noticeId,
  // )
  const fetchModifyWorkspaceNotice = async (
    requestBody: ModifyWorkspaceNoticeRequestBody,
  ) => {
    try {
      await modifyWorkspaceNoticeApi(workspaceId, noticeId, requestBody)
      addSuccess("공지사항이 수정되었습니다.")
      // fetchWorkspaceNoticeDetail()
      fetchWorkspaceNoticeList()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    }
  }
  return { fetchModifyWorkspaceNotice, error }
}
export default useModifyWorkspaceNotice
