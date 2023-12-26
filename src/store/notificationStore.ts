import { create } from "zustand"
import { Notification } from "_types/notification"

interface NotificationsUnreadStore {
  isNewIssued: boolean
  setIsNewIssued: (value: boolean) => void
  notifications: Notification[]
  clear: () => void
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  removeNotification: (notificationId: number) => void
}

export const getNotificationsUnreadStore = create<NotificationsUnreadStore>(
  set => ({
    isNewIssued: false,
    setIsNewIssued: (value: boolean) => {
      set(state => ({ ...state, isNewIssued: value }))
    },
    notifications: [],
    clear: () => set({ notifications: [] }),
    setNotifications: (notifications: Notification[]) => {
      set(() => ({ notifications }))
    },
    addNotification: (notification: Notification) => {
      set(({ notifications: prev }) => ({
        notifications: [notification, ...prev].filter(
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
