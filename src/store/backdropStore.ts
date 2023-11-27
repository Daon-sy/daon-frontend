import { create } from "zustand"

interface BackdropStore {
  backdropOpen: boolean
  handleBackdropOpen: () => void
  handleBackdropClose: () => void
}

export const getBackdropStore = create<BackdropStore>(set => ({
  backdropOpen: false,
  handleBackdropOpen: () => set({ backdropOpen: true }),
  handleBackdropClose: () => {
    setTimeout(() => {
      set({ backdropOpen: false })
    }, 500)
  },
}))

export default { getBackdropStore }
