import {
  TASK_STATUS,
  TaskDetail,
  TaskHistory,
  TaskReplyDetail,
  TaskSummary,
} from "_types/task"
import { AxiosResponse } from "axios"
import { authAxios, SliceResponse } from "api"

// Request
export interface CreateTaskRequestBody {
  title: string
  content?: string
  boardId: number
  startDate?: string
  endDate?: string
  taskManagerId?: number
  emergency: boolean
}

export interface ModifyTaskRequestBody {
  title: string
  content?: string
  boardId: number
  startDate?: string
  endDate?: string
  taskManagerId?: number
  emergency: boolean
  progressStatus: TASK_STATUS
}

// Response
export interface CreateTaskResponseBody {
  taskId: number
}

export interface TaskListResponseBody {
  totalCount: number
  tasks: Array<TaskSummary>
}

export type TaskDetailResponseBody = TaskDetail

export interface taskReplyListResponseBody {
  data: Array<TaskReplyDetail>
}

// API
// 할 일 생성
export const createTaskApi = async (
  workspaceId: number,
  projectId: number,
  request: CreateTaskRequestBody,
): Promise<AxiosResponse<CreateTaskResponseBody>> => {
  return authAxios.post(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    request,
  )
}

// 할 일 목록 조회
export const taskListApi = (
  workspaceId: number,
  params?: {
    projectId?: number
    boardId?: number
    bookmarked?: boolean
    my?: boolean
  },
): Promise<AxiosResponse<TaskListResponseBody>> => {
  // `/api/workspaces/${workspaceId}/projects/tasks`
  return authAxios.get(`/api/workspaces/${workspaceId}/projects/tasks`, {
    params,
  })
}

// 할 일 단건 조회
export const taskDetailApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
): Promise<AxiosResponse<TaskDetailResponseBody>> => {
  return authAxios.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
  )
}

// 할 일 수정
export const modifyTaskApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  requestBody: ModifyTaskRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.put(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    requestBody,
  )
}

// 할 일 상태 수정
export const modifyTaskProgressStatusApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  requestBody: { progressStatus: TASK_STATUS },
) => {
  return authAxios.patch(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    requestBody,
  )
}

// 할 일 삭제
export const removeTaskApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
  )
}

// 할 일 북마크
export const taskBookmarkApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
): Promise<AxiosResponse<{ created: boolean }>> => {
  return authAxios.post(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/bookmark`,
  )
}

// 할 일 히스토리 조회
export const taskHistoryApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  param: {
    page?: number
    size?: number
  } = {
    page: 0,
    size: 10,
  },
): Promise<AxiosResponse<SliceResponse<TaskHistory>>> => {
  return authAxios.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/history`,
    { params: param },
  )
}

// 댓글 목록 조회
export const taskReplyListApi = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  params?: {
    page?: number
    size?: number
  },
): Promise<AxiosResponse<taskReplyListResponseBody>> => {
  return authAxios.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/reply`,
    { params },
  )
}

// 댓글 작성
export const addTaskReply = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  requestBody: { content: string },
): Promise<AxiosResponse> => {
  return authAxios.post(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/reply`,
    requestBody,
  )
}

// 댓글 수정
export const modifyTaskReply = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  replyId: number,
  requestBody: { content: string },
): Promise<AxiosResponse> => {
  return authAxios.put(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/reply/${replyId}`,
    requestBody,
  )
}

// 댓글 삭제
export const removeTaskReply = async (
  workspaceId: number,
  projectId: number,
  taskId: number,
  replyId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `/api/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/reply/${replyId}`,
  )
}
