import { ApiResponse, authAxios } from "api/index"
import { AxiosResponse } from "axios"
import { WORKSPACE_PARTICIPANT_ROLE } from "../_types/WorkspaceType"

export interface WorkspaceInfo {
  name: string
  imageUrl: string
  description: string
  subject: string
}

export interface WsProfileInfo {
  name: string
  imageUrl: string
}

export interface CreateWorkspaceRequest {
  workspace: WorkspaceInfo
  profile: WsProfileInfo
}

export interface CreateWorkspaceResponse {
  workspaceId: number
}

export const createWorkspaceApi = async (
  request: CreateWorkspaceRequest,
): Promise<AxiosResponse<ApiResponse<CreateWorkspaceResponse>>> => {
  return authAxios.post("/api/workspaces", request)
}

export interface WorkspaceParticipantListResponse {
  participantId: number
  name: string
  email: string
  imageUrl: null
  role: WORKSPACE_PARTICIPANT_ROLE
}

export const workspaceParticipantListApi = async (workspaceId: number) => {
  return authAxios.get<ApiResponse<WorkspaceParticipantListResponse>>(
    `/api/workspaces/${workspaceId}/participants`,
  )
}
