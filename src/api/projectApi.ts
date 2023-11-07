import { authAxios } from "api/index"

export interface CreateProjectResponse {
  projectId: number
}

export interface CreateProjectRequest {
  projectName: string
  description: string | null
}

export const createProjectApi = async (request: CreateProjectRequest) => {
  try {
    const response = await authAxios.post<CreateProjectResponse>(
      "/api/projects",
      request,
    )

    return response
  } catch (error) {
    console.error("프로젝트 생성 API 오류:", error)
    throw error
  }
}
