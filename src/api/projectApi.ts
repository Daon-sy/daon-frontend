import { authAxios } from "api/index"

export interface CreateProjectResponse {
  projectId: number
}

export interface CreateProjectRequest {
  projectName: string
  description: string | null
}

export const createProjectApi = async (request: CreateProjectRequest) => {
  return authAxios.post("/api/projects", request)
}
