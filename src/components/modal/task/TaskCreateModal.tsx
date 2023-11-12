import React from "react"
import { Avatar, Button, Chip, Divider, Stack, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import BoardSelectButton from "components/task/BoardSelectButton"
import CustomModal from "components/common/CustomModal"
import ProjectSelectButton from "components/task/ProjectSelectButton"

interface Props {
  open: boolean
  handleClose: () => void
}

const TaskCreateModal: React.FC<Props> = ({ open, handleClose }: Props) => {
  const [emergency, setEmergency] = React.useState(false)

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      width={700}
      height={700}
      fullHeight
      px={0}
      py={0}
    >
      <Stack px={4} pt={4} spacing={2} height="100%">
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Stack direction="row" spacing={2}>
            <ProjectSelectButton />
            <BoardSelectButton />
          </Stack>
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
        </Box>
        <Box mt={2}>
          <TextField required fullWidth label="제목" />
        </Box>
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <TextField multiline fullWidth rows={10} label="내용" />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
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
              <Box sx={{ marginLeft: 1 }}>123</Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "60%", minWidth: 300 }}
          >
            <Button fullWidth variant="outlined" size="large">
              취소
            </Button>
            <Button fullWidth variant="contained" size="large">
              등록
            </Button>
          </Stack>
        </Box>
      </Stack>
    </CustomModal>
  )
}

export default TaskCreateModal
