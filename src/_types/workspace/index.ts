import { ColorOptions } from "../style"

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

export const WS_ADMIN: WorkspaceParticipantRoleDetail = {
  role: "WORKSPACE_ADMIN",
  description: "워크스페이스 관리자",
}
export const PJ_ADMIN: WorkspaceParticipantRoleDetail = {
  role: "PROJECT_ADMIN",
  description: "프로젝트 관리자",
}
export const PARTICIPANT: WorkspaceParticipantRoleDetail = {
  role: "BASIC_PARTICIPANT",
  description: "구성원",
}
export const roles: Array<WorkspaceParticipantRoleDetail> = [
  WS_ADMIN,
  PJ_ADMIN,
  PARTICIPANT,
]

export interface WorkspaceParticipant {
  workspaceParticipantId: number
  name: string
  email: string
  imageUrl?: string
  role: WORKSPACE_PARTICIPANT_ROLE
}

export type ColorRole = { color: ColorOptions } & WorkspaceParticipantRoleDetail

export const roleColors: Array<ColorRole> = [
  { ...WS_ADMIN, color: "yellow" },
  { ...PJ_ADMIN, color: "green" },
  { ...PARTICIPANT, color: "blue" },
]
