export type DIVISION = "PERSONAL" | "GROUP"

export interface Workspace {
  workspaceId: number
  title: string
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
  | "PARTICIPANT"

export interface WorkspaceParticipant {
  workspaceParticipantId: number
  name: string
  email: string
  imageUrl?: string
  role: WORKSPACE_PARTICIPANT_ROLE
}
