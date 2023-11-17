import { create } from "zustand"

interface BackdropStore {
  backdropOpen: boolean
  handleBackdropOpen: () => void
  handleBackdropClose: () => void
}

export const getBackdropStore = create<BackdropStore>(set => ({
  backdropOpen: false,
  handleBackdropOpen: () => set({ backdropOpen: true }),
  handleBackdropClose: () => set({ backdropOpen: false }),
}))

export default { getBackdropStore }
