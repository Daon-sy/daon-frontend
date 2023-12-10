import { create } from "zustand"
import { Notification } from "_types/notification"

interface NotificationsUnreadStore {
  notifications: Notification[]
  clear: () => void
  addNotifications: (notifications: Notification[]) => void
  removeNotification: (notificationId: number) => void
}

export const getNotificationsUnreadStore = create<NotificationsUnreadStore>(
  set => ({
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
    removeNotification: (notificationId: number) => {
      set(({ notifications: perv }) => ({
        notifications: perv.filter(
          noti => noti.notificationId !== notificationId,
        ),
      }))
    },
  }),
)

export default { getNotificationStore: getNotificationsUnreadStore }
