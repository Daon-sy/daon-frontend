import { Box } from "@mui/material"
import React from "react"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import TaskHeader from "components/task/TaskHeader"
import TaskKanbansWrapper from "components/task/kanban/TaskKanbansWrapper"
import TaskTableWrapper from "components/task/table/TaskTableWrapper"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import useEventSource from "hooks/sse/useEventSource"
import useFetchTaskList from "hooks/task/useFetchTaskList"

interface Params {
  projectId?: number
  boardId?: number
  bookmark?: boolean
  my?: boolean
}

interface TaskViewProps {
  params?: Params
}

const TaskView: React.FC<TaskViewProps> = ({ params }) => {
  const [viewType, setViewType] = React.useState<string>("kanban")
  const { workspace } = getWorkspaceStore()
  const { taskDetailParam, clear } = getTaskDetailViewStore()

  const { tasks, fetchTaskList } = useFetchTaskList({
    workspaceId: workspace?.workspaceId || 0,
    params,
  })

  useEventSource({
    ssePath: `/api/subscribe/workspaces/${workspace?.workspaceId}/type?${
      params ? new URLSearchParams(params as string) : ""
    }`,
    onEventRaised: fetchTaskList,
  })

  const renderView = () => {
    switch (viewType) {
      case "kanban":
        return <TaskKanbansWrapper tasks={tasks} />
      case "table":
        return <TaskTableWrapper tasks={tasks} />
      default:
        return <TaskKanbansWrapper tasks={tasks} />
    }
  }

  return (
    <Box sx={{ height: "100%" }}>
      <TaskHeader viewType={viewType} setViewType={setViewType} />
      {renderView()}
      {taskDetailParam ? (
        <TaskDetailModal
          workspaceId={taskDetailParam.workspaceId}
          projectId={taskDetailParam.projectId}
          taskId={taskDetailParam.taskId}
          open={!!taskDetailParam}
          handleClose={clear}
        />
      ) : null}
    </Box>
  )
}

export default TaskView
