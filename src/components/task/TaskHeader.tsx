import React from "react"
import {
  Box,
  Checkbox,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material"
import TableChartIcon from "@mui/icons-material/TableChart"
import SearchIcon from "@mui/icons-material/Search"
import { TaskListApiParams } from "api/task"
import { getTaskListFilterStore } from "store/taskStore"
import { getProjectsStore, getWorkspaceStore } from "store/userStore"
import useFetchBoardList from "hooks/project/useFetchBoardList"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import TableRowsIcon from "@mui/icons-material/TableRows"

const SelectItem = styled(MenuItem)({
  fontSize: 14,
})

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
  const { myProfile } = getWorkspaceStore()
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
    if (taskListApiParams?.my) setFilter({ my: true })
    else clearFilter()
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
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 1,
        p: 1,
        color: "primary.main",
        position: "relative",
      }}
    >
      {/* 관리자 모드 */}
      {myProfile?.role === "WORKSPACE_ADMIN" ? (
        <Box sx={{ position: "absolute", right: 0, top: -40 }}>
          <Box ml={1} display="flex" alignItems="center">
            <Checkbox
              size="small"
              color="secondary"
              checked={filter.taskManager || false}
              onChange={e => {
                setFilter({ ...filter, taskManager: e.target.checked })
              }}
              sx={{ width: 30, height: 30 }}
            />
            <Tooltip
              title="담당자가 할당되지 않은 할일 목록"
              placement="top-end"
              arrow
            >
              <Typography fontSize={16} color="yellow">
                관리자 모드
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      ) : null}

      {/* 검색어 입력 */}
      <Box height="100%">
        <TextField
          // fullWidth
          autoComplete="off"
          size="small"
          sx={{ fontSize: 14, width: 400 }}
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
      {/* 긴급 선택 */}
      <Box ml={1} display="flex" alignItems="center" flexGrow={1}>
        <Box ml={1} display="flex" alignItems="center">
          <Typography fontSize={14} color="error">
            긴급
          </Typography>
          <Checkbox
            size="small"
            color="error"
            checked={filter.emergency || false}
            onChange={e => {
              setFilter({ ...filter, emergency: e.target.checked })
            }}
            sx={{ width: 30, height: 30 }}
          />
        </Box>
        {taskListApiParams?.my ? null : (
          <Box ml={1} display="flex" alignItems="center">
            <Typography fontSize={14}>내 할일</Typography>
            <Checkbox
              size="small"
              checked={filter.my}
              disabled={taskListApiParams?.my}
              onChange={e => {
                setFilter({ ...filter, my: e.target.checked })
              }}
              sx={{ width: 30, height: 30 }}
            />
          </Box>
        )}
      </Box>
      {/* 프로젝트 선택 */}
      {/* multi select ?? 추후 고려 Select Item Grouping */}
      {taskListApiParams?.projectId ? null : (
        <Box ml={2} display="flex" alignItems="center">
          <Typography fontSize={18}>프로젝트</Typography>
          <FormControl sx={{ width: 120, ml: 1 }}>
            <Select
              displayEmpty
              size="small"
              sx={{ fontSize: 14 }}
              input={<OutlinedInput />}
              disabled={!!taskListApiParams?.projectId}
              onChange={e => {
                const pjId = Number(e.target.value)
                setFilter({ ...filter, projectId: pjId, boardId: 0 })
              }}
              value={filter.projectId || 0}
              renderValue={selected => {
                if (!filter.projectId) return "전체"
                return projects.find(project => project.projectId === selected)
                  ?.title
              }}
            >
              <SelectItem value={0}>전체</SelectItem>
              {projects.map(project => (
                <SelectItem value={project.projectId}>
                  {project.title}
                </SelectItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {/* 보드 선택 */}
      <Box ml={2} display="flex" alignItems="center">
        <Typography fontSize={18}>보드</Typography>
        <FormControl sx={{ width: 120, ml: 1 }}>
          <Select
            disabled={!filter.projectId}
            displayEmpty
            size="small"
            sx={{ fontSize: 14 }}
            input={<OutlinedInput />}
            onChange={e => {
              setFilter({ ...filter, boardId: Number(e.target.value) })
            }}
            value={filter.boardId || 0}
            renderValue={selected => {
              if (!filter.boardId) return "전체"
              return boards.find(board => board.boardId === selected)?.title
            }}
          >
            {filter.projectId ? (
              Array.of(
                <SelectItem value={0}>전체</SelectItem>,
                ...boards.map(board => (
                  <SelectItem value={board.boardId}>{board.title}</SelectItem>
                )),
              )
            ) : (
              <SelectItem disabled value={0}>
                먼저 프로젝트를 선택하세요
              </SelectItem>
            )}
          </Select>
        </FormControl>
      </Box>
      {/* 뷰 방식 변경 */}
      <Box ml={1}>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewType}
          sx={{
            backgroundColor: "white",
          }}
          size="small"
        >
          <Tooltip title="칸반보드 뷰" arrow>
            <ToggleButton value="kanban" selected={viewType === "kanban"}>
              <TableChartIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="테이블 뷰" arrow>
            <ToggleButton value="table" selected={viewType === "table"}>
              <TableRowsIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}

export default TaskHeader
