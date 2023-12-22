import React from "react"

const useThrottling = (callback: () => void, delay: number) => {
  const [isThrottling, setIsThrottling] = React.useState(false)

  return () => {
    if (!isThrottling) {
      callback()
      setIsThrottling(true)

      setTimeout(() => {
        setIsThrottling(false)
      }, delay)
    }
  }
}

export default useThrottling
