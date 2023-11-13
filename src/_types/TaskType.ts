import { Board, Project } from "_types/ProjectType"

export type TASK_STATUS = "TODO" | "PROCEEDING" | "COMPLETED" | "PENDING"

export interface TaskManager {
  projectParticipantId: number
  name: string
  profileImageUrl: string | null
}

export interface TaskSummary {
  taskId: number
  projectId: number
  title: string
  startDate: string | undefined
  endDate: string | undefined
  progressStatus: TASK_STATUS
  board: Board | undefined
  emergency: boolean
  bookmark: boolean
  taskManager: TaskManager | undefined
}

export interface TaskDetail {
  taskId: number
  project: Project
  board: Board | undefined
  title: string
  content: string | undefined
  taskManager: TaskManager | undefined
  startDate: string | undefined
  endDate: string | undefined
  progressStatus: TASK_STATUS
  emergency: boolean
  bookmark: boolean
}
