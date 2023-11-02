import { authAxios } from "api/index"

export interface WorkspaceInfo {
  name: string
  imageUrl: string | null
  description: string
  subject: string
}

export interface WsProfileInfo {
  nickname: string // profile-name으로 짓는 것은 어떤지?
  imageUrl: string | null
}

export interface CreateWorkspaceRequest {
  workspace: WorkspaceInfo
  profile: WsProfileInfo
}

export interface CreateWorkspaceResponse {
  workspaceId: number
}

export const createWorkspaceApi = async (request: CreateWorkspaceRequest) => {
  return authAxios.post("/api/workspaces", request)
}
