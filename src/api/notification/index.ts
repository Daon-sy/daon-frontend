import { AxiosResponse } from "axios"
import { API_SERVER_URL } from "env"
import { authAxios } from "api/index"
import { Notification } from "_types/notification"

export interface NotificationListResponseBody {
  notifications: Notification[]
}

export const notificationListApi = (): Promise<
  AxiosResponse<NotificationListResponseBody>
> => {
  return authAxios.get(`${API_SERVER_URL}/api/notifications`)
}

export const readNotificationApi = (
  notificationId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(
    `${API_SERVER_URL}/api/notifications/${notificationId}`,
  )
}
