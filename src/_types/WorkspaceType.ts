export interface Workspace {
  id: number
  title: string
  imageUrl: string | null
  division: "PERSONAL" | "GROUP"
}

export type WORKSPACE_PARTICIPANT_ROLE =
  | "WORKSPACE_ADMIN"
  | "PROJECT_ADMIN"
  | "BASIC_PARTICIPANT"

export interface WorkspaceParticipant {
  participantId: number
  name: string
  email: string
  imageUrl: string | null
  role: WORKSPACE_PARTICIPANT_ROLE
}
