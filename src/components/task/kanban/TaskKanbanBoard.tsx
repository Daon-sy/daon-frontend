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
            borderTopStyle: "solid",
            borderTopColor: dividerColor,
            borderTopWidth: 10,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 2,
              paddingTop: 1,
              margin: 0.5,
            }}
          >
            <Typography
              fontSize={24}
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
              paddingBottom: 1,
              borderRadius: 2,
              height: "100%",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
              // overflow: "hidden",
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
