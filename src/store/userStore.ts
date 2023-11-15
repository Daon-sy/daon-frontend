import { create } from "zustand"
import { Workspace } from "_types/workspace"

interface WorkspaceStore {
  workspace: Workspace | null
  clear: () => void
  setWorkspace: (workspace: Workspace) => void
}

export const getWorkspaceStore = create<WorkspaceStore>(set => ({
  workspace: {
    workspaceId: 5,
    title: "test workspace",
    division: "GROUP",
    imageUrl: undefined,
    description: undefined,
  },
  clear: () => set({ workspace: null }),
  setWorkspace: (workspace: Workspace) => set(() => ({ workspace })),
}))

export default { getWorkspaceStore }
