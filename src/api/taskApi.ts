import { ApiResponse, authAxios } from "api/index"

export interface CreateTaskRequest {
  title: string
  content?: string
  boardId?: number
  startDate?: string
  endDate?: string
  taskManagerId?: number
  emergency?: true | false
}

export interface CreateTaskResponse {
  taskId: number
}

export const createTaskApi = async (
  workspaceId: number,
  projectId: number,
  request: CreateTaskRequest,
) => {
  return authAxios.post<ApiResponse<CreateTaskResponse>>(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    request,
  )
}
