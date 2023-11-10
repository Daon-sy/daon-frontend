import React from "react"
import AddTaskIcon from "@mui/icons-material/AddTask"
import PeopleIcon from "@mui/icons-material/People"
import TaskCreateModal from "components/modal/task/TaskCreateModal"
import SidebarMenu from "./SidebarMenu"
import WorkSpaceProfile from "./WorkspaceProfile"
import IconBtn from "./IconBtn"

const Sidebar: React.FC = () => {
  const [taskCreateModalOpen, setTaskCreateModalOpen] = React.useState(false)

  const openTaskCreateModal = () => setTaskCreateModalOpen(true)

  return (
    <>
      <WorkSpaceProfile />
      <IconBtn text="구성원초대" icon={<PeopleIcon />} />
      <IconBtn
        text="할일추가"
        icon={<AddTaskIcon />}
        onClick={openTaskCreateModal}
      />
      <SidebarMenu />
      <TaskCreateModal
        open={taskCreateModalOpen}
        handleClose={() => setTaskCreateModalOpen(false)}
      />
    </>
  )
}

export default Sidebar
