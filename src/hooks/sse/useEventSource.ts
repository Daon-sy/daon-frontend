import React from "react"
import { EventSourcePolyfill } from "event-source-polyfill"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/tokenStore"
import { useNavigate } from "react-router-dom"
import { useAlert } from "hooks/useAlert"

type EventType =
  | "CONNECTED"
  | "MESSAGE"
  | "INVITE_WORKSPACE"
  | "INVITE_PROJECT"
  | "DEPORTATION_WORKSPACE"
  | "DEPORTATION_PROJECT"
  | "REGISTERED_TASK_MANAGER"

const heartbeatTimeout = 180_000

const addEventListener = (
  eventsource: EventSourcePolyfill,
  {
    eventType,
    callback,
  }: {
    eventType: EventType
    callback: () => void
  },
) => {
  eventsource.addEventListener(eventType, callback)
}

interface Props {
  ssePath: string
  onEventRaised?: () => void
  onMessage?: () => void
}

const useEventSource = ({ ssePath, onMessage, onEventRaised }: Props) => {
  const { token, clear } = getTokenStore()
  const [eventRaised, setEventRaised] = React.useState(false)
  const { addError } = useAlert()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token])

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
      callback: () => {
        if (onMessage) onMessage()
        setEventRaised(true)
      },
    })

    eventSource.onerror = e => {
      const { error } = e as ErrorEvent
      eventSource?.close()
      if (error.message === "Failed to fetch") {
        addError("네트워크 오류가 발생하였습니다")
        clear()
        return
      }
      subscribe()
    }
  }

  React.useEffect(() => {
    subscribe()
    return () => eventSource?.close()
  }, [ssePath])

  React.useEffect(() => {
    if (eventRaised && onEventRaised) {
      onEventRaised()
      setEventRaised(false)
    }
  }, [eventRaised])
}

export default useEventSource
