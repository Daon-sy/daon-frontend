import { ApiResponse, authAxios } from "api/index"
import { Project, Board, ProjectParticipant } from "_types/ProjectType"

export interface CreateProjectResponse {
  projectId: number
}

export interface CreateProjectRequest {
  projectName: string
  projectDescription: string | null
}

export const createProjectApi = async (request: CreateProjectRequest) => {
  return authAxios.post<CreateProjectResponse>("/api/projects", request)
}

export interface ProjectListResponse {
  workspaceId: number
  totalCount: number
  projects: Array<Project>
}

export const projectListApi = async (workspaceId: number) => {
  return authAxios.get<ApiResponse<ProjectListResponse>>(
    `/api/workspaces/${workspaceId}/projects`,
  )
}

export interface BoardListResponse {
  totalCount: number
  boards: Array<Board>
}

export const boardListApi = async (workspaceId: number, projectId: number) => {
  return authAxios.get<ApiResponse<BoardListResponse>>(
    `/api/workspaces/${workspaceId}/projects/${projectId}/boards`,
  )
}

interface CreateBoardRequest {
  title: string
}

export const createBoardApi = async (
  workspaceId: number,
  projectId: number,
  request: CreateBoardRequest,
) => {
  return authAxios.post<ApiResponse>(
    `/api/workspaces/${workspaceId}/projects/${projectId}`,
    request,
  )
}

export interface ProjectParticipantListResponse {
  totalCount: number
  participants: Array<ProjectParticipant>
}

export const projectParticipantListApi = async (
  workspaceId: number,
  projectId: number,
) => {
  return authAxios.get<ApiResponse<ProjectParticipantListResponse>>(
    `/api/workspaces/${workspaceId}/projects/${projectId}/participants`,
  )
}
