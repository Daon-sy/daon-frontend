import { AxiosResponse } from "axios"
import { PageResponse, authAxios } from "api"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"

export const WORKSPACE_API_PREFIX = "/api/workspaces"

// 워크스페이스 공지사항
export interface CreateWorkspaceNoticeRequestBody {
  title: string
  content: string
}

export interface CreateWorkspaceNoticeResponseBody {
  noticeId: number
}

export interface ModifyWorkspaceNoticeRequestBody {
  title?: string
  content?: string
}

export type WorkspaceNoticDetailResponseBody = WorkspaceNoticeDetail

// API
// 워크스페이스 공지사항 생성
export const createWorkspaceNoticeApi = async (
  workspaceId: number,
  requestBody: CreateWorkspaceNoticeRequestBody,
): Promise<AxiosResponse<CreateWorkspaceNoticeResponseBody>> => {
  return authAxios.post(`/api/workspaces/${workspaceId}/notices`, requestBody)
}

// 워크스페이스 공지사항 목록조회
export const workspaceNoticeListApi = async (
  workspaceId: number,
  params: {
    page?: number
    size?: number
    keyword?: string
  } = {
    page: 0,
    size: 4,
    keyword: "",
  },
): Promise<AxiosResponse<PageResponse<WorkspaceNoticeDetail>>> => {
  return authAxios.get(`/api/workspaces/${workspaceId}/notices`, { params })
}
// 워크스페이스 공지사항 단건조회
export const workspaceNoticeDetailApi = async (
  workspaceId: number,
  noticeId: number,
): Promise<AxiosResponse<WorkspaceNoticDetailResponseBody>> => {
  return authAxios.get(`/api/workspaces/${workspaceId}/notices/${noticeId}`)
}
// 워크스페이스 공지사항 수정
export const modifyWorkspaceNoticeApi = async (
  workspaceId: number,
  noticeId: number,
  requestBody: ModifyWorkspaceNoticeRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.patch(
    `api/workspaces/${workspaceId}/notices/${noticeId}`,
    requestBody,
  )
}
// 워크스페이스 공지사항 삭제
export const removeWorkspaceNoticeApi = async (
  workspaceId: number,
  noticeId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(`api/workspaces/${workspaceId}/notices/${noticeId}`)
}
