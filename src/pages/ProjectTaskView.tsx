import React from "react"
import TaskView from "components/task/TaskView"

const ProjectTaskView: React.FC = () => {
  return (
    <div>
      <h1>프로젝트 전체 할일 View 페이지</h1>
      <TaskView />
    </div>
  )
}

export default ProjectTaskView