import { AxiosResponse } from "axios"
import { authAxios } from "api"
import {
  MessageSummary,
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
  role: WORKSPACE_PARTICIPANT_ROLE
}

export interface ModifyWorkspaceParticipantRoleRequestBody {
  workspaceParticipantId: number
  role: WORKSPACE_PARTICIPANT_ROLE
}

export type JoinWorkspaceRequestBody = WsProfileInfo

export interface SendMessageRequestBody {
  title: string
  content: string
  workspaceParticipantId: number
}

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

export type FindMessageResponseBody = MessageSummary

export interface FindMessageListResponseBody {
  totalPage: number
  totalCount: number
  content: Array<MessageSummary>
  first: boolean
  last: boolean
  pageSize: number
  pageNumber: number
  contentSize: number
}

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

// 개인 워크스페이스 초기화
export const resetPersonalWorkspaceApi = async (
  workspaceId: number,
): Promise<AxiosResponse> => {
  return authAxios.put(`${WORKSPACE_API_PREFIX}/${workspaceId}/reset`)
}

// 쪽지 보내기
export const sendMessageApi = async (
  workspaceId: number,
  requestBody: SendMessageRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post(`/api/workspaces/${workspaceId}/messages`, requestBody)
}

// 쪽지 단건 조회
export const findMessageApi = async (
  workspaceId: number,
  messageId: number,
): Promise<AxiosResponse<FindMessageResponseBody>> => {
  return authAxios.get(`/api/workspaces/${workspaceId}/messages/${messageId}`)
}

// 쪽지 목록 조회
export const findMessageListApi = async (
  workspaceId: number,
  target: string,
  keyword: string,
): Promise<AxiosResponse<FindMessageListResponseBody>> => {
  return authAxios.get(`/api/workspaces/${workspaceId}/messages`, {
    params: {
      target,
      keyword,
    },
  })
}

// 쪽지 삭제
export const deleteMessageApi = async (
  workspaceId: number,
  messageId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `/api/workspaces/${workspaceId}/messages/${messageId}`,
  )
}

// 쪽지 모두 읽기
export const readAllMessageListApi = async (
  workspaceId: number,
): Promise<AxiosResponse> => {
  return authAxios.post(`/api/workspaces/${workspaceId}/messages/me`)
}

export interface SearchMembersToInviteResponseBody {
  members: Array<{ username: string; name: string; invited: boolean }>
}

// 회원 검색 [초대]
export const searchMembersToInviteApi = (
  workspaceId: number,
  username: string,
): Promise<AxiosResponse<SearchMembersToInviteResponseBody>> => {
  return authAxios.get(`${WORKSPACE_API_PREFIX}/${workspaceId}/search-member`, {
    params: { username },
  })
}
