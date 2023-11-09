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
  title: string
  startDate: string
  endDate: string
  progressStatus: string
  board: Board
  emergency: boolean
  bookmark: boolean
  taskManager: TaskManager
}
