import React from "react"
import { Box, Divider } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import TaskCreateModal from "components/task/modal/TaskCreateModal"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import SidebarMenu from "./SidebarMenu"
import WorkSpaceProfile from "./WorkspaceProfile"
import IconBtn from "./IconBtn"

const Sidebar: React.FC = () => {
  const [taskCreateModalOpen, setTaskCreateModalOpen] = React.useState(false)
  const openTaskCreateModal = () => setTaskCreateModalOpen(true)

  return (
    <Box
      component="section"
      sx={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        WebkitScrollSnapType: "none",
        overflowY: "scroll",
        height: "92%",
        "&::-webkit-scrollbar": {
          width: "0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        component="div"
        sx={{
          height: "45%",
          minHeight: "320px",
          maxHeight: "360px",
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "white",
        }}
      >
        <WorkSpaceProfile />

        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            mt: 1,
            zIndex: 1,
            minHeight: "50px",
          }}
        >
          <IconBtn text="구성원보기" icon={<GroupsIcon fontSize="large" />} />
          <IconBtn
            text="할일추가"
            icon={<AddCircleIcon fontSize="large" />}
            onClick={openTaskCreateModal}
          />
        </Box>

        <Divider
          sx={{
            border: 1,
            width: "80%",
            marginX: "auto",
            color: "#eeeeef",
            mt: 2,
          }}
        />
      </Box>
      <Box component="section" sx={{ height: "50%" }}>
        <SidebarMenu />
      </Box>
      <TaskCreateModal
        open={taskCreateModalOpen}
        handleClose={() => setTaskCreateModalOpen(false)}
      />
    </Box>
  )
}

export default Sidebar
