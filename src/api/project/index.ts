import {
  Board,
  Project,
  ProjectDetail,
  ProjectParticipant,
} from "_types/project"
import { AxiosResponse } from "axios"
import { authAxios } from "api"

// REQUEST
export interface CreateProjectRequestBody {
  title: string
  description?: string
}

export interface ModifyWorkspaceRequestBody {
  title?: string
  description?: string
}

// RESPONSE
export interface ProjectListResponseBody {
  totalCount: number
  workspaceId: number
  projects: Array<Project>
}

export interface CreateProjectResponseBody {
  projectId: number
}

export interface ProjectBoardListResponseBody {
  totalCount: number
  boards: Array<Board>
}

export type ProjectDetailResponseBody = ProjectDetail

export interface ProjectParticipantListResponseBody {
  totalCount: number
  projectParticipants: Array<ProjectParticipant>
}

// API
// 프로젝트 목록 조회
export const projectListApi = async (
  workspaceId: number,
): Promise<AxiosResponse<ProjectListResponseBody>> => {
  return authAxios.get(`/api/workspaces/${workspaceId}/projects`)
}

// 프로젝트 단건 조회
export const projectDetailApi = async (
  workspaceId: number,
  projectId: number,
): Promise<AxiosResponse<ProjectDetailResponseBody>> => {
  return authAxios.get(`/api/workspaces/${workspaceId}/projects/${projectId}`)
}

// 프로젝트 생성
export const createProjectApi = async (
  workspaceId: number,
  requestBody: CreateProjectRequestBody,
): Promise<AxiosResponse<CreateProjectResponseBody>> => {
  return authAxios.post(`/api/workspaces/${workspaceId}/projects`, requestBody)
}

// 프로젝트 수정
export const modifyProjectApi = async (
  workspaceId: number,
  projectId: number,
  requestBody: ModifyWorkspaceRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.patch(
    `/api/workspaces/${workspaceId}/projects/${projectId}`,
    requestBody,
  )
}

// 프로젝트 삭제
export const removeProjectApi = async (
  workspaceId: number,
  projectId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `/api/workspaces/${workspaceId}/projects/${projectId}`,
  )
}

// 프로젝트 탈퇴
export const withdrawProjectApi = async (
  workspaceId: number,
  projectId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `/api/workspaces/${workspaceId}/projects/${projectId}/participants/me`,
  )
}

// 프로젝트 참여자 목록 조회
export const projectParticipantListApi = async (
  workspaceId: number,
  projectId: number,
): Promise<AxiosResponse<ProjectParticipantListResponseBody>> => {
  return authAxios.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}/participants`,
  )
}

// 프로젝트 참여자 초대
export const inviteProjectParticipantApi = async (
  workspaceId: number,
  projectId: number,
  requestBody: { workspaceParticipantId: number },
): Promise<AxiosResponse> => {
  return authAxios.post(
    `/api/workspaces/${workspaceId}/projects/${projectId}/invite`,
    requestBody,
  )
}

// 프로젝트 참여자 강퇴
export const deportationProjectParticipantApi = async (
  workspaceId: number,
  projectId: number,
  requestBody: { projectParticipantId: number },
): Promise<AxiosResponse> => {
  return authAxios.post(
    `/api/workspaces/${workspaceId}/projects/${projectId}/participants/deportation`,
    requestBody,
  )
}

export const myProjectParticipantDetailApi = async (
  workspaceId: number,
  projectId: number,
): Promise<AxiosResponse<ProjectParticipant>> => {
  return authAxios.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}/participants/me`,
  )
}

// 프로젝트 보드 목록 조회
export const projectBoardListApi = async (
  workspaceId: number,
  projectId: number,
): Promise<AxiosResponse<ProjectBoardListResponseBody>> => {
  return authAxios.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}/boards`,
  )
}

// 보드 생성
export const createProjectBoardApi = async (
  workspaceId: number,
  projectId: number,
  requestBody: { title: string },
): Promise<AxiosResponse> => {
  return authAxios.post(
    `/api/workspaces/${workspaceId}/projects/${projectId}/boards`,
    requestBody,
  )
}

// 보드 수정
export const modifyProjectBoardApi = async (
  workspaceId: number,
  projectId: number,
  boardId: number,
  requestBody: { title: string },
): Promise<AxiosResponse> => {
  return authAxios.put(
    `/api/workspaces/${workspaceId}/projects/${projectId}/boards/${boardId}`,
    requestBody,
  )
}

// 보드 삭제
export const removeProjectBoardApi = async (
  workspaceId: number,
  projectId: number,
  boardId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `/api/workspaces/${workspaceId}/projects/${projectId}/boards/${boardId}`,
  )
}
