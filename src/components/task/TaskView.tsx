import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { TaskListApiParams } from "api/task"
import IconBreadcrumbs from "components/common/IconBreadcrumbs"
import TaskHeader from "components/task/TaskHeader"
import TaskKanbansWrapper from "components/task/kanban/TaskKanbansWrapper"
import TaskTableWrapper from "components/task/table/TaskTableWrapper"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import useEventSource from "hooks/sse/useEventSource"
import useFetchTaskList from "hooks/task/useFetchTaskList"

interface TaskViewProps {
  params?: TaskListApiParams
}

const TaskView: React.FC<TaskViewProps> = ({ params }) => {
  const [viewType, setViewType] = React.useState<string>("kanban")
  const { workspace } = getWorkspaceStore()
  const { taskDetailParam, clear } = getTaskDetailViewStore()
  const { tasks, fetchTaskList } = useFetchTaskList(
    {
      workspaceId: workspace?.workspaceId || 0,
      params,
    },
    true,
  )

  useEventSource({
    ssePath: `/api/subscribe/workspaces/${workspace?.workspaceId}/type?${
      params ? new URLSearchParams(params as string) : ""
    }`,
    onEventRaised: fetchTaskList,
  })

  React.useEffect(() => {
    fetchTaskList()
  }, [params?.projectId])

  const renderView = () => {
    switch (viewType) {
      case "kanban":
        return (
          <TaskKanbansWrapper
            tasks={tasks}
            renderProject={!params?.projectId}
          />
        )
      case "table":
        return <TaskTableWrapper tasks={tasks} />
      default:
        return <TaskKanbansWrapper tasks={tasks} />
    }
  }

  return (
    <Box sx={{ height: "100%" }}>
      <IconBreadcrumbs />
      <TaskHeader
        viewType={viewType}
        setViewType={setViewType}
        taskListApiParams={params}
      />
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
