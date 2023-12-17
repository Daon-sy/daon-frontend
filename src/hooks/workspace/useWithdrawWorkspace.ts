import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { useAlert } from "hooks/useAlert"
import { getMyWorkspaceIdStore, getWorkspaceListStore } from "store/userStore"
import { withdrawWorkspaceApi } from "api/workspace"

interface Props {
  workspaceId: number
}

const useWithdrawWorkspace = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const navigate = useNavigate()
  const { workspaceList, setWorkspaceList } = getWorkspaceListStore()
  const { myWorkspaceId } = getMyWorkspaceIdStore()

  const fetch = async ({ workspaceId }: Props, callback?: () => void) => {
    try {
      setIsFetching(true)
      await withdrawWorkspaceApi(workspaceId)
      setWorkspaceList([
        ...workspaceList.filter(ws => ws.workspaceId !== workspaceId),
      ])
      addSuccess("워크스페이스에서 탈퇴하였습니다")
      // 개인 워크스페이스로 이동
      navigate(`/workspace/${myWorkspaceId}`)
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

export default useWithdrawWorkspace
