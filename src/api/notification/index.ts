import { AxiosResponse } from "axios"
import { API_SERVER_URL } from "env"
import { authAxios, PageParams, PageResponse } from "api/index"
import { Notification } from "_types/notification"

export interface NotificationListResponseBody {
  notifications: Notification[]
}

export const notificationsUnreadListApi = (): Promise<
  AxiosResponse<NotificationListResponseBody>
> => {
  return authAxios.get(`${API_SERVER_URL}/api/notifications-unread`)
}

export const notificationsReadListApi = (
  pageParams: PageParams,
): Promise<AxiosResponse<PageResponse<Notification>>> => {
  return authAxios.get(`${API_SERVER_URL}/api/notifications-read`, {
    params: pageParams,
  })
}

export const readNotificationApi = (
  notificationId: number,
): Promise<AxiosResponse> => {
  return authAxios.post(
    `${API_SERVER_URL}/api/notifications/${notificationId}/read`,
  )
}

export const removeNotificationApi = (
  notificationId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `${API_SERVER_URL}/api/notifications/${notificationId}`,
  )
}
