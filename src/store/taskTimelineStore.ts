import { create } from "zustand"
import { TimelineTableProps } from "_types/TaskTimelineType"

interface TaskTimelineStore {
  props: TimelineTableProps
  init: () => void
  setProps: (props: TimelineTableProps) => void
}

export const getTaskTimelineStore = create<TaskTimelineStore>(set => ({
  props: {
    dateWidth: 10,
    headerHeight: 50,
    taskHeight: 45,
  },
  init: () =>
    set({
      props: {
        dateWidth: 10,
        headerHeight: 50,
        taskHeight: 45,
      },
    }),
  setProps: (props: TimelineTableProps) => set(() => ({ props })),
}))

export default { getTaskTableStore: getTaskTimelineStore }
