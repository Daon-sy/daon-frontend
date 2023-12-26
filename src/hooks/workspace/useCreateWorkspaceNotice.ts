import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import {
  createWorkspaceNoticeApi,
  CreateWorkspaceNoticeRequestBody,
} from "api/workspaceNotice"
import { useAlert } from "hooks/useAlert"
import useFetchWorkspaceNoticeList from "./useFetchWorkspaceNoticeList"

const useCreateWorkspaceNotice = (workspaceId: number) => {
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const [createNoticeId, setCreateNoticeId] = React.useState<number | null>()
  const { fetchWorkspaceNoticeList } = useFetchWorkspaceNoticeList(workspaceId)

  const fetchCreateWorkspaceNotice = async (
    data: CreateWorkspaceNoticeRequestBody,
  ) => {
    try {
      const { data: responseBody } = await createWorkspaceNoticeApi(
        workspaceId,
        data,
      )
      const { noticeId } = responseBody
      setCreateNoticeId(noticeId)
      addSuccess("공지사항이 생성되었습니다.")
      fetchWorkspaceNoticeList()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    }
  }

  return { fetchCreateWorkspaceNotice, error, createNoticeId }
}

export default useCreateWorkspaceNotice
