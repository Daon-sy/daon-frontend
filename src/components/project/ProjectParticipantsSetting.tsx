import React from "react"
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material"
import { ProjectParticipant } from "_types/project"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import axios from "axios"
import {
  deportationProjectParticipantApi,
  projectParticipantListApi,
} from "api/project"
import { ApiResponse } from "api"

type Filter = "name" | "email"

const filters = [
  {
    text: "이름",
    filter: "name" as Filter,
  },
  {
    text: "이메일",
    filter: "email" as Filter,
  },
]

interface Props {
  workspaceId: number
  projectId: number
  addSuccessAlert: (message: string) => void
  addErrorAlert: (message: string) => void
}

const ProjectParticipantsSetting = ({
  workspaceId,
  projectId,
  addSuccessAlert,
  addErrorAlert,
}: Props) => {
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")
  const [projectParticipants, setProjectParticipants] =
    React.useState<Array<ProjectParticipant>>()

  const fetchProjectParticipants = async () => {
    const { data } = await projectParticipantListApi(workspaceId, projectId)
    setProjectParticipants(data.projectParticipants)
  }

  const fetchData = async () => {
    await fetchProjectParticipants()
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const handleProjectParticipantDropClick = async (
    projectParticipantId: number,
  ) => {
    try {
      await deportationProjectParticipantApi(workspaceId, projectId, {
        projectParticipantId,
      })

      await fetchData()
    } catch (e) {
      if (axios.isAxiosError<ApiResponse>(e)) {
        const { response } = e
        if (response) {
          const { data } = response
          addErrorAlert(data.message ? data.message : "오류 발생")
        }
      }
    }
  }

  return !projectParticipants ? (
    <Box />
  ) : (
    <Box>
      <Box>
        <Box>
          <Typography variant="h5">프로젝트 참여자 목록</Typography>
        </Box>
        <Box
          sx={{
            marginY: 2,
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {/* TODO 워크스페이스 사용자 모달 open */}
            <Button variant="outlined" size="small">
              프로젝트에 초대
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" spacing={0.5}>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={filter}
                  onChange={(e: SelectChangeEvent) =>
                    setFilter(e.target.value as Filter)
                  }
                  sx={{ fontSize: 14, height: 40 }}
                >
                  {filters.map(item => (
                    <MenuItem
                      value={item.filter}
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                sx={{
                  fontSize: 14,
                  height: 40,
                }}
                placeholder="검색어를 입력하세요"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilterText(e.target.value)
                }
              />
            </Stack>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box
            sx={{
              marginTop: 1,
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            {projectParticipants
              ?.filter(item =>
                item[filter].toUpperCase().includes(filterText.toUpperCase()),
              )
              .map(participant => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 1,
                    padding: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Avatar sx={{ width: 36, height: 36 }} />
                    </Box>
                    <Box flexGrow={1}>
                      <Stack spacing={0.5}>
                        <Box sx={{ marginLeft: 1, fontSize: 15 }}>
                          {participant.name}
                        </Box>
                        <Box
                          sx={{
                            marginLeft: 1,
                            fontSize: 12,
                            color: "rgb(100,100,100)",
                          }}
                        >
                          {participant.email}
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <Button
                        color="error"
                        size="small"
                        onClick={() =>
                          handleProjectParticipantDropClick(
                            participant.projectParticipantId,
                          )
                        }
                      >
                        내보내기
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectParticipantsSetting
