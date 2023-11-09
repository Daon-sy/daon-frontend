import React from "react"
import TaskView from "components/task/TaskView"

const BoardTaskView: React.FC = () => {
  return (
    <div>
      <h1>보드 내의 전체 할일 View 페이지</h1>
      <TaskView />
    </div>
  )
}

export default BoardTaskView
