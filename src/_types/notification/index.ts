export type NotificationType =
  | "MESSAGE"
  | "INVITE_WORKSPACE"
  | "INVITE_PROJECT"
  | "DEPORTATION_WORKSPACE"
  | "DEPORTATION_PROJECT"
  | "REGISTERED_TASK_MANAGER"
  | "RECEIVE_MESSAGE"

interface WorkspaceSummary {
  workspaceId: number
  workspaceTitle: string
}

interface ProjectSummary {
  projectId: number
  projectTitle: string
}

interface BoardSummary {
  boardId: number
  boardTitle: string
}

interface TaskSummary {
  taskId: number
  taskTitle: string
}

interface MessageSender {
  workspaceParticipantId: number
  name: string
  email: string
  imageUrl?: string
}

interface MessageSummary {
  messageId: number
  sender: MessageSender
}

export interface RegisteredTaskManagerNotification {
  workspace: WorkspaceSummary
  project: ProjectSummary
  board: BoardSummary
  task: TaskSummary
}

export interface InviteWorkspaceNotification {
  workspace: WorkspaceSummary
}

export interface InviteProjectNotification {
  workspace: WorkspaceSummary
  project: ProjectSummary
}

export interface DeportationWorkspaceNotification {
  workspace: WorkspaceSummary
}

export interface DeportationProjectNotification {
  workspace: WorkspaceSummary
  project: ProjectSummary
}

export interface ReceiveMessageNotification {
  workspace: WorkspaceSummary
  message: MessageSummary
}

export interface Notification<
  T =
    | RegisteredTaskManagerNotification
    | InviteWorkspaceNotification
    | InviteProjectNotification
    | DeportationProjectNotification
    | DeportationWorkspaceNotification
    | ReceiveMessageNotification,
> {
  notificationId: number
  data: T & { time: string }
  type: NotificationType
  read: boolean
}
