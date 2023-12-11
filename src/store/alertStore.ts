import React from "react"
import { create } from "zustand"

interface AlertProps {
  children?: React.ReactNode
  handleConfirm?: () => void
}
interface AlertStore {
  alertProps?: AlertProps
  clear: () => void
  setAlertProps: (alertProps: AlertProps) => void
}

export const getAlertStore = create<AlertStore>(set => ({
  alertProps: undefined,
  clear: () => set({ alertProps: undefined }),
  setAlertProps: (alertProps: AlertProps) => set(() => ({ alertProps })),
}))

export default { getAlertStore }
