import React, { useEffect } from "react"
import { TaskDetail } from "_types/TaskType"
import CustomModal from "components/common/CustomModal"
import { Avatar, Chip, Divider, Stack, ToggleButton } from "@mui/material"
import Box from "@mui/material/Box"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import ProgressSelectButton from "components/task/ProgressSelectButton"
import BoardSelectButton from "components/task/BoardSelectButton"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"

interface Props {
  workspaceId: number
  projectId: number
  taskId: number
  open: boolean
  handleClose: () => void
}

const TaskDetailModal: React.FC<Props> = ({
  workspaceId,
  projectId,
  taskId,
  open,
  handleClose,
}: Props) => {
  const [task, setTask] = React.useState<TaskDetail | null>()
  const [emergency, setEmergency] = React.useState(false)
  const [bookmark, setBookmark] = React.useState(false)

  useEffect(() => {
    const em = true
    const bookmarked = true
    setTask({
      taskId,
      projectId,
      workspaceId,
      title: "초롱이 밥 먹이기",
      content:
        "저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기 저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기 저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기 저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기 저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기\n저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기저녁시간에 늦지않게 초롱이 밥주고 물주고 나도 저녁밥 먹기",
      progressStatus: "TODO",
      startDate: "2023-11-01",
      endDate: "2023-11-30",
      board: {
        boardId: 10,
        name: "집안일",
      },
      taskManager: {
        projectParticipantId: 3,
        name: "유하영",
        profileImageUrl:
          "https://daon-dev.s3.ap-northeast-2.amazonaws.com/image.jpeg",
      },
      emergency: em,
      bookmark: bookmarked,
    })

    setEmergency(em)
    setBookmark(bookmarked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      width={1200}
      height={700}
      fullHeight
      px={0}
      py={0}
    >
      {task ? (
        <Stack px={4} pt={4} direction="row" spacing={5} height="100%">
          {/* left */}
          <Box
            id="left-container"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  paddingLeft: 1,
                }}
              >
                <BoardSelectButton current={task.board} />
                <Box flexGrow={1} />
                <Box
                  sx={{
                    padding: 0.5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label="긴급"
                    size="small"
                    color={emergency ? "error" : "default"}
                    onClick={() => setEmergency(!emergency)}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ToggleButton
                    value="check"
                    selected={bookmark}
                    size="small"
                    sx={{
                      marginLeft: 1,
                      padding: 0.5,
                    }}
                  >
                    {bookmark ? (
                      <StarIcon fontSize="small" />
                    ) : (
                      <StarBorderIcon fontSize="small" />
                    )}
                  </ToggleButton>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    fontSize: 24,
                    fontWeight: 500,
                    marginTop: 2,
                    paddingX: 1.5,
                    paddingY: 1,
                    "&:hover": {
                      backgroundColor: "rgb(242,242,242)",
                    },
                  }}
                >
                  {task.title}
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <Box
                  sx={{
                    paddingX: 1.5,
                    paddingY: 0.5,
                    fontWeight: 700,
                  }}
                >
                  내용
                </Box>
                <Box
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    paddingX: 1.5,
                    paddingY: 1.5,
                    lineHeight: 1.4,
                    whiteSpace: "pre-wrap",
                    "&:hover": {
                      backgroundColor: "rgb(242,242,242)",
                    },
                  }}
                >
                  {task.content}
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                marginTop: 4,
              }}
            />
            <Box>
              <Box sx={{ paddingX: 1.5, paddingY: 2, fontWeight: 700 }}>
                댓글
              </Box>
            </Box>
          </Box>
          {/* right */}
          <Box
            id="right-container"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Box>
              <ProgressSelectButton current={task.progressStatus} />
              <Box
                sx={{
                  display: "flex",
                  marginTop: 2,
                  padding: 2,
                  border: "solid",
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "rgb(224,224,224)",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      paddingX: 1,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    시작일
                  </Box>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          format="YYYY-MM-DD"
                          defaultValue={dayjs(task.startDate)}
                          sx={{
                            width: "100%",
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Divider flexItem sx={{ marginX: 2 }} orientation="vertical" />
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      paddingX: 1,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    마감일
                  </Box>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          format="YYYY-MM-DD"
                          defaultValue={dayjs(task.endDate)}
                          sx={{
                            width: "100%",
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 1,
                  border: "solid",
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "rgb(224,224,224)",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    paddingX: 2,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  담당자
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: 1, marginRight: 2 }}
                />
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 1,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "rgb(242,242,242)",
                    },
                  }}
                >
                  <Box>
                    <Avatar sx={{ width: 24, height: 24 }} />
                  </Box>
                  <Box sx={{ marginLeft: 1 }}>{task.taskManager.name}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      ) : null}
    </CustomModal>
  )
}

export default TaskDetailModal
