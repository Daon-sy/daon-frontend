import { Board, Project } from "_types/project"

export type TASK_STATUS = "TODO" | "PROCEEDING" | "COMPLETED" | "PENDING"

export interface TaskStatus {
  value: TASK_STATUS
  description: string
  chipColor: "info" | "primary" | "success" | "warning"
}

const TODO: TaskStatus = {
  value: "TODO",
  description: "할 일",
  chipColor: "info",
}
const PROCEEDING: TaskStatus = {
  value: "PROCEEDING",
  description: "진행중",
  chipColor: "primary",
}
const COMPLETED: TaskStatus = {
  value: "COMPLETED",
  description: "완료됨",
  chipColor: "success",
}
const PENDING: TaskStatus = {
  value: "PENDING",
  description: "보류중",
  chipColor: "warning",
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
