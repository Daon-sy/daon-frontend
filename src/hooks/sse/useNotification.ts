import React from "react"
import { EventSourcePolyfill, Event, MessageEvent } from "event-source-polyfill"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/tokenStore"
import { getNotificationStore } from "store/notificationStore"
import {
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  Notification,
  RegisteredTaskManagerNotification,
} from "_types/notification"
import { useAlert } from "hooks/useAlert"

type EventType =
  | "CONNECTED"
  | "MESSAGE"
  | "INVITE_WORKSPACE"
  | "INVITE_PROJECT"
  | "DEPORTATION_WORKSPACE"
  | "DEPORTATION_PROJECT"
  | "REGISTERED_TASK_MANAGER"

const heartbeatTimeout = 140_000

const addEventListener = (
  eventsource: EventSourcePolyfill,
  {
    eventType,
    callback,
  }: {
    eventType: EventType
    callback: (event: Event | MessageEvent) => void
  },
) => {
  eventsource.addEventListener(eventType, callback)
}

interface Props {
  ssePath: string
  onEventRaised?: () => void
  onMessage?: (event: Event | MessageEvent) => void
  onInviteWorkspace?: (event: Event | MessageEvent) => void
  onInviteProject?: (event: Event | MessageEvent) => void
  onDeportationWorkspace?: (event: Event | MessageEvent) => void
  onDeportationProject?: (event: Event | MessageEvent) => void
  onRegisteredTaskManager?: (event: Event | MessageEvent) => void
}

const useNotification = ({
  ssePath,
  onMessage,
  onInviteWorkspace,
  onInviteProject,
  onDeportationWorkspace,
  onDeportationProject,
  onRegisteredTaskManager,
}: Props) => {
  const { addInfo } = useAlert()
  const { token } = getTokenStore()
  const { addNotifications } = getNotificationStore()

  let eventSource: EventSourcePolyfill
  const subscribe = () => {
    eventSource = new EventSourcePolyfill(
      `${API_SERVER_URL}/${
        ssePath.startsWith("/") ? ssePath.substring(1) : ssePath
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        heartbeatTimeout,
      },
    )

    addEventListener(eventSource, {
      eventType: "MESSAGE",
      callback: event => {
        if (onMessage) onMessage(event)
      },
    })

    // 담당자로 등록 알림 핸들러
    addEventListener(eventSource, {
      eventType: "REGISTERED_TASK_MANAGER",
      callback: event => {
        if (onRegisteredTaskManager) onRegisteredTaskManager(event)
        else {
          const msgEvent = event as MessageEvent
          const parsedNotification = JSON.parse(msgEvent.data)
          const parsedData = JSON.parse(
            parsedNotification.data,
          ) as RegisteredTaskManagerNotification & { time: string }
          const notification: Notification<RegisteredTaskManagerNotification> =
            {
              notificationId: parsedNotification.notificationId,
              data: parsedData,
              type: parsedNotification.type,
            }
          addNotifications([notification])
        }
        addInfo("알림이 도착했습니다")
      },
    })

    // 워크스페이스 초대 알림 핸들러
    addEventListener(eventSource, {
      eventType: "INVITE_WORKSPACE",
      callback: event => {
        if (onInviteWorkspace) onInviteWorkspace(event)
        else {
          const msgEvent = event as MessageEvent
          const parsedNotification = JSON.parse(msgEvent.data)
          const parsedData = JSON.parse(
            parsedNotification.data,
          ) as InviteWorkspaceNotification & { time: string }
          const notification: Notification<InviteWorkspaceNotification> = {
            notificationId: parsedNotification.notificationId,
            data: parsedData,
            type: parsedNotification.type,
          }
          addNotifications([notification])
        }
        addInfo("알림이 도착했습니다")
      },
    })

    // 프로젝트 초대 알림 핸들러
    addEventListener(eventSource, {
      eventType: "INVITE_PROJECT",
      callback: event => {
        if (onInviteProject) onInviteProject(event)
        else {
          const msgEvent = event as MessageEvent
          const parsedNotification = JSON.parse(msgEvent.data)
          const parsedData = JSON.parse(
            parsedNotification.data,
          ) as InviteProjectNotification & { time: string }
          const notification: Notification<InviteProjectNotification> = {
            notificationId: parsedNotification.notificationId,
            data: parsedData,
            type: parsedNotification.type,
          }
          addNotifications([notification])
        }
        addInfo("알림이 도착했습니다")
      },
    })

    // 워크스페이스 강퇴 알림 핸들러
    addEventListener(eventSource, {
      eventType: "DEPORTATION_WORKSPACE",
      callback: event => {
        if (onDeportationWorkspace) onDeportationWorkspace(event)
        else {
          const msgEvent = event as MessageEvent
          const parsedNotification = JSON.parse(msgEvent.data)
          const parsedData = JSON.parse(
            parsedNotification.data,
          ) as DeportationWorkspaceNotification & { time: string }
          const notification: Notification<DeportationWorkspaceNotification> = {
            notificationId: parsedNotification.notificationId,
            data: parsedData,
            type: parsedNotification.type,
          }
          addNotifications([notification])
        }
        addInfo("알림이 도착했습니다")
      },
    })

    // 프로젝트 강퇴 알림 핸들러
    addEventListener(eventSource, {
      eventType: "DEPORTATION_PROJECT",
      callback: event => {
        if (onDeportationProject) onDeportationProject(event)
        else {
          const msgEvent = event as MessageEvent
          const parsedNotification = JSON.parse(msgEvent.data)
          const parsedData = JSON.parse(
            parsedNotification.data,
          ) as DeportationProjectNotification & { time: string }
          const notification: Notification<DeportationProjectNotification> = {
            notificationId: parsedNotification.notificationId,
            data: parsedData,
            type: parsedNotification.type,
          }
          addNotifications([notification])
        }
        addInfo("알림이 도착했습니다")
      },
    })

    eventSource.onerror = e => {
      console.error(e)
      eventSource?.close()
    }
  }

  React.useEffect(() => {
    subscribe()
    return () => eventSource?.close()
  }, [])
}

export default useNotification
