import * as React from "react"
import WorkSpaceProfile from "./WorkspaceProfile"
import Mytask from "./Mytask"
import ProjectList from "./ProjectList"

const Sidebar: React.FC = () => {
  return (
    <>
      <WorkSpaceProfile />
      <Mytask />
      <ProjectList />
    </>
  )
}

export default Sidebar
