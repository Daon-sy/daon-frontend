import React from "react"
import Box from "@mui/material/Box"
import { TaskSummary } from "_types/TaskType"
import { Chip } from "@mui/material"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import TaskCell from "components/task/table/TaskCell"

const tableBorderColor = "rgba(224,224,224)"

const Accordion = styled((props: AccordionProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAccordion disableGutters square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderColor: tableBorderColor,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    // eslint-disable-next-line react/jsx-props-no-spreading
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
}

const TaskTable: React.FC<Props> = ({ title, tasks }: Props) => {
  const [open, setOpen] = React.useState(true)
  const renderTaskCells = () =>
    tasks.map(task => <TaskCell task={task} borderColor={tableBorderColor} />)

  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary>
        <Box
          sx={{
            fontSize: 20,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginTop: 0.3,
            }}
          >
            {title}
          </Box>
          <Chip
            label={tasks.length}
            variant="outlined"
            size="small"
            sx={{
              marginLeft: 2,
              paddingX: 1,
              color: "rgba(150, 150, 150)",
            }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>{renderTaskCells()}</AccordionDetails>
    </Accordion>
  )
}

export default TaskTable
