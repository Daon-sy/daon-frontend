import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ErrorResponse } from "api"
import { createProjectApi, CreateProjectRequestBody } from "api/project"
import { getProjectsStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"

interface Props {
  workspaceId: number
}

const useCreateProject = ({ workspaceId }: Props, callback?: () => void) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const navigate = useNavigate()
  const { addSuccess, addError } = useAlert()
  const { projects, setProjects } = getProjectsStore()
  const fetch = async (data: CreateProjectRequestBody) => {
    try {
      if (!data.title) {
        addError("프로젝트 제목은 필수입력 값입니다")
        return
      }

      setIsFetching(true)
      const { data: responseBody } = await createProjectApi(workspaceId, data)
      const { projectId } = responseBody

      addSuccess("프로젝트 생성 성공!")
      const newProject = {
        projectId,
        title: data.title,
        description: data.description,
      }
      setProjects([...projects, newProject])

      if (callback) callback()

      navigate(`/workspace/${workspaceId}/project/${projectId}`)
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

export default useCreateProject
