import { Board, Project } from "_types/project"

export type TASK_STATUS = "TODO" | "PROCEEDING" | "COMPLETED" | "PENDING"

export interface TaskManager {
  projectParticipantId: number
  name: string
  imageUrl?: string
}

export interface TaskSummary {
  taskId: number
  project: Project
  board?: Board
  title: string
  taskManager?: TaskManager
  startDate?: string
  endDate?: string
  progressStatus: TASK_STATUS
  emergency: boolean
  bookmark: boolean
}

export interface TaskDetail {
  taskId: number
  project: Project
  board?: Board
  title: string
  content?: string
  taskManager?: TaskManager
  startDate?: string
  endDate?: string
  progressStatus: TASK_STATUS
  emergency: boolean
  bookmark: boolean
}

export interface TaskReplyDetail {
  replyId: number
  taskId: number
  content: string
  writer: {
    projectParticipantId: string
    name: string
    imageUrl?: string
  }
  isWriter: boolean
  createdAt: string
  modifiedAt: string
}
