import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import { useAlert } from "hooks/useAlert"
import { WorkspaceParticipant } from "_types/workspace"
import { workspaceParticipantListApi } from "api/workspace"
import { inviteProjectParticipantApi } from "api/project"
import { ProjectParticipant } from "../../../_types/project"
import ColorAvatar from "../../common/ColorAvatar"

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
  myProjectProfile: ProjectParticipant
  projectParticipants: Array<ProjectParticipant>
  onInviteClick: () => void
}

const ProjectInvite: React.FC<Props> = ({
  workspaceId,
  projectId,
  myProjectProfile,
  projectParticipants,
  onInviteClick,
}) => {
  const { addSuccess } = useAlert()
  const [workspaceParticipants, setWorkspaceParticipants] = React.useState<
    Array<WorkspaceParticipant>
  >([])
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")

  const fetchWorkspaceParticipants = async () => {
    const { data } = await workspaceParticipantListApi(workspaceId)
    setWorkspaceParticipants(data.workspaceParticipants)
  }

  React.useEffect(() => {
    fetchWorkspaceParticipants()
  }, [])

  const inviteProject = async (workspaceParticipantId: number) => {
    await inviteProjectParticipantApi(workspaceId, projectId, {
      workspaceParticipantId,
    })
    addSuccess("사용자를 프로젝트에 초대하였습니다.")
    onInviteClick()
  }

  const filteredWorkspaceParticipants = () =>
    workspaceParticipants
      // 본인 제외
      .filter(
        workspaceParticipant =>
          workspaceParticipant.email !== myProjectProfile.email,
      )
      // 이미 참여된 사용자 제외
      .filter(
        workspaceParticipant =>
          !projectParticipants
            .map(pp => pp.email)
            .includes(workspaceParticipant.email),
      )
      .filter(workspaceParticipant =>
        workspaceParticipant[filter]
          .toUpperCase()
          .includes(filterText.toUpperCase()),
      )

  return (
    <Box height="100%">
      <Stack spacing={2} height="100%">
        <Stack direction="row" spacing={0.5}>
          <FormControl sx={{ minWidth: 100 }} size="small">
            <Select
              value={filter}
              onChange={(e: SelectChangeEvent) =>
                setFilter(e.target.value as Filter)
              }
              sx={{ fontSize: 14 }}
            >
              {filters.map(item => (
                <MenuItem value={item.filter} sx={{ fontSize: 14 }}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoComplete="off"
            fullWidth
            size="small"
            sx={{
              fontSize: 14,
            }}
            placeholder="사용자를 검색하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterText(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              style: { fontSize: 14 },
            }}
          />
        </Stack>
        <Stack
          spacing={0.5}
          sx={{
            marginTop: 0.5,
            padding: 1,
            borderStyle: "solid",
            borderColor: "rgb(200,200,200)",
            borderWidth: 1,
            borderRadius: 1,
          }}
        >
          {filteredWorkspaceParticipants().map(workspaceParticipant => (
            <Box
              sx={{
                p: 0.5,
                px: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box flexGrow={1}>
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
                    <ColorAvatar
                      id={workspaceParticipant.workspaceParticipantId}
                      src={workspaceParticipant.imageUrl}
                      sx={{ width: 36, height: 36 }}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <Stack spacing={0.5}>
                      <Box sx={{ marginLeft: 1 }}>
                        <Typography fontSize={14} fontWeight={600}>
                          {workspaceParticipant.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          marginLeft: 1,
                          fontSize: 12,
                          color: "rgb(100,100,100)",
                        }}
                      >
                        {workspaceParticipant.email}
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  disableElevation
                  sx={{
                    p: 0,
                    fontSize: 13,
                  }}
                  onClick={() =>
                    inviteProject(workspaceParticipant.workspaceParticipantId)
                  }
                >
                  초대
                </Button>
              </Box>
            </Box>
          ))}
          {filteredWorkspaceParticipants().length === 0 ? (
            <Typography fontSize={14}>
              프로젝트에 초대 할 회원이 없습니다.
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ProjectInvite
