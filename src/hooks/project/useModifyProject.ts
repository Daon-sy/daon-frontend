import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { modifyProjectApi, ModifyWorkspaceRequestBody } from "api/project"
import { getProjectsStore } from "store/userStore"
import { Project } from "_types/project"
import { useAlert } from "hooks/useAlert"

const useModifyProject = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { addSuccess } = useAlert()
  const { projects, setProjects } = getProjectsStore()

  const fetch = async (
    {
      workspaceId,
      projectId,
      data,
    }: {
      workspaceId: number
      projectId: number
      data: ModifyWorkspaceRequestBody
    },
    callback?: () => void,
  ) => {
    try {
      setIsFetching(true)
      await modifyProjectApi(workspaceId, projectId, { ...data })
      setProjects([
        ...projects.map(p => {
          if (p.projectId !== projectId) return p
          return {
            projectId,
            ...data,
          } as Project
        }),
      ])
      addSuccess("프로젝트 정보 수정 완료")
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

export default useModifyProject
