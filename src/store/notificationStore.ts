import { create } from "zustand"
import { Notification } from "_types/notification"

interface NotificationStore {
  notifications: Notification[]
  clear: () => void
  addNotifications: (notifications: Notification[]) => void
  removeNotification: (notiId: number) => void
}

export const getNotificationStore = create<NotificationStore>(set => ({
  notifications: [],
  clear: () => set({ notifications: [] }),
  addNotifications: (notifications: Notification[]) => {
    set(({ notifications: prev }) => ({
      notifications: [...notifications, ...prev].filter(
        (noti, i, arr) =>
          i ===
          arr.findIndex(loc => loc.notificationId === noti.notificationId),
      ),
    }))
  },
  removeNotification: (notiId: number) => {
    set(({ notifications: perv }) => ({
      notifications: perv.filter(noti => noti.notificationId !== notiId),
    }))
  },
}))

export default { getNotificationStore }
