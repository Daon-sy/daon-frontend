import React from "react"
import { EventSourcePolyfill, Event, MessageEvent } from "event-source-polyfill"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/tokenStore"
import { getNotificationsUnreadStore } from "store/notificationStore"
import {
  DeportationProjectNotification,
  DeportationWorkspaceNotification,
  InviteProjectNotification,
  InviteWorkspaceNotification,
  Notification,
  RegisteredTaskManagerNotification,
} from "_types/notification"
import { useSnackbar } from "notistack"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

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
  const { token } = getTokenStore()
  const { addNotifications } = getNotificationsUnreadStore()

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const notiSnackbar = () => {
    enqueueSnackbar("알림이 도착했습니다.", {
      variant: "info",
      style: { backgroundColor: "#FFBE00", fontWeight: 500 },
      autoHideDuration: 3000,
      anchorOrigin: { vertical: "top", horizontal: "right" },
      SnackbarProps: { style: { marginTop: 60 } },
      action: key => (
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon />
        </IconButton>
      ),
    })
  }

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
          const notification = JSON.parse(
            msgEvent.data,
          ) as Notification<RegisteredTaskManagerNotification>
          addNotifications([notification])
        }
        notiSnackbar()
      },
    })

    // 워크스페이스 초대 알림 핸들러
    addEventListener(eventSource, {
      eventType: "INVITE_WORKSPACE",
      callback: event => {
        if (onInviteWorkspace) onInviteWorkspace(event)
        else {
          const msgEvent = event as MessageEvent
          const notification = JSON.parse(
            msgEvent.data,
          ) as Notification<InviteWorkspaceNotification>
          addNotifications([notification])
        }
        notiSnackbar()
      },
    })

    // 프로젝트 초대 알림 핸들러
    addEventListener(eventSource, {
      eventType: "INVITE_PROJECT",
      callback: event => {
        if (onInviteProject) onInviteProject(event)
        else {
          const msgEvent = event as MessageEvent
          const notification = JSON.parse(
            msgEvent.data,
          ) as Notification<InviteProjectNotification>
          addNotifications([notification])
        }
        notiSnackbar()
      },
    })

    // 워크스페이스 강퇴 알림 핸들러
    addEventListener(eventSource, {
      eventType: "DEPORTATION_WORKSPACE",
      callback: event => {
        if (onDeportationWorkspace) onDeportationWorkspace(event)
        else {
          const msgEvent = event as MessageEvent
          const notification = JSON.parse(
            msgEvent.data,
          ) as Notification<DeportationWorkspaceNotification>
          addNotifications([notification])
        }
        notiSnackbar()
      },
    })

    // 프로젝트 강퇴 알림 핸들러
    addEventListener(eventSource, {
      eventType: "DEPORTATION_PROJECT",
      callback: event => {
        if (onDeportationProject) onDeportationProject(event)
        else {
          const msgEvent = event as MessageEvent
          const notification = JSON.parse(
            msgEvent.data,
          ) as Notification<DeportationProjectNotification>
          addNotifications([notification])
        }
        notiSnackbar()
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
