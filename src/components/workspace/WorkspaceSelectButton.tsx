import React from "react"
import { Link } from "react-router-dom"
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import useFetchWorkspaceList from "hooks/workspace/useFetchWorkspaceList"
import { useTitleDialog } from "components/common/TitleDialog"
import CreateWorkspace from "components/workspace/CreateWorkspace"

const WorkspaceSelectButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { workspace } = getWorkspaceStore()
  const { workspaces, fetchWorkspaceList } = useFetchWorkspaceList(false)

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
            {workspace ? workspace.title : "워크스페이스 선택"}
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
        >
          {workspaces
            .filter(ws =>
              workspace ? ws.workspaceId !== workspace.workspaceId : true,
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
                  <MenuItem key={ws.workspaceId} onClick={handleCloseMenu}>
                    <Typography variant="button" textAlign="center">
                      {ws.title}
                    </Typography>
                  </MenuItem>
                </Tooltip>
              </Link>
            ))}
          <Divider />
          <MenuItem
            onClick={() => {
              handleCloseMenu()
              openCreateWorkspaceDialog()
            }}
          >
            <Typography variant="button" textAlign="center">
              워크스페이스 생성
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
      <TitleDialog title="워크스페이스 생성" maxWidth="sm">
        <CreateWorkspace handleCancel={closeCreateWorkspaceDialog} />
      </TitleDialog>
    </Box>
  )
}

export default WorkspaceSelectButton
