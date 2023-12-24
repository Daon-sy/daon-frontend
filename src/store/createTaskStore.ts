import { create } from "zustand"

interface CreateTaskStore {
  isOpen: boolean
  open: (projectId?: number) => void
  close: () => void
  projectIdInit?: number
}

export const getCreateTaskStore = create<CreateTaskStore>(set => ({
  isOpen: false,
  open: projectId =>
    set(state => ({ ...state, isOpen: true, projectIdInit: projectId })),
  close: () => set({ isOpen: false, projectIdInit: undefined }),
  projectIdInit: undefined,
}))

export default { getCreateTaskStore }
