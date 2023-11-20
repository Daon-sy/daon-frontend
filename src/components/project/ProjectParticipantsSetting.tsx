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
import {
  deportationProjectParticipantApi,
  projectParticipantListApi,
} from "api/project"
import { useAlert } from "hooks/useAlert"
import { getWorkspaceStore } from "store/userStore"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import ConfirmDialog from "components/common/ConfirmDialog"
import ProjectInviteModal from "components/project/modal/ProjectInviteModal"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = [
  "WORKSPACE_ADMIN",
  "PROJECT_ADMIN",
]

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
}

const ProjectParticipantsSetting = ({ workspaceId, projectId }: Props) => {
  const { addSuccess } = useAlert()
  const { myProfile } = getWorkspaceStore()
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")
  const [projectParticipants, setProjectParticipants] =
    React.useState<Array<ProjectParticipant>>()
  const [inviteModalOpen, setInviteModalOpen] = React.useState(false)
  const [projectParticipantToDrop, setProjectParticipantToDrop] =
    React.useState<ProjectParticipant>()

  const fetchProjectParticipants = async () => {
    const { data } = await projectParticipantListApi(workspaceId, projectId)
    setProjectParticipants(data.projectParticipants)
  }

  React.useEffect(() => {
    fetchProjectParticipants()
  }, [])

  const handleProjectParticipantDropClick = async () => {
    if (projectParticipantToDrop) {
      await deportationProjectParticipantApi(workspaceId, projectId, {
        projectParticipantId: projectParticipantToDrop.projectParticipantId,
      })
      addSuccess(`사용자 [${projectParticipantToDrop.name}]를 추방하였습니다.`)

      await fetchProjectParticipants()
    }
  }

  if (!(myProfile && projectParticipants)) return <Box />

  return (
    <Box>
      <Box>
        <Typography variant="h6">프로젝트 참여자 정보</Typography>
      </Box>

      <Box mt={2}>
        {allowedEdit.includes(myProfile?.role) ? (
          <>
            <Box display="flex" justifyContent="end">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setInviteModalOpen(true)}
              >
                프로젝트 초대
              </Button>
            </Box>
            {inviteModalOpen ? (
              <ProjectInviteModal
                projectId={projectId}
                open={inviteModalOpen}
                handleClose={() => setInviteModalOpen(false)}
              />
            ) : null}
          </>
        ) : null}
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
              placeholder="사용자를 검색하세요"
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
                    <Avatar
                      src={participant.imageUrl}
                      sx={{ width: 36, height: 36 }}
                    />
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
                  {allowedEdit.includes(myProfile?.role) ? (
                    <Box>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => setProjectParticipantToDrop(participant)}
                      >
                        내보내기
                      </Button>
                    </Box>
                  ) : null}
                </Stack>
              </Box>
            ))}
        </Box>
      </Box>
      {projectParticipantToDrop ? (
        <ConfirmDialog
          open={!!projectParticipantToDrop}
          maxWidth="xs"
          content={`정말로 참여자[${projectParticipantToDrop.name}]를 추방하시겠습니까?`}
          handleConfirm={handleProjectParticipantDropClick}
          handleClose={() => {
            setProjectParticipantToDrop(undefined)
          }}
        />
      ) : null}
    </Box>
  )
}

export default ProjectParticipantsSetting
