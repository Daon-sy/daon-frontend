import { create } from "zustand"
import { CreateWorkspaceRequest } from "api/workspaceApi"

interface CreateWorkspaceStore {
  createWorkspaceRequest: CreateWorkspaceRequest
  clear: () => void
  setCreateWorkspaceRequest: (
    createWorkspaceRequest: CreateWorkspaceRequest,
  ) => void
}

export const useCreateWorkspaceStore = create<CreateWorkspaceStore>(set => ({
  createWorkspaceRequest: {
    workspace: {
      name: "",
      imageUrl: null,
      description: "",
      subject: "",
    },
    profile: {
      nickname: "",
      imageUrl: null,
    },
  },
  clear: () =>
    set({
      createWorkspaceRequest: {
        workspace: {
          name: "",
          imageUrl: null,
          description: "",
          subject: "",
        },
        profile: {
          nickname: "",
          imageUrl: null,
        },
      },
    }),
  setCreateWorkspaceRequest: (createWorkspaceRequest: CreateWorkspaceRequest) =>
    set(() => ({ createWorkspaceRequest })),
}))

export default { useCreateWorkspaceStore }
