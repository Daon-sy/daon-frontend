/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import Box from "@mui/material/Box"
import { Chip } from "@mui/material"
import TaskCard from "components/task/kanban/TaskCard"
import { TaskSummary } from "_types/task"
import { Droppable, Draggable } from "react-beautiful-dnd"
import Typography from "@mui/material/Typography"

interface Props {
  title: string
  dividerColor: string | null
  style: React.CSSProperties
  progressStatus: string
  tasks: Array<TaskSummary>
  renderProject?: boolean
}

const TaskKanbanBoard: React.FC<Props> = ({
  title,
  dividerColor,
  style,
  tasks,
  progressStatus,
  renderProject = false,
}: Props) => {
  return (
    <Droppable droppableId={progressStatus}>
      {droppableProvided => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          style={style}
          sx={{
            backgroundColor: "#FFFFFF",
            boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderTopStyle: "solid",
              borderTopColor: dividerColor,
              borderTopWidth: 10,
              borderRadius: 1,
              top: 0,
              position: "sticky",
              display: "flex",
              alignItems: "center",
              paddingLeft: 2,
              paddingTop: 1,
              paddingBottom: 1,
              zIndex: 10,
            }}
          >
            <Typography
              fontSize={20}
              fontWeight={900}
              sx={{ color: dividerColor }}
            >
              {title}
            </Typography>
            <Chip
              label={tasks.length}
              variant="outlined"
              size="small"
              sx={{
                border: 0,
                marginLeft: 2,
                fontSize: 16,
                fontWeight: 900,
                color: "rgba(150, 150, 150)",
                backgroundColor: "rgb(229,229,229)",
              }}
            />
          </Box>
          <Box
            sx={{
              marginX: 1,
              borderRadius: 2,
              minHeight: " calc(100vh - 360px)",
            }}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.taskId}
                draggableId={String(task.taskId)}
                index={index}
              >
                {draggableProvided => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <TaskCard task={task} renderProject={renderProject} />
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Box>
        </Box>
      )}
    </Droppable>
  )
}

export default TaskKanbanBoard
