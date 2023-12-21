import { Board, Project } from "_types/project"

export type TASK_STATUS = "TODO" | "PROCEEDING" | "COMPLETED" | "PENDING"

export interface TaskStatus {
  value: TASK_STATUS
  description: string
  color: string
}

const TODO: TaskStatus = {
  value: "TODO",
  description: "예정",
  color: "primary.main",
}
const PROCEEDING: TaskStatus = {
  value: "PROCEEDING",
  description: "진행",
  color: "secondary.main",
}
const COMPLETED: TaskStatus = {
  value: "COMPLETED",
  description: "완료",
  color: "success.main",
}
const PENDING: TaskStatus = {
  value: "PENDING",
  description: "보류",
  color: "error.main",
}

export const TASK_STATUS_SET: Array<TaskStatus> = [
  TODO,
  PROCEEDING,
  COMPLETED,
  PENDING,
]

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
  replyCount: number
  myTask: boolean
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

export interface HistoryProjectParticipant {
  projectParticipantId: number
  name: string
  imageUrl?: string
}

export interface HistoryBoard {
  boardId: number
  title: string
}

export type TaskFieldName =
  | "title"
  | "content"
  | "board"
  | "taskManager"
  | "startDate"
  | "endDate"
  | "emergency"
  | "progressStatus"

export type TaskFieldType =
  | "ProjectParticipant"
  | "Date"
  | "TaskProgressStatus"
  | "Board"
  | "boolean"
  | "String"

export interface TaskHistory {
  revId: number
  fieldName: TaskFieldName
  fieldType: TaskFieldType
  from?: unknown
  to?: unknown
  modifier: HistoryProjectParticipant
  modifiedAt: string
}
