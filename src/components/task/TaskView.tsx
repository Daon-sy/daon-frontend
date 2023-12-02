import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { TaskListApiParams } from "api/task"
import TaskHeader from "components/task/TaskHeader"
import TaskKanbansWrapper from "components/task/kanban/TaskKanbansWrapper"
import TaskTableWrapper from "components/task/table/TaskTableWrapper"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import useEventSource from "hooks/sse/useEventSource"
import useFetchTaskList from "hooks/task/useFetchTaskList"
import Typography from "@mui/material/Typography"
import IconBreadcrumbs from "components/common/IconBreadcrumbs"

interface TaskViewProps {
  params?: TaskListApiParams
  title?: string
}

const TaskView: React.FC<TaskViewProps> = ({ params, title }) => {
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
    <Box height="100%">
      <IconBreadcrumbs />
      {title ? (
        <Typography mt={1} variant="h2" sx={{ fontSize: 24, fontWeight: 900 }}>
          {title}
        </Typography>
      ) : null}
      <Box mt={2}>
        <TaskHeader
          viewType={viewType}
          setViewType={setViewType}
          taskListApiParams={params}
        />
      </Box>
      <Box
        mt={2}
        mb={2}
        height="70%"
        overflow="hidden"
        sx={{
          overflowY: "scroll",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: "8px",
            borderColor: "#C8C8C8FF",
          },
          "&::-webkit-scrollbar-thumb": {
            position: "absolute",
            backgroundColor: "#495e57",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-button": {
            width: "0px",
            height: "0px",
          },
        }}
      >
        {renderView()}
      </Box>
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
