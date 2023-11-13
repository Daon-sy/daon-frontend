import { WORKSPACE_PARTICIPANT_ROLE } from "_types/WorkspaceType"

export interface Project {
  projectId: number
  title: string
  description: string | null
}

export interface Board {
  boardId: number
  title: string
}

export interface ProjectParticipant {
  participantId: number
  name: string
  email: string
  imageUrl: string | null
  role: WORKSPACE_PARTICIPANT_ROLE
}
