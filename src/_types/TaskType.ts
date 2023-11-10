export interface Board {
  boardId: number
  name: string
}

export interface TaskManager {
  projectParticipantId: number
  name: string
  profileImageUrl: string | null
}

export interface TaskSummary {
  taskId: number
  projectId: number
  workspaceId: number
  title: string
  startDate: string
  endDate: string
  progressStatus: string
  board: Board
  emergency: boolean
  bookmark: boolean
  taskManager: TaskManager
}

export interface TaskDetail {
  taskId: number
  projectId: number
  workspaceId: number
  title: string
  content: string
  startDate: string
  endDate: string
  progressStatus: string
  board: Board
  emergency: boolean
  bookmark: boolean
  taskManager: TaskManager
}
