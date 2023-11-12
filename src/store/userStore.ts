import { create } from "zustand"
import { Workspace } from "_types/WorkspaceType"

interface WorkspaceStore {
  workspace: Workspace | null
  clear: () => void
  setWorkspace: (workspace: Workspace) => void
}

export const getWorkspaceStore = create<WorkspaceStore>(set => ({
  workspace: {
    id: 5,
    title: "test workspace",
    division: "GROUP",
    imageUrl: null,
  },
  clear: () => set({ workspace: null }),
  setWorkspace: (workspace: Workspace) => set(() => ({ workspace })),
}))

export default { getWorkspaceStore }
