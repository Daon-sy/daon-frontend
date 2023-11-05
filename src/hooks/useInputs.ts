import React from "react"

const useInputs = <T>(initialData: T) => {
  const [data, setData] = React.useState<T>(initialData)
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
    },
    [data],
  )
  const reset = React.useCallback(() => setData(initialData), [initialData])

  return [data, onChange, reset] as const
}

export default useInputs
