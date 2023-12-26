import React from "react"
import { Box, Typography, Chip, Stack } from "@mui/material"
import EastIcon from "@mui/icons-material/East"
import {
  HistoryBoard,
  HistoryProjectParticipant,
  TASK_STATUS_SET,
  TaskHistory as TaskHistoryType,
} from "_types/task"
import ColorAvatar from "components/common/ColorAvatar"

interface Props {
  taskHistory: TaskHistoryType
}

const TaskHistory = ({ taskHistory }: Props) => {
  const tooltipText = () => (
    <Box sx={{ color: "grey" }}>
      {(() => {
        if (taskHistory.fieldType === "TaskProgressStatus") {
          return (
            <Typography fontSize={10} display="flex" alignItems="center">
              {
                TASK_STATUS_SET.find(t => t.value === taskHistory.from)
                  ?.description
              }
              <EastIcon
                fontSize="small"
                sx={{
                  px: 1,
                  fontSize: 12,
                }}
              />
              {
                TASK_STATUS_SET.find(t => t.value === taskHistory.to)
                  ?.description
              }
            </Typography>
          )
        }

        if (taskHistory.fieldType === "boolean") {
          return (
            <Typography fontSize={10} display="flex" alignItems="center">
              <Chip
                label={taskHistory.from ? "긴급" : "긴급 해제"}
                size="small"
                color={taskHistory.from ? "error" : "default"}
                sx={{ fontSize: 10, p: 0, height: 18 }}
              />
              <EastIcon
                fontSize="small"
                sx={{
                  px: 1,
                  fontSize: 12,
                }}
              />
              <Chip
                label={taskHistory.to ? "긴급" : "긴급 해제"}
                size="small"
                color={taskHistory.to ? "error" : "default"}
                sx={{ fontSize: 10, p: 0, height: 18 }}
              />
            </Typography>
          )
        }

        if (taskHistory.fieldType === "Board") {
          const boardFrom = taskHistory.from as HistoryBoard
          const boardTo = taskHistory.to as HistoryBoard
          return (
            <Typography fontSize={10} display="flex" alignItems="center">
              <Box>{`${boardFrom.title}`}</Box>
              <EastIcon
                fontSize="small"
                sx={{
                  px: 1,
                  fontSize: 12,
                }}
              />
              <Box>{`${boardTo.title}`}</Box>
            </Typography>
          )
        }

        if (taskHistory.fieldType === "ProjectParticipant") {
          const taskManagerFrom = taskHistory.from as HistoryProjectParticipant
          const taskManagerTo = taskHistory.to as HistoryProjectParticipant
          return (
            <Box display="flex" alignItems="center">
              {taskManagerFrom ? (
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box>
                    <ColorAvatar
                      id={taskManagerFrom.projectParticipantId}
                      src={taskManagerFrom.imageUrl}
                      sx={{ width: 18, height: 18 }}
                    />
                  </Box>
                  <Typography fontSize={10}>{taskManagerFrom.name}</Typography>
                </Stack>
              ) : (
                <Typography fontSize={10}>없음</Typography>
              )}
              <EastIcon
                fontSize="small"
                sx={{
                  px: 1,
                  fontSize: 12,
                }}
              />
              {taskManagerTo ? (
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box>
                    <ColorAvatar
                      id={taskManagerTo.projectParticipantId}
                      src={taskManagerTo.imageUrl}
                      sx={{ width: 18, height: 18 }}
                    />
                  </Box>
                  <Typography fontSize={10}>{taskManagerTo.name}</Typography>
                </Stack>
              ) : (
                <Typography fontSize={10}>없음</Typography>
              )}
            </Box>
          )
        }

        return (
          <Typography fontSize={10} display="flex" alignItems="center">
            <Box
              maxWidth={200}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >{`${taskHistory.from ? taskHistory.from : "없음"}`}</Box>
            <EastIcon
              fontSize="small"
              sx={{
                px: 1,
                fontSize: 12,
              }}
            />
            <Box
              maxWidth={200}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >{`${taskHistory.to ? taskHistory.to : "없음"}`}</Box>
          </Typography>
        )
      })()}
    </Box>
  )

  return (
    <Box
      p={1}
      sx={{
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 1,
        borderColor: "rgb(224,224,224)",
      }}
    >
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box>
          <ColorAvatar
            id={taskHistory.modifier.projectParticipantId}
            src={taskHistory.modifier.imageUrl}
            sx={{ width: 18, height: 18 }}
          />
        </Box>
        <Typography fontSize={12}>
          <Box component="span" fontSize={12} fontWeight={600} mr={0.5}>
            {taskHistory.modifier.name}
          </Box>
          구성원이
          <Box
            component="span"
            fontSize={12}
            fontWeight={600}
            mx={0.5}
            bgcolor="rgb(244,244,244)"
            borderRadius={1}
            p={0.3}
          >
            {(() => {
              switch (taskHistory.fieldName) {
                case "title":
                  return "제목"
                case "content":
                  return "내용"
                case "board":
                  return "보드"
                case "taskManager":
                  return "담당자"
                case "startDate":
                  return "시작일"
                case "endDate":
                  return "마감일"
                case "progressStatus":
                  return "진행상태"
                case "emergency":
                  return "긴급여부"
                default:
                  return "???"
              }
            })()}
          </Box>
          을(를) 변경함
        </Typography>
      </Stack>
      <Box ml={3} mt={1 / 4}>
        {tooltipText()}
      </Box>
      <Typography
        display="flex"
        flexGrow={1}
        justifyContent="end"
        fontSize={10}
        color="rgb(155,155,155)"
      >
        {taskHistory.modifiedAt}
      </Typography>
    </Box>
  )
}

export default TaskHistory
