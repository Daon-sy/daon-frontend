import { create } from "zustand"
import { Notification } from "_types/notification"

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
