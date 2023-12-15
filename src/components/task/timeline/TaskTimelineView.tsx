import React from "react"
import { Box, Chip, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTimelineStore } from "store/taskTimelineStore"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import TaskTimelineBar from "components/task/timeline/TaskTimelineBar"
import { TaskSummary } from "_types/task"
import { getDateCountArray } from "utils/DateUtils"

interface TaskViewProps {
  tasks: TaskSummary[]
  height?: number | string
}

interface YearMonthDateCount {
  year: number
  month: number
  dateCount: number
}

const TaskTimelineView = ({ tasks = [], height = 300 }: TaskViewProps) => {
  const [taskWidth] = React.useState(230)

  const { workspace } = getWorkspaceStore()

  // 보여줄 할 일 목록
  const memoTasks = React.useMemo(() => {
    return tasks
      .filter(task => task.progressStatus !== "PENDING")
      .sort((t1, t2) => {
        if (t1.emergency) return -1
        if (t2.emergency) return 1
        if (!t1.endDate && !t2.endDate) return t1.title > t2.title ? 1 : -1

        if (!t1.endDate) return -1
        if (!t2.endDate) return 1
        const sub =
          new Date(t1.endDate).getTime() - new Date(t2.endDate).getTime()

        return sub
      })
  }, [tasks])

  const { taskDetailParam, setTaskDetailParam, clear } =
    getTaskDetailViewStore()
  const { props: timelineProps } = getTaskTimelineStore()
  const { dateWidth, headerHeight, taskHeight } = timelineProps

  const getMaxEndDate = (): Date => {
    if (!memoTasks || memoTasks.length <= 0) return new Date()
    return new Date(
      memoTasks
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
    if (!memoTasks || memoTasks.length <= 0) return new Date()
    return new Date(
      memoTasks
        .filter(task => !!task.startDate)
        .reduce((prev, curr) => {
          return new Date(prev.startDate || "").getTime() <=
            new Date(curr.startDate || "").getTime()
            ? prev
            : curr
        }).startDate || "",
    )
  }

  const [yearMonthDateCountList, setYearMonthDateCountList] = React.useState<
    YearMonthDateCount[]
  >([])
  const [totalWidth, setTotalWidth] = React.useState(0)

  const boxRef = React.useRef<HTMLDivElement>(null)

  const currentDate = new Date()

  const getBlankCount = () => {
    const { year: baseYear, month: baseMonth } = yearMonthDateCountList[0]
    return Math.abs(
      (currentDate.getTime() - new Date(baseYear, baseMonth - 1, 1).getTime()) /
        (1000 * 60 * 60 * 24),
    )
  }

  React.useLayoutEffect(() => {
    const now = new Date()
    const tmp = getDateCountArray({
      startDate: getMinStartDate() || now,
      endDate: getMaxEndDate() || now,
    })
    setYearMonthDateCountList(tmp)
    setTotalWidth(
      tmp.map(ymdc => ymdc.dateCount).reduce((prev, curr) => prev + curr) *
        dateWidth,
    )
  }, [memoTasks])

  React.useEffect(() => {
    if (boxRef.current && yearMonthDateCountList.length > 0) {
      const blankCount = getBlankCount()

      boxRef.current.scrollTo({
        left:
          blankCount * dateWidth -
          taskWidth * (0.002 * boxRef.current.clientWidth),
      })
    }
  })

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
          overflow: "auto",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          boxSizing: "border-box",
          "&::-webkit-scrollbar": {
            height: "8px",
            width: "8px",
            borderRadius: 1,
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
          "&::-webkit-scrollbar-corner": {
            borderRadius: 1,
            backgroundColor: "#F1F2F4FF",
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
              borderBottom: 1,
              borderColor: "#C8C8C8FF",
            }}
          >
            <Box
              sx={{
                width: taskWidth,
                top: 0,
                position: "sticky",
                color: "#F1F2F4FF",
                backgroundColor: "#F1F2F4FF",
                boxSizing: "border-box",
                borderBottom: 1,
                borderColor: "#C8C8C8FF",
                borderTopLeftRadius: 1,
                height: headerHeight,
              }}
            />
            {memoTasks.map((task, index) => (
              <Box
                key={task.taskId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: taskWidth,
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
                    boardId: task.board?.boardId || 0,
                    taskId: task.taskId,
                  })
                }
              >
                {task.emergency ? (
                  <Typography ml={1}>
                    <FontAwesomeIcon icon={faFire} color="red" />
                  </Typography>
                ) : null}
                <Chip
                  label={task.project.title}
                  color="secondary"
                  size="small"
                  sx={{
                    ml: 1,
                    fontSize: 12,
                    borderRadius: 1.5,
                    fontWeight: 900,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 80,
                  }}
                />
                <Typography
                  sx={{
                    // 완료됨 표시. 다른 아이콘 넣으면 좋을 것 같음
                    textDecoration:
                      task.progressStatus === "COMPLETED"
                        ? "line-through"
                        : undefined,
                    fontSize: 12,
                    lineHeight: `${taskHeight}px`,
                    paddingX: 0.5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "deepGray.main",
                    fontWeight: 600,
                  }}
                >
                  {task.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* 타임라인 */}
        <Box
          sx={{
            position: "relative",
            left: taskWidth,
          }}
        >
          {/* 오늘 날짜 선 */}
          {/* <Tooltip title={todayDateToString()} placement="top"> */}
          <Box
            sx={{
              zIndex: 2,
              position: "absolute",
              left:
                yearMonthDateCountList.length > 0
                  ? dateWidth * getBlankCount()
                  : 0,
              top: headerHeight,
              width: 5,
              height: taskHeight * memoTasks.length,
              borderLeft: 1,
              borderWidth: 2,
              borderColor: "#FFBE00",
              "&:hover": {
                cursor: "pointer",
                borderColor: "#dca900",
              },
            }}
          />
          {/* </Tooltip> */}
          {/* header */}
          <Box sx={{ display: "flex" }} position="sticky" top={0} zIndex={2}>
            {yearMonthDateCountList.map(ymdc => (
              <Box
                key={`${ymdc.year}-${ymdc.month}`}
                sx={{
                  width: dateWidth * ymdc.dateCount,
                  height: headerHeight,
                  display: "flex",
                  backgroundColor: "#F1F2F4FF",
                  boxSizing: "border-box",
                  borderBottom: 1,
                  borderRight: 1,
                  borderColor: "#C8C8C8FF",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                }}
              >
                {ymdc.year}년 {ymdc.month}월
              </Box>
            ))}
          </Box>
          <Box display="flex" position="absolute">
            {yearMonthDateCountList.map(ymdc => (
              <Box
                key={`${ymdc.year}-${ymdc.month}`}
                sx={{
                  width: dateWidth * ymdc.dateCount,
                  height: taskHeight * memoTasks.length,
                  boxSizing: "border-box",
                  borderRight: 1,
                  borderColor: "#c8c8c8",
                  backgroundColor: "rgba(255,255,255,0)",
                }}
              />
            ))}
          </Box>
          {/* 할 일 타임라인 */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "#C8C8C8FF",
            }}
          >
            {memoTasks.map((task, index) => (
              <TaskTimelineBar
                key={task.taskId}
                task={task}
                baseYearMonth={{
                  year: yearMonthDateCountList[0].year,
                  month: yearMonthDateCountList[0].month,
                }}
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
          boardId={taskDetailParam.boardId}
          taskId={taskDetailParam.taskId}
          open={!!taskDetailParam}
          handleClose={clear}
        />
      ) : null}
    </>
  )
}

export default TaskTimelineView
