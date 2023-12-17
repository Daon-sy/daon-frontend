import React from "react"
import { Box, Button } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { TaskListApiParams } from "api/task"
import TaskHeader from "components/task/TaskHeader"
import TaskKanbansWrapper from "components/task/kanban/TaskKanbansWrapper"
import TaskTableWrapper from "components/task/table/TaskTableWrapper"
import useEventSource from "hooks/sse/useEventSource"
import useFetchTaskList from "hooks/task/useFetchTaskList"
import Typography from "@mui/material/Typography"
import IconBreadcrumbs from "components/common/IconBreadcrumbs"
import { matchPath, useLocation } from "react-router-dom"
import { useCreateTaskModal } from "components/task/CreateTask"
import NoData from "components/common/NoData"
import { AddCircle } from "@mui/icons-material"

interface TaskViewProps {
  params?: TaskListApiParams
  title?: string
}

const TaskView: React.FC<TaskViewProps> = ({ params, title }) => {
  const location = useLocation()
  const [viewType, setViewType] = React.useState<string>("kanban")
  const { workspace } = getWorkspaceStore()
  const { taskDetailParam } = getTaskDetailViewStore()
  const { CreateTaskModal, open: openCreateTaskModal } = useCreateTaskModal()
  const { tasks, fetchTaskList } = useFetchTaskList(
    {
      workspaceId: workspace?.workspaceId || 0,
      params,
    },
    true,
  )

  const isBookmarkTasksLocation = () =>
    matchPath("/workspace/:workspaceId/task/bookmark", location.pathname)
  const isWsMyTasksLocation = () =>
    matchPath("/workspace/:workspaceId/task/my", location.pathname)
  const getEmptySetContent = () => {
    if (isBookmarkTasksLocation()) return "북마크한 할 일이 없습니다"
    if (isWsMyTasksLocation()) return "담당한 할 일이 없습니다"
    return "프로젝트에 생성된 할 일이 없습니다"
  }

  useEventSource({
    ssePath: `/api/subscribe/workspaces/${workspace?.workspaceId}/type?${
      params ? new URLSearchParams(params as string) : ""
    }`,
    onEventRaised: fetchTaskList,
  })

  React.useEffect(() => {
    fetchTaskList()
  }, [params?.projectId])

  React.useEffect(() => {
    if (!taskDetailParam) fetchTaskList()
  }, [taskDetailParam])

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
        return (
          <TaskTableWrapper tasks={tasks} renderProject={!params?.projectId} />
        )
      default:
        return (
          <TaskKanbansWrapper
            tasks={tasks}
            renderProject={!params?.projectId}
          />
        )
    }
  }

  return (
    <Box height="100%">
      <IconBreadcrumbs />
      {title ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            mt={1}
            variant="h2"
            sx={{ fontSize: 24, fontWeight: 900 }}
          >
            {title}
          </Typography>
          <Button
            color="yellow"
            size="medium"
            variant="contained"
            onClick={openCreateTaskModal}
            sx={{
              borderRadius: 50,
              position: "absolute",
              bottom: 42,
              right: 42,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              lineHeight: "32px",
            }}
          >
            <AddCircle sx={{ mr: 1 }} />할 일 추가
          </Button>
        </Box>
      ) : null}
      {tasks.length > 0 ? (
        <Box mt={2}>
          <TaskHeader
            viewType={viewType}
            setViewType={setViewType}
            taskListApiParams={params}
          />
        </Box>
      ) : null}
      <Box
        mt={2}
        mb={2}
        height="calc(100vh - 254px)"
        minHeight="330px"
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
        {tasks.length > 0 ? (
          renderView()
        ) : (
          <Box height="100%" alignItems="center">
            <NoData
              content={getEmptySetContent()}
              width={200}
              height={100}
              sx={{ height: "80%" }}
            />
          </Box>
        )}
      </Box>
      <CreateTaskModal />
    </Box>
  )
}

export default TaskView
