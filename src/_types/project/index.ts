import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"

export interface Project {
  projectId: number
  title: string
  description?: string
}

export interface ProjectDetail extends Project {
  createdAt: string
  modifiedAt: string
}

export interface Board {
  boardId: number
  title: string
}

export interface ProjectParticipant {
  participantId: number
  name: string
  email: string
  imageUrl?: string
  role: WORKSPACE_PARTICIPANT_ROLE
}
