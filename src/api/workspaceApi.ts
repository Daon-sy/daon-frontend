import { ApiResponse, authAxios } from "api/index"
import { AxiosResponse } from "axios"

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
