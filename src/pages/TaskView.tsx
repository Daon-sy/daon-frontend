import React from "react"
import TaskKanbansWrapper from "components/task/TaskKanbansWrapper"

const TaskView: React.FC = () => {
  return (
    <div>
      <h1>보드 내의 전체 할일 View 페이지</h1>
      <TaskKanbansWrapper />
    </div>
  )
}

export default TaskView
