/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { Chip, Box, Typography } from "@mui/material"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { TaskSummary } from "_types/task"
import TaskCell from "components/task/table/TaskCell"

const tableBorderColor = "rgba(224,224,224)"

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters {...props} />
))(() => ({
  boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.1)",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(2),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

interface Props {
  title: string
  tasks: Array<TaskSummary>
  dividerColor: string | null
  progressStatus: string
  renderProject?: boolean
}

const TaskTable: React.FC<Props> = ({
  title,
  tasks,
  dividerColor,
  progressStatus,
  renderProject = false,
}: Props) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Droppable droppableId={progressStatus}>
      {droppableProvided => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          sx={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <Accordion
            variant="outlined"
            expanded={open}
            onChange={() => setOpen(!open)}
            sx={{
              border: 0,
              borderLeftStyle: "solid",
              borderLeftColor: dividerColor,
              borderLeftWidth: 5,
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              sx={{
                backgroundColor: "#FFFFFF",
                top: 0,
                position: "sticky",
                zIndex: 10,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    marginLeft: 1,
                    fontSize: 16,
                    fontWeight: 900,
                    color: "rgba(150, 150, 150)",
                    backgroundColor: "rgb(229,229,229)",
                  }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ height: "100%" }}>
              {/* {renderTaskCells()} */}
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
                      <TaskCell
                        task={task}
                        borderColor={tableBorderColor}
                        renderProject={renderProject}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Droppable>
  )
}

export default TaskTable
