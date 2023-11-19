export type DIVISION = "PERSONAL" | "GROUP"

export interface Workspace {
  workspaceId: number
  title: string
  subject?: string
  description?: string
  imageUrl?: string
  division: DIVISION
}

export interface WorkspaceDetail extends Workspace {
  createdAt: string
  modifiedAt: string
}

export type WORKSPACE_PARTICIPANT_ROLE =
  | "WORKSPACE_ADMIN"
  | "PROJECT_ADMIN"
  | "BASIC_PARTICIPANT"

export interface WorkspaceParticipantRoleDetail {
  role: WORKSPACE_PARTICIPANT_ROLE
  description: string
}

export const roles: Array<WorkspaceParticipantRoleDetail> = [
  {
    role: "WORKSPACE_ADMIN",
    description: "워크스페이스 관리자",
  },
  {
    role: "PROJECT_ADMIN",
    description: "프로젝트 관리자",
  },
  {
    role: "BASIC_PARTICIPANT",
    description: "일반 참여자",
  },
]

export interface WorkspaceParticipant {
  workspaceParticipantId: number
  name: string
  email: string
  imageUrl?: string
  role: WORKSPACE_PARTICIPANT_ROLE
}
