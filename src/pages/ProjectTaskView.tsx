import React from "react"
import TaskKanbansWrapper from "components/task/TaskKanbansWrapper"

const ProjectTaskView: React.FC = () => {
  return (
    <div>
      <h1>프로젝트 전체 할일 View 페이지</h1>
      <TaskKanbansWrapper />
    </div>
  )
}

export default ProjectTaskView
