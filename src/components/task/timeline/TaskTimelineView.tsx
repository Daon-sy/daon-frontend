import React from "react"
import { Box } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"
import { TaskListApiParams } from "api/task"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTimelineStore } from "store/taskTimelineStore"
import useFetchTaskList from "hooks/task/useFetchTaskList"
import { getDateCountArray, todayDateToString } from "utils/DateUtils"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import TaskTimelineBar from "components/task/timeline/TaskTimelineBar"

interface TaskViewProps {
  params?: TaskListApiParams
  height?: number | string
}

interface YearMonthDateCount {
  year: number
  month: number
  dateCount: number
}

const TaskTimelineView = ({ params, height = 300 }: TaskViewProps) => {
  const [taskWidth] = React.useState(220)

  const { workspace } = getWorkspaceStore()
  const { tasks } = useFetchTaskList({
    workspaceId: workspace?.workspaceId || 0,
    params,
  })
  const { taskDetailParam, setTaskDetailParam, clear } =
    getTaskDetailViewStore()
  const { props: timelineProps } = getTaskTimelineStore()
  const { dateWidth, headerHeight, taskHeight } = timelineProps

  const getMaxEndDate = (): Date => {
    if (!tasks || tasks.length <= 0) return new Date()
    return new Date(
      tasks
        .filter(task => !!task.endDate)
        .reduce((prev, curr) => {
          return new Date(prev.endDate || "").getTime() <=
            new Date(curr.endDate || "").getTime()
            ? curr
            : prev
        }).endDate || "",
    )
  }

  const getMinStartDate = (): Date => {
    if (!tasks || tasks.length <= 0) return new Date()
    return new Date(
      tasks
        .filter(task => !!task.startDate)
        .reduce((prev, curr) => {
          return new Date(prev.startDate || "").getTime() <=
            new Date(curr.startDate || "").getTime()
            ? prev
            : curr
        }).startDate || "",
    )
  }

  const [yearMonthDateCountList] = React.useState<YearMonthDateCount[]>(
    getDateCountArray({
      startDate: getMinStartDate(),
      endDate: getMaxEndDate(),
    }),
  )

  const totalWidth =
    yearMonthDateCountList
      .map(ymdc => ymdc.dateCount)
      .reduce((prev, curr) => prev + curr) * dateWidth

  const boxRef = React.useRef<HTMLDivElement>(null)

  const currentDate = new Date()

  const getBlankCount = () => {
    const { year: baseYear, month: baseMonth } = yearMonthDateCountList[0]
    return Math.abs(
      (currentDate.getTime() - new Date(baseYear, baseMonth - 1, 1).getTime()) /
        (1000 * 60 * 60 * 24),
    )
  }

  React.useEffect(() => {
    if (boxRef.current) {
      const blankCount = getBlankCount()

      boxRef.current.scrollTo({
        left:
          blankCount * dateWidth -
          taskWidth * (0.002 * boxRef.current.clientWidth),
      })
    }
  })

  if (tasks.length <= 0) return <Box />
  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          height,
          display: "flex",
          width: "100%",
          minWidth: 600,
          borderStyle: "solid",
          borderColor: "#C8C8C8FF",
          borderWidth: 1,
          borderRadius: 1,
          scrollbarWidth: "0.5em",
          WebkitScrollSnapType: "none",
          overflowX: "scroll",
          overflowY: "scroll",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          "&::-webkit-scrollbar": {
            height: "8px",
            width: "8px",
            borderTop: 1,
            borderLeft: 1,
            borderColor: "#C8C8C8FF",
            backgroundColor: "#F1F2F4FF",
          },
          "&::-webkit-scrollbar-thumb": {
            position: "absolute",
            backgroundColor: "#495e57",
            borderRadius: "15px",
          },
          "&::-webkit-scrollbar-button": {
            width: "0px",
            height: "0px",
          },
        }}
      >
        {/* 할 일 목록 */}
        <Box position="sticky" left={0} zIndex={5}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #C8C8C8FF",
            }}
          >
            <Box
              sx={{
                top: 0,
                position: "sticky",
                color: "#F1F2F4FF",
                backgroundColor: "#F1F2F4FF",
                borderBottom: 1,
                borderColor: "#C8C8C8FF",
                borderTopLeftRadius: 1,
                height: headerHeight,
              }}
            />
            {tasks.map((task, index) => (
              <Box
                sx={{
                  width: taskWidth,
                  lineHeight: `${taskHeight}px`,
                  fontSize: 14,
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#F7F8F9FF",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#dcdcdc",
                  },
                }}
                onClick={() =>
                  setTaskDetailParam({
                    workspaceId: workspace?.workspaceId || 0,
                    projectId: task.project.projectId,
                    taskId: task.taskId,
                  })
                }
              >
                <Box
                  sx={{
                    paddingX: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.title}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        {/* 타임라인 */}
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", position: "absolute", zIndex: 3 }}>
            {yearMonthDateCountList.map((ymdc, index) => (
              <Box
                sx={{
                  position: "relative",
                  width: dateWidth * ymdc.dateCount - 1,
                  height: headerHeight + taskHeight * tasks.length,
                  borderRight:
                    index < yearMonthDateCountList.length - 1 ? 1 : 0,
                  borderColor: "#c8c8c8",
                  backgroundColor: "rgba(255,255,255,0)",
                }}
              />
            ))}
          </Box>
          {/* 오늘 날짜 선 */}
          <Tooltip title={todayDateToString()} placement="top">
            <Box
              sx={{
                zIndex: 1,
                position: "absolute",
                left: dateWidth * getBlankCount(),
                top: headerHeight,
                width: 5,
                height: taskHeight * tasks.length,
                borderLeft: 1,
                borderWidth: 2,
                borderColor: "#FFBE00",
                "&:hover": {
                  borderColor: "#dca900",
                },
              }}
            />
          </Tooltip>
          {/* header */}
          <Box sx={{ display: "flex" }} position="sticky" top={0} zIndex={2}>
            {yearMonthDateCountList.map(ymdc => (
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#F1F2F4FF",
                  borderBottom: 1,
                  borderColor: "#C8C8C8FF",
                }}
              >
                <Box
                  sx={{
                    width: dateWidth * ymdc.dateCount,
                    height: headerHeight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                  }}
                >
                  {currentDate.getFullYear() !== ymdc.year
                    ? `${ymdc.year}년 `
                    : null}
                  {ymdc.month}월
                </Box>
              </Box>
            ))}
          </Box>
          {/* 할 일 타임라인 */}
          <Box>
            {tasks.map((task, index) => (
              <TaskTimelineBar
                task={task}
                baseYearMonth={{
                  year: yearMonthDateCountList[0].year,
                  month: yearMonthDateCountList[0].month,
                }}
                minStartDate={getMinStartDate()}
                totalWidth={totalWidth}
                index={index}
              />
            ))}
          </Box>
        </Box>
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
    </>
  )
}

export default TaskTimelineView