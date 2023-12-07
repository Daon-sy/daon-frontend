import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"

export interface WorkspaceNoticeDetail {
  noticeId: number
  title: string
  content: string
  createdAt: string
  modifiedAt: string
  writer: {
    workspaceParticipantId: number
    name: string
    imageUrl: string
    role: WORKSPACE_PARTICIPANT_ROLE
  }
}
