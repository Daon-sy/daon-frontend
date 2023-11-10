import React from "react"
import AddTaskIcon from "@mui/icons-material/AddTask"
import PeopleIcon from "@mui/icons-material/People"
import SidebarMenu from "./SidebarMenu"
import WorkSpaceProfile from "./WorkspaceProfile"
import IconBtn from "./IconBtn"

const Sidebar: React.FC = () => {
  return (
    <>
      <WorkSpaceProfile />
      <IconBtn text="구성원초대" icon={<PeopleIcon />} />
      <IconBtn text="할일추가" icon={<AddTaskIcon />} />
      <SidebarMenu />
    </>
  )
}

export default Sidebar
