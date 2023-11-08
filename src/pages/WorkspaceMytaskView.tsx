import React from "react"
import TaskKanbansWrapper from "components/task/TaskKanbansWrapper"

const WorkspaceMytaskView: React.FC = () => {
  return (
    <div>
      <h1>워크스페이스 내의 내 할일 View</h1>
      <TaskKanbansWrapper />
    </div>
  )
}

export default WorkspaceMytaskView
