import React from "react"
import { Link } from "react-router-dom"
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { getWorkspaceStore } from "store/userStore"
import useFetchWorkspaceList from "hooks/workspace/useFetchWorkspaceList"
import { useTitleDialog } from "components/common/TitleDialog"
import ColorAvatar from "components/common/ColorAvatar"
import CreateWorkspace from "components/workspace/CreateWorkspace"
import WorkspaceSettingsModal from "components/workspace/modal/WorkspaceSettingsModal"

const WorkspaceSelectButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [workspaceFilterKeyword, setWorkspaceFilterKeyword] = React.useState("")

  const { workspace } = getWorkspaceStore()
  const { workspaces, fetchWorkspaceList } = useFetchWorkspaceList(false)
  const [workspaceManageModalOpen, setWorkspaceManageModalOpen] =
    React.useState(false)

  const {
    TitleDialog,
    open: openCreateWorkspaceDialog,
    close: closeCreateWorkspaceDialog,
  } = useTitleDialog()

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    fetchWorkspaceList()
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="워크스페이스 메뉴">
          <Button
            color="primary"
            onClick={handleOpenMenu}
            sx={{ my: 2, display: "block" }}
          >
            <Box display="flex" alignItems="center">
              {workspace ? (
                <>
                  <ColorAvatar
                    id={workspace.workspaceId}
                    src={workspace?.imageUrl}
                    name={workspace?.title}
                    sx={{
                      width: 28,
                      height: 28,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {workspace.title}
                  </Typography>
                </>
              ) : (
                "워크스페이스 선택"
              )}
            </Box>
          </Button>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          slotProps={{
            paper: {
              sx: { maxHeight: 400, p: 0, "& .MuiList-root": { p: 0 } },
            },
          }}
        >
          <Box position="sticky" top={0} bgcolor="white" zIndex={1}>
            {/* <MenuItem */}
            {/*  onClick={() => { */}
            {/*    handleCloseMenu() */}
            {/*    setWorkspaceManageModalOpen(true) */}
            {/*  }} */}
            {/*  sx={{ ".MuiDivider-root": { marginTop: 0 } }} */}
            {/* > */}
            {/*  <Typography variant="button" fontWeight={500} color="primary"> */}
            {/*    워크스페이스 설정 */}
            {/*  </Typography> */}
            {/* </MenuItem> */}
            <Box p={1}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => {
                  handleCloseMenu()
                  setWorkspaceManageModalOpen(true)
                }}
              >
                워크스페이스 설정
              </Button>
            </Box>
            <Divider sx={{ fontSize: 10 }}>워크스페이스 목록</Divider>
            <Box px={1} pt={1}>
              <TextField
                fullWidth
                autoComplete="off"
                size="small"
                sx={{
                  // mx: 2,
                  fontSize: 14,
                  height: 40,
                }}
                placeholder="워크스페이스 검색"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkspaceFilterKeyword(e.target.value)
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
          </Box>

          <Box>
            {workspaces
              .filter(ws =>
                workspace ? ws.workspaceId !== workspace.workspaceId : true,
              )
              .filter(ws =>
                ws.title
                  .toUpperCase()
                  .includes(workspaceFilterKeyword.toUpperCase()),
              )
              .map(ws => (
                <Link
                  to={`/workspace/${ws.workspaceId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Tooltip
                    arrow
                    title={ws.description ? ws.description : "설명 없음"}
                  >
                    <MenuItem
                      key={ws.workspaceId}
                      onClick={handleCloseMenu}
                      dense
                      sx={{ px: 1 }}
                    >
                      <Box display="flex" alignItems="center">
                        <ColorAvatar
                          id={ws.workspaceId}
                          src={ws.imageUrl}
                          name={ws.title}
                        />
                        <Typography
                          variant="button"
                          textAlign="center"
                          pl={0.5}
                          py={0.3}
                        >
                          {ws.title}
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Tooltip>
                </Link>
              ))}

            {workspaces
              .filter(ws =>
                workspace ? ws.workspaceId !== workspace.workspaceId : true,
              )
              .filter(ws =>
                ws.title
                  .toUpperCase()
                  .includes(workspaceFilterKeyword.toUpperCase()),
              ).length <= 0 ? (
              <Typography textAlign="center" p={1}>
                검색 결과 없음
              </Typography>
            ) : null}
          </Box>

          <Box
            sx={{ pt: 0.3, position: "sticky", bottom: 0, bgcolor: "white" }}
          >
            <Divider />
            {/* <MenuItem */}
            {/*  onClick={() => { */}
            {/*    handleCloseMenu() */}
            {/*    openCreateWorkspaceDialog() */}
            {/*  }} */}
            {/* > */}
            {/*  <Typography variant="button">워크스페이스 생성</Typography> */}
            {/* </MenuItem> */}
            <Box p={1}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => {
                  handleCloseMenu()
                  openCreateWorkspaceDialog()
                }}
              >
                워크스페이스 생성
              </Button>
            </Box>
          </Box>
        </Menu>
      </Box>
      <TitleDialog title="워크스페이스 생성" maxWidth="sm">
        <CreateWorkspace handleCancel={closeCreateWorkspaceDialog} />
      </TitleDialog>
      {workspaceManageModalOpen ? (
        <WorkspaceSettingsModal
          open={workspaceManageModalOpen}
          handleClose={() => setWorkspaceManageModalOpen(false)}
        />
      ) : null}
    </Box>
  )
}

export default WorkspaceSelectButton
