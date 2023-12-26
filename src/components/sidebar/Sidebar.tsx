import React from "react"
import { Box, Button } from "@mui/material"
import WorkspaceSettingsModal from "components/workspace/modal/WorkspaceSettingsModal"
import SidebarMenu from "./SidebarMenu"
import WorkSpaceProfile from "./WorkspaceProfile"
import IconBtnWrapper from "./IconBtnWrapper"

const Sidebar: React.FC = () => {
  const [workspaceManageModalOpen, setWorkspaceManageModalOpen] =
    React.useState(false)
  return (
    <Box
      component="section"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        component="div"
        sx={{
          height: "195px",
          width: "100%",
          top: 0,
          zIndex: 100,
          bgcolor: "white",
        }}
      >
        <WorkSpaceProfile />
        <IconBtnWrapper />
      </Box>
      <Box
        component="div"
        sx={{
          boxSizing: "border-box",
          height: "calc(100vh - 288px)",
        }}
      >
        <SidebarMenu />
      </Box>
      <Box sx={{ mb: 1, mx: 2 }}>
        <Button
          fullWidth
          size="medium"
          variant="contained"
          onClick={() => {
            setWorkspaceManageModalOpen(true)
          }}
        >
          워크스페이스 설정
        </Button>
      </Box>
      {workspaceManageModalOpen ? (
        <WorkspaceSettingsModal
          open={workspaceManageModalOpen}
          handleClose={() => setWorkspaceManageModalOpen(false)}
        />
      ) : null}
    </Box>
  )
}

export default Sidebar
