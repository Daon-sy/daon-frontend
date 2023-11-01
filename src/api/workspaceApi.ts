import axios from "axios"
import { API_SERVER_URL } from "env"

export interface WorkspaceInfo {
  name: string
  imageUrl: string | null
  description: string | null
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
  // TODO 토큰 헤더에 담기
  return axios.post(`${API_SERVER_URL}/api/workspaces`, request)
}
