import { create } from "zustand"

interface TaskDetailParam {
  workspaceId: number
  projectId: number
  boardId: number
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

interface TaskListFilter {
  keyword?: string
  projectId?: number
  boardId?: number
  my?: boolean
  emergency?: boolean
  taskManager?: boolean
}

interface TaskListFilterStore {
  filter: TaskListFilter
  clear: () => void
  setFilter: (filterParam: TaskListFilter) => void
}

export const getTaskListFilterStore = create<TaskListFilterStore>(set => ({
  filter: {
    keyword: "",
    projectId: undefined,
    boardId: undefined,
    my: false,
    emergency: false,
    taskManager: false,
  },
  clear: () => {
    set({
      filter: {
        keyword: "",
        projectId: undefined,
        boardId: undefined,
        my: false,
        emergency: false,
        taskManager: false,
      },
    })
  },
  setFilter: (filterParam: TaskListFilter) =>
    set(() => ({ filter: filterParam })),
}))

export default { getTaskDetailViewStore, getTaskListFilterStore }
