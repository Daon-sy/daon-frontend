import { AxiosResponse } from "axios"
import { authAxios } from "api"
import {
  Workspace,
  WORKSPACE_PARTICIPANT_ROLE,
  WorkspaceDetail,
  WorkspaceParticipant,
} from "_types/workspace"

export const WORKSPACE_API_PREFIX = "/api/workspaces"

// REQEUST
export interface WorkspaceInfo {
  title: string
  imageUrl?: string
  description?: string
  subject?: string
}

export interface WsProfileInfo {
  name: string
  imageUrl?: string
  email: string
}
export interface CreateWorkspaceRequestBody {
  workspace: WorkspaceInfo
  profile: WsProfileInfo
}

export interface ModifyWorkspaceRequestBody {
  title?: string
  description?: string
  imageUrl?: string
  subject?: string
}

export interface ModifyMyWorkspaceParticipantInfoRequestBody {
  name?: string
  imageUrl?: string
  email?: string
}

export interface DeportationWorkspaceParticipantRequestBody {
  workspaceParticipantId: number
}

export interface InviteWorkspaceRequestBody {
  username: string
}

export interface ModifyWorkspaceParticipantRoleRequestBody {
  workspaceParticipantId: number
  role: WORKSPACE_PARTICIPANT_ROLE
}

export type JoinWorkspaceRequestBody = WsProfileInfo

// RESPONSE
export interface CreateWorkspaceResponseBody {
  workspaceId: number
}

export interface WorkspaceListResponseBody {
  totalCount: number
  workspaces: Array<Workspace>
}

export type WorkspaceDetailResponseBody = WorkspaceDetail

export interface WorkspaceParticipantListResponseBody {
  totalCount: number
  workspaceParticipants: Array<WorkspaceParticipant>
}

export type MyWorkspaceParticipantDetailResponseBody = WorkspaceParticipant

// API
// 워크스페이스 생성
export const createWorkspaceApi = async (
  requestBody: CreateWorkspaceRequestBody,
): Promise<AxiosResponse<CreateWorkspaceResponseBody>> => {
  return authAxios.post(`${WORKSPACE_API_PREFIX}`, requestBody)
}

// 워크스페이스 목록 조회
export const workspaceListApi = async (): Promise<
  AxiosResponse<WorkspaceListResponseBody>
> => {
  return authAxios.get(`${WORKSPACE_API_PREFIX}`)
}

// 워크스페이스 수정
export const modifyWorkspaceApi = async (
  workspaceId: number,
  requestBody: ModifyWorkspaceRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.patch(`${WORKSPACE_API_PREFIX}/${workspaceId}`, requestBody)
}

// 워크스페이스 상세 조회
export const workspaceDetailApi = async (
  workspaceId: number,
): Promise<AxiosResponse<WorkspaceDetailResponseBody>> => {
  return authAxios.get(`${WORKSPACE_API_PREFIX}/${workspaceId}`)
}

// 워크스페이스 참여자 목록조회
export const workspaceParticipantListApi = async (
  workspaceId: number,
): Promise<AxiosResponse<WorkspaceParticipantListResponseBody>> => {
  return authAxios.get(`${WORKSPACE_API_PREFIX}/${workspaceId}/participants`)
}

export const myWorkspaceParticipantDetailApi = async (
  workspaceId: number,
): Promise<AxiosResponse<MyWorkspaceParticipantDetailResponseBody>> => {
  return authAxios.get(`${WORKSPACE_API_PREFIX}/${workspaceId}/participants/me`)
}

// 내 워크스페이스 참여자 정보 변경
export const modifyMyWorkspaceParticipantInfoApi = async (
  workspaceId: number,
  requestBody: ModifyMyWorkspaceParticipantInfoRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.patch(
    `${WORKSPACE_API_PREFIX}/${workspaceId}/participants/me`,
    requestBody,
  )
}

// 워크스페이스 탈퇴
export const withdrawWorkspaceApi = async (
  workspaceId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `${WORKSPACE_API_PREFIX}/${workspaceId}/participants/me`,
  )
}

// 워크스페이스 참여자 권한 변경
export const modifyWorkspaceParticipantRoleApi = async (
  workspaceId: number,
  requestBody: ModifyWorkspaceParticipantRoleRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post(
    `${WORKSPACE_API_PREFIX}/${workspaceId}/participants/role`,
    requestBody,
  )
}

// 워크스페이스 참여자 강퇴
export const deportationWorkspaceParticipantApi = async (
  workspaceId: number,
  requestBody: DeportationWorkspaceParticipantRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post(
    `${WORKSPACE_API_PREFIX}/${workspaceId}/participants/deportation`,
    requestBody,
  )
}

// 워크스페이스 참여자 초대
export const inviteWorkspace = async (
  workspaceId: number,
  requestBody: InviteWorkspaceRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post(
    `${WORKSPACE_API_PREFIX}/${workspaceId}/invite`,
    requestBody,
  )
}

// 워크스페이스 삭제
export const removeWorkspaceApi = async (
  workspaceId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(`${WORKSPACE_API_PREFIX}/${workspaceId}`)
}

// 워크스페이스 참여
export const joinWorkspaceApi = async (
  workspaceId: number,
  requestBody: JoinWorkspaceRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post(
    `${WORKSPACE_API_PREFIX}/${workspaceId}/join`,
    requestBody,
  )
}
