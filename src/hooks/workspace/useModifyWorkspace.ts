import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { modifyWorkspaceApi, ModifyWorkspaceRequestBody } from "api/workspace"
import { getWorkspaceListStore, getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import useFetchWorkspaceDetail from "hooks/workspace/useFetchWorkspaceDetail"
import { Workspace } from "../../_types/workspace"

const useModifyWorkspace = (workspaceId: number) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { setWorkspace } = getWorkspaceStore()
  const { workspaceList, setWorkspaceList } = getWorkspaceListStore()
  const { workspaceDetail, fetchWorkspaceDetail } = useFetchWorkspaceDetail(
    workspaceId,
    true,
  )
  const { addSuccess } = useAlert()

  const fetch = async (data: ModifyWorkspaceRequestBody) => {
    try {
      setIsFetching(true)
      await modifyWorkspaceApi(workspaceId, { ...data })
      addSuccess("워크스페이스 정보 수정 완료")
      fetchWorkspaceDetail()
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
    if (workspaceDetail) {
      setWorkspace(workspaceDetail)
      setWorkspaceList(
        workspaceList.map(ws => {
          if (ws.workspaceId === workspaceDetail.workspaceId) {
            return {
              workspaceId: workspaceDetail.workspaceId,
              title: workspaceDetail.title,
              subject: workspaceDetail.subject,
              description: workspaceDetail.description,
              division: workspaceDetail.division,
              imageUrl: workspaceDetail.imageUrl,
            } as Workspace
          }
          return ws
        }),
      )
    }
  }, [workspaceDetail])

  return { fetch, isFetching, error }
}

export default useModifyWorkspace
