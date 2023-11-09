import { create } from "zustand"
import { CellWidth } from "_types/TaskTableType"

interface TaskTableStore {
  cellWidth: CellWidth
  init: () => void
  setCellWidth: (cellWidth: CellWidth) => void
}

export const getTaskTableStore = create<TaskTableStore>(set => ({
  cellWidth: {
    titleCellWidth: 400,
    boardCellWidth: 120,
    endDateCellWidth: 70,
    taskManagerCellWidth: 100,
  },
  init: () =>
    set({
      cellWidth: {
        titleCellWidth: 400,
        boardCellWidth: 120,
        endDateCellWidth: 70,
        taskManagerCellWidth: 100,
      },
    }),
  setCellWidth: (cellWidth: CellWidth) => set(() => ({ cellWidth })),
}))

export default { getTaskTableStore }
