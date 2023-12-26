import React from "react"
import { matchPath, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { withdrawProjectApi } from "api/project"
import { useAlert } from "hooks/useAlert"
import { getProjectsStore } from "store/userStore"

interface Props {
  workspaceId: number
  projectId: number
}

const useWithdrawProject = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const location = useLocation()
  const navigate = useNavigate()
  const { projects, setProjects } = getProjectsStore()

  const fetch = async (
    { workspaceId, projectId }: Props,
    callback?: () => void,
  ) => {
    try {
      setIsFetching(true)
      await withdrawProjectApi(workspaceId, projectId)
      setProjects([...projects.filter(p => p.projectId !== projectId)])
      addSuccess("프로젝트에서 탈퇴하였습니다")
      if (callback) callback()
      // 워크스페이스 메인 페이지로 이동
      if (
        matchPath(
          "/workspace/:workspaceId/project/:projectId/*",
          location.pathname,
        )
      ) {
        navigate(`/workspace/${workspaceId}`)
      }
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

export default useWithdrawProject
