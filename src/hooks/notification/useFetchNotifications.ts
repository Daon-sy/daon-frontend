import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { notificationListApi } from "api/notification"
import { getNotificationStore } from "store/notificationStore"
import {
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  Notification,
  RegisteredTaskManagerNotification,
} from "_types/notification"

const useFetchNotifications = (skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { notifications, setNotifications } = getNotificationStore()

  const fetchNotifications = async () => {
    try {
      setIsFetching(true)
      const { data: responseData } = await notificationListApi()
      const { notifications: fetchedNotifications } = responseData

      setNotifications(
        fetchedNotifications.map((noti): Notification => {
          switch (noti.type) {
            case "REGISTERED_TASK_MANAGER":
              return {
                ...noti,
                data: JSON.parse(
                  noti.data as string,
                ) as RegisteredTaskManagerNotification & { time: string },
              }
            case "INVITE_WORKSPACE":
              return {
                ...noti,
                data: JSON.parse(
                  noti.data as string,
                ) as InviteWorkspaceNotification & { time: string },
              }
            case "INVITE_PROJECT":
              return {
                ...noti,
                data: JSON.parse(
                  noti.data as string,
                ) as InviteProjectNotification & { time: string },
              }
            case "DEPORTATION_WORKSPACE":
              return {
                ...noti,
                data: JSON.parse(
                  noti.data as string,
                ) as DeportationWorkspaceNotification & { time: string },
              }
            case "DEPORTATION_PROJECT":
              return {
                ...noti,
                data: JSON.parse(
                  noti.data as string,
                ) as DeportationProjectNotification & { time: string },
              }
            default:
              return noti
          }
        }),
      )
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (skip) return
    fetchNotifications()
  }, [])

  return { notifications, fetchNotifications, isFetching, error }
}

export default useFetchNotifications
