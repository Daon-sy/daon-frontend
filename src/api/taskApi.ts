import { ApiResponse, authAxios } from "api/index"
import { TASK_STATUS, TaskDetail, TaskSummary } from "_types/TaskType"

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

export const taskDetailApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
) => {
  return authAxios.get<ApiResponse<TaskDetail>>(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
  )
}

export interface ModifyTaskRequest {
  title: string
  content?: string | undefined
  boardId?: number | undefined
  startDate?: string | undefined
  endDate?: string | undefined
  taskManagerId?: number | undefined
  emergency: boolean
  progressStatus: TASK_STATUS
}

export const modifyTaskApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  request: ModifyTaskRequest,
) => {
  return authAxios.put<ApiResponse>(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    request,
  )
}

export interface TaskListResponse {
  totalCount: number
  tasks: Array<TaskSummary>
}

export const taskListApi = async (workspaceId: number, projectId: number) => {
  return authAxios.get<ApiResponse<TaskListResponse>>(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks`,
  )
}
