import React from "react"
import { Box, Chip, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire, faStopwatch } from "@fortawesome/free-solid-svg-icons"
import { getWorkspaceStore } from "store/userStore"
import { getTaskDetailViewStore } from "store/taskStore"
import { getTaskTimelineStore } from "store/taskTimelineStore"
import TaskTimelineBar from "components/task/timeline/TaskTimelineBar"
import { TaskSummary } from "_types/task"
import { getDateCountArray } from "utils/DateUtils"
import MainEmpty from "components/common/MainEmpty"

interface TaskViewProps {
  tasks: TaskSummary[]
  height?: number | string
  taskWidthInit?: number
}

interface YearMonthDateCount {
  year: number
  month: number
  dateCount: number
}

const TaskTimelineView = ({
  tasks = [],
  height = 300,
  taskWidthInit = 270,
}: TaskViewProps) => {
  const [taskWidth] = React.useState(taskWidthInit)

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

  const { setTaskDetailParam } = getTaskDetailViewStore()
  const { props: timelineProps } = getTaskTimelineStore()
  const { dateWidth, headerHeight, taskHeight } = timelineProps

  const getMaxEndDate = (): Date => {
    const filterTasks = memoTasks.filter(task => !!task.endDate)

    if (!filterTasks || filterTasks.length <= 0) return new Date()
    if (filterTasks.length === 1 && filterTasks[0].startDate)
      return new Date(filterTasks[0].startDate)

    return new Date(
      filterTasks.reduce((prev, curr) => {
        return new Date(prev.endDate || "").getTime() <=
          new Date(curr.endDate || "").getTime()
          ? curr
          : prev
      }).endDate || "",
    )
  }

  const getMinStartDate = (): Date => {
    const filterTasks = memoTasks.filter(task => !!task.startDate)

    if (!filterTasks || filterTasks.length <= 0) return new Date()
    if (filterTasks.length === 1 && filterTasks[0].startDate)
      return new Date(filterTasks[0].startDate)

    return new Date(
      filterTasks.reduce((prev, curr) => {
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
          taskWidth * (0.0015 * boxRef.current.clientWidth),
      })
    }
  })

  const todayLine = () => (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        left:
          yearMonthDateCountList.length > 0 ? dateWidth * getBlankCount() : 0,
        top: headerHeight,
        width: 5,
        height: taskHeight * memoTasks.length,
        borderLeft: 1,
        borderWidth: 2,
        borderColor: "#FFBE00",
        "&:hover": {
          cursor: "pointer",
          // borderColor: "#dca900",
        },
        "&:before":
          memoTasks.length > 0
            ? {
                content: '""',
                display: "block",
                position: "sticky",
                borderColor: "#FFBE00",
                top: headerHeight,
                width: 8,
                height: 8,
                bgcolor: "#FFBE00",
                transform: "translateX(-60%) translateY(-50%) rotate(45deg)",
                zIndex: 2,
              }
            : {},
      }}
    />
  )

  const monthDivider = () => (
    <Box display="flex" position="absolute" zIndex={0} top={headerHeight}>
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
  )

  return (
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
        position: "relative",
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
      {memoTasks.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MainEmpty
            icon={faStopwatch}
            content="타임라인에 할일이 없어요"
            bgcolor="rgb(185,107,198,0.6)"
          />
        </Box>
      ) : (
        <>
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
                  {task.progressStatus === "COMPLETED" ? (
                    <Chip
                      label="완료"
                      color="info"
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
                  ) : null}
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

          {/* header */}
          <Box
            sx={{
              position: "relative",
              left: taskWidth,
            }}
          >
            <Box position="absolute" height={taskHeight * (tasks.length + 1)}>
              <Box
                sx={{ display: "flex" }}
                position="sticky"
                top={0}
                zIndex={2}
              >
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
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              left: taskWidth,
            }}
          >
            {/* 할 일 타임라인 */}
            <Box
              sx={{
                position: "absolute",
                borderBottom: 1,
                borderColor: "#C8C8C8FF",
                top: headerHeight,
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
            {/* 오늘 날짜 선 */}
            {todayLine()}
            {/* 월별 구분선 */}
            {monthDivider()}
          </Box>
        </>
      )}
    </Box>
  )
}

export default TaskTimelineView
