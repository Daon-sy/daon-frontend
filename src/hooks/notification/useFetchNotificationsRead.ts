import React from "react"
import axios from "axios"
import { ErrorResponse, PageInfo, PageParams } from "api"
import { notificationsReadListApi } from "api/notification"
import { Notification } from "_types/notification"

const useFetchNotificationsRead = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [pageInfo, setPageInfo] = React.useState<PageInfo | undefined>()
  const [notifications, setNotifications] = React.useState<Notification[]>()
  const [error, setError] = React.useState<ErrorResponse>()

  const [lastPageParams, setLastPageParams] = React.useState<PageParams>({
    page: 0,
    size: 10,
  })

  const fetch = async (pageParams?: PageParams) => {
    try {
      setIsFetching(true)
      if (pageParams) {
        const { data: responseBody } =
          await notificationsReadListApi(pageParams)
        setPageInfo({ ...responseBody })
        setNotifications(responseBody.content)
        setLastPageParams(pageParams)
      } else {
        const { data: responseBody } =
          await notificationsReadListApi(lastPageParams)
        setPageInfo({ ...responseBody })
        setNotifications(responseBody.content)
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { pageInfo, notifications, fetch, isFetching, error }
}

export default useFetchNotificationsRead
