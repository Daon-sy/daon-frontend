import { create } from "zustand"
import {
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  RegisteredTaskManagerNotification,
} from "_types/notification"

export interface Notification {
  type:
    | "INVITE_WORKSPACE"
    | "INVITE_PROJECT"
    | "DEPORTATION_WORKSPACE"
    | "DEPORTATION_PROJECT"
    | "REGISTERED_TASK_MANAGER"
  data:
    | RegisteredTaskManagerNotification
    | InviteWorkspaceNotification
    | InviteProjectNotification
    | DeportationWorkspaceNotification
    | DeportationProjectNotification
}

interface NotificationStore {
  notifications: Notification[]
  clear: () => void
  setNotifications: (notifications: Notification[]) => void
}

export const getNotificationStore = create<NotificationStore>(set => ({
  notifications: [],
  clear: () => set({ notifications: [] }),
  setNotifications: (notifications: Notification[]) => {
    set(({ notifications: prev }) => ({
      notifications: [...notifications, ...prev],
    }))
  },
}))

export default { getNotificationStore }
