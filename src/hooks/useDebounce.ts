import React from "react"

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)
  const [debouncing, setDebouncing] = React.useState(false)

  React.useEffect(() => {
    setDebouncing(true)
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      setDebouncing(false)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return { debouncedValue, debouncing }
}

export default useDebounce
