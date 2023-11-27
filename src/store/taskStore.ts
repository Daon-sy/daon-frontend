import { create } from "zustand"

interface TaskDetailParam {
  workspaceId: number
  projectId: number
  taskId: number
}

interface TaskDetailViewStore {
  taskDetailParam?: TaskDetailParam
  clear: () => void
  setTaskDetailParam: (param: TaskDetailParam) => void
}

export const getTaskDetailViewStore = create<TaskDetailViewStore>(set => ({
  taskDetailParam: undefined,
  clear: () => set({ taskDetailParam: undefined }),
  setTaskDetailParam: (taskDetailParam: TaskDetailParam) =>
    set(() => ({ taskDetailParam })),
}))

export default { getTaskDetailViewStore }
