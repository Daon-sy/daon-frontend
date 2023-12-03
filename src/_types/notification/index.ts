export type NotificationType =
  | "MESSAGE"
  | "INVITE_WORKSPACE"
  | "INVITE_PROJECT"
  | "DEPORTATION_WORKSPACE"
  | "DEPORTATION_PROJECT"
  | "REGISTERED_TASK_MANAGER"

interface WorkspaceSummary {
  workspaceId: number
  workspaceTitle: string
}

interface ProjectSummary {
  projectId: number
  projectTitle: string
}

interface TaskSummary {
  taskId: number
  taskTitle: string
}

export interface RegisteredTaskManagerNotification {
  workspace: WorkspaceSummary
  project: ProjectSummary
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

export interface Notification<
  T =
    | RegisteredTaskManagerNotification
    | InviteWorkspaceNotification
    | InviteProjectNotification
    | DeportationProjectNotification
    | DeportationWorkspaceNotification,
> {
  notificationId: number
  data: T & { time: string }
  type: NotificationType
}
