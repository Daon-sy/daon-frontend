import { create } from "zustand"
import { CellWidth } from "_types/TaskTableType"

interface TaskTableStore {
  cellWidth: CellWidth
  init: () => void
  setCellWidth: (cellWidth: CellWidth) => void
}

export const getTaskTableStore = create<TaskTableStore>(set => ({
  cellWidth: {
    titleCellWidth: 350,
    boardCellWidth: 120,
    projectCellWidth: 120,
    endDateCellWidth: 80,
    taskManagerCellWidth: 150,
  },
  init: () =>
    set({
      cellWidth: {
        titleCellWidth: 350,
        boardCellWidth: 90,
        projectCellWidth: 90,
        endDateCellWidth: 80,
        taskManagerCellWidth: 100,
      },
    }),
  setCellWidth: (cellWidth: CellWidth) => set(() => ({ cellWidth })),
}))

export default { getTaskTableStore }
