import React from "react"
import {
  Box,
  Button,
  Divider,
  Fade,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FolderIcon from "@mui/icons-material/Folder"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { getWorkspaceStore } from "store/userStore"
import { Board } from "_types/project"
import useCreateBoard from "hooks/project/useCreateBoard"
import useFetchBoardList from "hooks/project/useFetchBoardList"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"

const allowedEdit: WORKSPACE_PARTICIPANT_ROLE[] = [
  "WORKSPACE_ADMIN",
  "PROJECT_ADMIN",
]

interface Props {
  projectId?: number
  handleBoardSelect: (board: Board | undefined) => void
  currentBoard?: Board
  skipFirst?: boolean
}

const BoardSelectButton: React.FC<Props> = ({
  projectId,
  handleBoardSelect,
  currentBoard,
  skipFirst = true,
}: Props) => {
  const { myProfile } = getWorkspaceStore()
  const [skipHandleSelect, setSkipHandleSelect] = React.useState(skipFirst)
  const [selectedBoard, setSelectedBoard] = React.useState<Board | undefined>(
    currentBoard,
  )
  React.useEffect(() => {
    if (skipHandleSelect) {
      setSkipHandleSelect(false)
      return
    }
    handleBoardSelect(selectedBoard)
  }, [selectedBoard])

  const { workspace } = getWorkspaceStore()
  const { boards, fetchBoardList } = useFetchBoardList(
    workspace?.workspaceId || 0,
  )
  React.useEffect(() => {
    if (!currentBoard) setSelectedBoard(undefined)
    if (projectId) {
      fetchBoardList(projectId)
    }
  }, [projectId])

  const bdSearchFilterRef = React.useRef<HTMLInputElement | null>(null)
  const [bdFilterKeyword, setBdFilterKeyword] = React.useState("")

  const [boardAddField, setBoardAddField] = React.useState(false)
  const [boardNameToAdd, setBoardNameToAdd] = React.useState("")
  const { fetch: createBoard } = useCreateBoard({
    workspaceId: workspace?.workspaceId || 0,
    projectId: projectId || 0,
    boardTitle: boardNameToAdd,
  })

  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    if (btnRef) setAnchorEl(btnRef.current)
  }, [btnRef])

  const open = () => setIsMenuOpen(true)
  const close = () => setIsMenuOpen(false)

  React.useEffect(() => {
    if (!isMenuOpen) {
      setBoardNameToAdd("")
      setBoardAddField(false)
      setBdFilterKeyword("")
    }
  }, [isMenuOpen])

  const renderAddButton = () => {
    if (!(projectId && myProfile && allowedEdit.includes(myProfile?.role)))
      return null
    return (
      <Box p={1}>
        {boardAddField ? (
          <TextField
            fullWidth
            autoFocus
            value={boardNameToAdd}
            autoComplete="off"
            size="small"
            sx={{
              fontSize: 14,
              height: 40,
            }}
            placeholder="Enter 입력시 등록"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBoardNameToAdd(e.target.value)
            }}
            InputProps={{
              style: { fontSize: 14 },
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                createBoard(() => fetchBoardList(projectId))
                setBoardAddField(false)
                setBoardNameToAdd("")
              }
            }}
          />
        ) : (
          <Button
            fullWidth
            variant="outlined"
            size="small"
            sx={{ fontSize: 14 }}
            onClick={() => {
              setBoardAddField(true)
            }}
          >
            보드 추가
          </Button>
        )}
      </Box>
    )
  }

  return (
    <Box width="100%" position="relative">
      <Button
        ref={btnRef}
        fullWidth
        aria-controls={isMenuOpen ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={open}
        // variant="contained"
        variant="outlined"
        disableElevation
        color="primary"
        sx={{
          px: 1,
          display: "flex",
          alignItems: "center",
          borderColor: "#bdbdbd",
        }}
        size="medium"
      >
        <Box display="flex" alignItems="center" width={90}>
          <FolderIcon />
          <Typography ml={1} fontSize={14} fontWeight={500}>
            보드
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 6 / 4, borderColor: "#bdbdbd", borderWidth: 1 / 2 }}
        />
        <Typography
          flexGrow={1}
          fontSize={14}
          fontWeight={500}
          textAlign="start"
          sx={{ color: selectedBoard ? "primary" : "#bdbdbd" }}
        >
          {selectedBoard ? selectedBoard.title : "선택"}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
        open={isMenuOpen}
        onClose={close}
        TransitionComponent={Fade}
        sx={{ left: -1 }}
        slotProps={{
          paper: {
            sx: {
              width: anchorEl && anchorEl.offsetWidth + 1,
              mt: 0.5,
              maxHeight: 350,
              p: 0,
              "& .MuiList-root": { p: 0 },
            },
          },
        }}
      >
        {!projectId ? (
          <MenuItem dense disabled>
            <Box display="flex" alignItems="center" overflow="hidden">
              <Typography
                variant="button"
                fontSize={14}
                textAlign="center"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                프로젝트를 먼저 선택해주세요
              </Typography>
            </Box>
          </MenuItem>
        ) : (
          <Box>
            <Box position="sticky" top={0} bgcolor="white" zIndex={1}>
              <Box px={1} pt={1}>
                <TextField
                  fullWidth
                  autoFocus
                  autoComplete="off"
                  size="small"
                  sx={{
                    fontSize: 14,
                    height: 40,
                  }}
                  placeholder="보드 검색"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBdFilterKeyword(e.target.value)
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    ref: bdSearchFilterRef,
                    style: { fontSize: 14 },
                  }}
                />
              </Box>
            </Box>
            <Box>
              {boards
                .filter(bd =>
                  bd.title
                    .toUpperCase()
                    .includes(bdFilterKeyword.toUpperCase()),
                )
                .map(item => (
                  <MenuItem
                    key={item.boardId}
                    dense
                    onClick={() => {
                      setSelectedBoard(item)
                      close()
                    }}
                    disabled={item.boardId === selectedBoard?.boardId}
                  >
                    <Box display="flex" alignItems="center" overflow="hidden">
                      <Typography
                        variant="button"
                        fontSize={14}
                        textAlign="center"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              {boards.filter(bd =>
                bd.title.toUpperCase().includes(bdFilterKeyword.toUpperCase()),
              ).length <= 0 ? (
                <MenuItem dense disabled>
                  <Box display="flex" alignItems="center" overflow="hidden">
                    <Typography
                      variant="button"
                      fontSize={14}
                      textAlign="center"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      보드가 없습니다
                    </Typography>
                  </Box>
                </MenuItem>
              ) : null}
            </Box>
            {renderAddButton()}
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default BoardSelectButton
