import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { notificationsUnreadListApi } from "api/notification"
import { getNotificationsUnreadStore } from "store/notificationStore"

const useFetchNotificationsUnread = (skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { notifications, setNotifications } = getNotificationsUnreadStore()

  const fetchNotifications = async () => {
    try {
      setIsFetching(true)
      const { data: responseData } = await notificationsUnreadListApi()
      const { notifications: fetchedNotifications } = responseData

      setNotifications(fetchedNotifications)
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

export default useFetchNotificationsUnread
