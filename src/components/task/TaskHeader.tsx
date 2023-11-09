import React from "react"
import Box from "@mui/material/Box"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import TableChartIcon from "@mui/icons-material/TableChart"

interface Props {
  viewType?: string
  setViewType: (viewType: string) => void
}

// TODO 필터 개발
const TaskHeader: React.FC<Props> = ({
  viewType = "kanban",
  setViewType,
}: Props) => {
  const handleViewType = (
    e: React.MouseEvent<HTMLElement>,
    newViewType: string | null,
  ) => {
    if (newViewType !== null) {
      setViewType(newViewType)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box flexGrow={1}>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewType}
          sx={{
            backgroundColor: "white",
          }}
        >
          <ToggleButton value="kanban">
            <ViewKanbanIcon />
          </ToggleButton>
          <ToggleButton value="table">
            <TableChartIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>filter</Box>
    </Box>
  )
}

export default TaskHeader
