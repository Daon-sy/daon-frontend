import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { removeNotificationApi } from "api/notification"
import { getNotificationsUnreadStore } from "store/notificationStore"
import { useAlert } from "hooks/useAlert"

const useRemoveNotification = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { removeNotification } = getNotificationsUnreadStore()
  const { addSuccess } = useAlert()

  const fetch = async (notificationId: number, removeCallback?: () => void) => {
    try {
      setIsFetching(true)
      await removeNotificationApi(notificationId)
      removeNotification(notificationId)
      addSuccess("알림 삭제 완료")
      if (removeCallback) removeCallback()
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

export default useRemoveNotification
