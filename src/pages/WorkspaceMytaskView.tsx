import React from "react"
import TaskView from "components/task/TaskView"

const WorkspaceMytaskView: React.FC = () => {
  return (
    <div>
      <h1>워크스페이스 내의 내 할일 View</h1>
      <TaskView />
    </div>
  )
}

export default WorkspaceMytaskView
