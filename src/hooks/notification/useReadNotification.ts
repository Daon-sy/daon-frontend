import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { readNotificationApi } from "api/notification"
import { getNotificationsUnreadStore } from "store/notificationStore"

const useReadNotification = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { removeNotification } = getNotificationsUnreadStore()

  const fetch = async (notificationId: number) => {
    try {
      setIsFetching(true)
      await readNotificationApi(notificationId)
      removeNotification(notificationId)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { fetch, isFetching, error }
}

export default useReadNotification
