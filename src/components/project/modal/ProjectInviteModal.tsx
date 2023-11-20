import React from "react"
import TitleModal from "components/common/TitleModal"
import {
  Avatar,
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import { workspaceParticipantListApi } from "api/workspace"
import { WorkspaceParticipant } from "_types/workspace"
import { inviteProjectParticipantApi } from "api/project"

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
  projectId: number
  open: boolean
  handleClose: () => void
}

const ProjectInviteModal = ({ projectId, open, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [workspaceParticipants, setWorkspaceParticipants] =
    React.useState<Array<WorkspaceParticipant>>()
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")

  const fetchWorkspaceParticipants = async () => {
    if (workspace) {
      const { data } = await workspaceParticipantListApi(workspace.workspaceId)
      setWorkspaceParticipants(data.workspaceParticipants)
    }
  }

  React.useEffect(() => {
    fetchWorkspaceParticipants()
  }, [])

  const inviteProject = async (workspaceParticipantId: number) => {
    if (workspace) {
      await inviteProjectParticipantApi(workspace.workspaceId, projectId, {
        workspaceParticipantId,
      })
      addSuccess("사용자를 프로젝트에 초대하였습니다.")
    }
  }

  if (!(workspace && workspaceParticipants)) return <Box />

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="프로젝트 초대"
      maxWidth="xs"
      height={400}
    >
      <Box height="100%">
        <Stack spacing={2} height="100%">
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
              autoComplete="off"
              fullWidth
              size="small"
              sx={{
                fontSize: 14,
                height: 40,
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
                style: { fontSize: 15 },
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
            {workspaceParticipants
              .filter(workspaceParticipant =>
                workspaceParticipant[filter]
                  .toUpperCase()
                  .includes(filterText.toUpperCase()),
              )
              .map(workspaceParticipant => (
                <Box
                  sx={{
                    p: 0.5,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "rgb(244,244,244)",
                    },
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
                        <Avatar
                          src={workspaceParticipant.imageUrl}
                          sx={{ width: 36, height: 36 }}
                        />
                      </Box>
                      <Box flexGrow={1}>
                        <Stack spacing={0.5}>
                          <Box sx={{ marginLeft: 1, fontSize: 15 }}>
                            {workspaceParticipant.name}
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
                      variant="outlined"
                      sx={{
                        p: 0,
                        fontSize: 13,
                      }}
                      onClick={() =>
                        inviteProject(
                          workspaceParticipant.workspaceParticipantId,
                        )
                      }
                    >
                      초대
                    </Button>
                  </Box>
                </Box>
              ))}
          </Stack>
        </Stack>
      </Box>
    </TitleModal>
  )
}

export default ProjectInviteModal
