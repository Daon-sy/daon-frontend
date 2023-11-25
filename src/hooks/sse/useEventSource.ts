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

const heartbeatTimeout = 130_000

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
  const [eventSource, setEventSource] = React.useState<EventSourcePolyfill>()
  const [eventRaised, setEventRaised] = React.useState(false)

  React.useEffect(() => {
    const es = new EventSourcePolyfill(
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

    addEventListener(es, {
      eventType: "MESSAGE",
      callback: () => {
        if (onMessage) onMessage()
        setEventRaised(true)
      },
    })

    setEventSource(es)

    return () => eventSource?.close()
  }, [])

  React.useEffect(() => {
    if (eventRaised && onEventRaised) {
      onEventRaised()
      setEventRaised(false)
    }
  }, [eventRaised])

  return () => eventSource?.close()
}

export default useEventSource
