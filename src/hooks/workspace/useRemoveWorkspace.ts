import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { useAlert } from "hooks/useAlert"
import { getMyWorkspaceIdStore, getWorkspaceListStore } from "store/userStore"
import { removeWorkspaceApi } from "api/workspace"

interface Props {
  workspaceId: number
}

const useRemoveWorkspace = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const navigate = useNavigate()
  const { workspaceList, setWorkspaceList } = getWorkspaceListStore()
  const { myWorkspaceId } = getMyWorkspaceIdStore()

  const fetch = async ({ workspaceId }: Props, callback?: () => void) => {
    try {
      setIsFetching(true)
      await removeWorkspaceApi(workspaceId)
      setWorkspaceList([
        ...workspaceList.filter(ws => ws.workspaceId !== workspaceId),
      ])
      addSuccess("워크스페이스가 삭제되었습니다")
      if (callback) callback()
      navigate(`/workspace/${myWorkspaceId}`)
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

export default useRemoveWorkspace
