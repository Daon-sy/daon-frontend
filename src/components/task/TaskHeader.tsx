import React from "react"
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import TableChartIcon from "@mui/icons-material/TableChart"
import SearchIcon from "@mui/icons-material/Search"
import { TaskListApiParams } from "api/task"
import { getTaskListFilterStore } from "store/taskStore"
import { getProjectsStore, getWorkspaceStore } from "store/userStore"
import useFetchBoardList from "hooks/project/useFetchBoardList"

interface Props {
  viewType?: string
  setViewType: (viewType: string) => void
  taskListApiParams?: TaskListApiParams
}

const TaskHeader: React.FC<Props> = ({
  viewType = "kanban",
  setViewType,
  taskListApiParams,
}: Props) => {
  const { filter, setFilter } = getTaskListFilterStore()
  // TODO 이거 안됌. 고치기
  const { projectId } = filter
  const { workspace } = getWorkspaceStore()
  const { projects } = getProjectsStore()
  const { boards, fetchBoardList } = useFetchBoardList(
    workspace?.workspaceId || 0,
  )

  const handleViewType = (
    e: React.MouseEvent<HTMLElement>,
    newViewType: string | null,
  ) => {
    if (newViewType !== null) {
      setViewType(newViewType)
    }
  }

  const { clear: clearFilter } = getTaskListFilterStore()

  React.useEffect(() => {
    clearFilter()
  }, [taskListApiParams?.my, taskListApiParams?.bookmarked])

  React.useEffect(() => {
    if (taskListApiParams?.projectId) {
      setFilter({ projectId: taskListApiParams.projectId })
    }
  }, [taskListApiParams?.projectId])

  React.useEffect(() => {
    if (projectId) {
      fetchBoardList(projectId)
    }
  }, [projectId])

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", backgroundColor: "#FFFFFF" }}
    >
      {/* 뷰 방식 변경 */}
      <Box>
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
      {/* 검색어 입력 */}
      <Box height="100%">
        <TextField
          fullWidth
          autoComplete="off"
          size="small"
          sx={{ fontSize: 14 }}
          placeholder="할 일 검색"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter({ ...filter, keyword: e.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            style: { fontSize: 14 },
          }}
        />
      </Box>
      {/* 프로젝트 선택 */}
      {/* multi select ?? 추후 고려 Select Item Grouping */}
      {taskListApiParams?.projectId ? null : (
        <Box width={200}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              size="small"
              sx={{ fontSize: 14 }}
              input={<OutlinedInput />}
              onChange={e =>
                setFilter({ ...filter, projectId: Number(e.target.value) })
              }
              value={filter.projectId}
              renderValue={selected => {
                return projects.find(project => project.projectId === selected)
                  ?.title
              }}
            >
              <MenuItem value={undefined}>선택안함</MenuItem>
              {projects.map(project => (
                <MenuItem value={project.projectId}>{project.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {/* 보드 선택 */}
      <Box width={200}>
        <FormControl fullWidth>
          <Select
            displayEmpty
            size="small"
            sx={{ fontSize: 14 }}
            input={<OutlinedInput />}
            onChange={e =>
              setFilter({ ...filter, boardId: Number(e.target.value) })
            }
            value={filter.boardId}
            renderValue={selected => {
              if (!filter.boardId) return ""
              return boards.find(board => board.boardId === selected)?.title
            }}
          >
            {filter.projectId ? (
              Array.of(
                <MenuItem value={undefined}>선택안함</MenuItem>,
                ...boards.map(board => (
                  <MenuItem value={board.boardId}>{board.title}</MenuItem>
                )),
              )
            ) : (
              <MenuItem disabled>먼저 프로젝트를 선택하세요</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      {/* 담당자 선택 */}
      {taskListApiParams?.my ? null : (
        <Box>
          <Switch
            checked={filter.my}
            onChange={e => {
              setFilter({ ...filter, my: e.target.checked })
            }}
          />
        </Box>
      )}
      {/* 긴급 선택 */}
      <Box>
        <Switch
          color="error"
          checked={filter.emergency}
          onChange={e => {
            setFilter({ ...filter, emergency: e.target.checked })
          }}
        />
      </Box>
    </Box>
  )
}

export default TaskHeader
