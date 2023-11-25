import React from "react"
import { EventSourcePolyfill } from "event-source-polyfill"
import { API_SERVER_URL } from "env"
import { getTokenStore } from "store/tokenStore"

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
  const { token } = getTokenStore()
  const [eventRaised, setEventRaised] = React.useState(false)

  React.useEffect(() => {
    const eventSource = new EventSourcePolyfill(
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
      console.error(e)
      eventSource.close()
    }

    return () => eventSource?.close()
  }, [])

  React.useEffect(() => {
    if (eventRaised && onEventRaised) {
      onEventRaised()
      setEventRaised(false)
    }
  }, [eventRaised])
}

export default useEventSource
