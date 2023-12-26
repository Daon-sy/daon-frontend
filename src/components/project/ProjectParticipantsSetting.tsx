import React from "react"
import {
  Box,
  FormControl,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ListItemText,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material"
import { ProjectParticipant } from "_types/project"
import {
  deportationProjectParticipantApi,
  myProjectParticipantDetailApi,
  projectParticipantListApi,
} from "api/project"
import { useAlert } from "hooks/useAlert"
import { getWorkspaceStore } from "store/userStore"
import {
  roleColors as roles,
  WORKSPACE_PARTICIPANT_ROLE,
} from "_types/workspace"
import ConfirmDialog from "components/common/ConfirmDialog"
import SearchIcon from "@mui/icons-material/Search"
import { TitleDialog } from "components/common/TitleDialog"
import useDebounce from "hooks/useDebounce"
import ConfirmOutMemberComponent from "components/common/confirm/ConfirmOutMember"
import NoData from "components/common/NoData"
import RoleButton from "../workspace/role/RoleButton"
import ColorAvatar from "../common/ColorAvatar"
import ProjectInvite from "./invite/ProjectInvite"

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
  const [isInviteOpen, setIsInviteOpen] = React.useState(false)
  const [projectParticipants, setProjectParticipants] =
    React.useState<Array<ProjectParticipant>>()
  const [projectParticipantToDrop, setProjectParticipantToDrop] =
    React.useState<ProjectParticipant>()

  const [myProjectProfile, setMyProjectProfile] =
    React.useState<ProjectParticipant>()

  const { debouncedValue: debouncedFilterText, debouncing } =
    useDebounce<string>(filterText, 500)

  React.useEffect(() => {
    const fetch = async () => {
      const { data } = await myProjectParticipantDetailApi(
        workspaceId,
        projectId,
      )
      setMyProjectProfile({ ...data })
    }
    fetch()
  }, [])

  const fetchProjectParticipants = async () => {
    const { data } = await projectParticipantListApi(workspaceId, projectId)
    setProjectParticipants(
      data.projectParticipants
        .filter(
          participant =>
            participant.projectParticipantId !==
            myProjectProfile?.projectParticipantId,
        )
        .sort((p1, p2) => {
          if (p1.name < p2.name) return -1
          if (p1.name > p2.name) return 1
          return p1.projectParticipantId - p2.projectParticipantId
        }),
    )
  }

  React.useEffect(() => {
    if (myProjectProfile) fetchProjectParticipants()
  }, [myProjectProfile])

  const handleProjectParticipantDropClick = async () => {
    if (projectParticipantToDrop) {
      await deportationProjectParticipantApi(workspaceId, projectId, {
        projectParticipantId: projectParticipantToDrop.projectParticipantId,
      })
      addSuccess(`사용자 [${projectParticipantToDrop.name}]를 내보냈습니다.`)

      await fetchProjectParticipants()
    }
  }

  if (!(myProfile && myProjectProfile && projectParticipants)) return <Box />

  return (
    <Box>
      <Stack spacing={5}>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography fontSize={20} fontWeight={500} flexGrow={1}>
              내 정보
            </Typography>
            {allowedEdit.includes(myProfile?.role) ? (
              <>
                <Box display="flex" justifyContent="end">
                  <Button
                    variant="outlined"
                    onClick={() => setIsInviteOpen(true)}
                  >
                    초대하기
                  </Button>
                </Box>
                {isInviteOpen ? (
                  <TitleDialog
                    open={isInviteOpen}
                    title="프로젝트 초대"
                    maxWidth="xs"
                    height={400}
                    handleClose={() => setIsInviteOpen(false)}
                  >
                    <ProjectInvite
                      workspaceId={workspaceId}
                      projectId={projectId}
                      myProjectProfile={myProjectProfile}
                      projectParticipants={projectParticipants}
                      onInviteClick={fetchProjectParticipants}
                    />
                  </TitleDialog>
                ) : null}
              </>
            ) : null}
          </Box>
          <Box
            sx={{
              marginTop: 1,
              borderStyle: "solid",
              borderColor: "rgb(200,200,200)",
              borderWidth: 1,
              borderRadius: 2,
            }}
          >
            <List sx={{ paddingY: 0 }}>
              <ListItem
                secondaryAction={
                  <Box display="flex" alignItems="center">
                    <RoleButton
                      colorRole={
                        roles.find(r => r.role === myProjectProfile?.role) ||
                        roles[2]
                      }
                    />
                  </Box>
                }
              >
                <ListItemAvatar>
                  <ColorAvatar
                    id={myProjectProfile.projectParticipantId}
                    src={myProjectProfile?.imageUrl}
                    sx={{ width: 36, height: 36 }}
                  />
                </ListItemAvatar>
                <ListItemText>
                  <Box>
                    <Typography fontSize={14} color="primary" fontWeight={600}>
                      {myProjectProfile?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize={12} color="gray">
                      {myProjectProfile?.email}
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            </List>
          </Box>

          <Box mt={3} display="flex" alignItems="center">
            <Typography fontSize={20} fontWeight={500} flexGrow={1}>
              구성원 목록
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={filter}
                  onChange={(e: SelectChangeEvent) =>
                    setFilter(e.target.value as Filter)
                  }
                  size="small"
                  sx={{ fontSize: 14 }}
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
                autoComplete="off"
                size="small"
                placeholder="구성원 검색"
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
          </Box>
          <Box
            sx={{
              marginTop: 1,
              borderStyle: "solid",
              borderColor: "rgb(200,200,200)",
              borderWidth: 1,
              borderRadius: 2,
            }}
          >
            {debouncing ? (
              <Box
                sx={{
                  minHeight: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <List sx={{ paddingY: 0 }}>
                {projectParticipants
                  .filter(participant =>
                    participant[filter]
                      .toUpperCase()
                      .includes(debouncedFilterText.toUpperCase()),
                  )
                  .map((participant, index) => (
                    <ListItem
                      divider={index < projectParticipants.length - 1}
                      secondaryAction={
                        <Box display="flex" alignItems="center">
                          <RoleButton
                            colorRole={
                              roles.find(r => r.role === participant?.role) ||
                              roles[2]
                            }
                          />
                          {allowedEdit.includes(myProfile?.role) ? (
                            <Button
                              color="error"
                              size="small"
                              sx={{ ml: 1, fontSize: 12 }}
                              onClick={() =>
                                setProjectParticipantToDrop(participant)
                              }
                            >
                              내보내기
                            </Button>
                          ) : null}
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <ColorAvatar
                          id={participant.projectParticipantId}
                          src={participant.imageUrl}
                          sx={{ width: 36, height: 36 }}
                        />
                      </ListItemAvatar>
                      <ListItemText>
                        <Box>
                          <Typography
                            fontSize={14}
                            color="primary"
                            fontWeight={600}
                          >
                            {participant.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography fontSize={12} color="gray">
                            {participant.email}
                          </Typography>
                        </Box>
                      </ListItemText>
                    </ListItem>
                  ))}
                {projectParticipants.length === 0 ? (
                  <Typography fontSize={14} p={1}>
                    <NoData
                      content="구성원들이 존재하지 않습니다."
                      width={200}
                      height={100}
                      sx={{ pb: 3 }}
                    />
                  </Typography>
                ) : null}
                {projectParticipants.length > 0 &&
                filterText &&
                projectParticipants.filter(participant =>
                  participant[filter]
                    .toUpperCase()
                    .includes(filterText.toUpperCase()),
                ).length === 0 ? (
                  <Typography fontSize={14} p={1}>
                    <NoData
                      content="검색 결과가 없습니다."
                      width={200}
                      height={100}
                      sx={{ pb: 3 }}
                    />
                  </Typography>
                ) : null}
              </List>
            )}
          </Box>
        </Box>
      </Stack>
      {projectParticipantToDrop ? (
        <ConfirmDialog
          open={!!projectParticipantToDrop}
          maxWidth="sm"
          handleConfirm={handleProjectParticipantDropClick}
          handleClose={() => {
            setProjectParticipantToDrop(undefined)
          }}
          confirmButtonText="내보내기"
        >
          <Box width={500}>
            <ConfirmOutMemberComponent />
            <Box
              sx={{
                mt: 3,
                mb: 1,
                p: 0.5,
                px: 1,
                height: 50,
                display: "flex",
                alignItems: "center",
                border: 1,
                borderColor: "gray.main",
                borderRadius: 1,
              }}
            >
              <Box ml={1}>
                <ColorAvatar
                  id={projectParticipantToDrop.projectParticipantId}
                  src={projectParticipantToDrop.imageUrl}
                  name={projectParticipantToDrop.name}
                />
              </Box>
              <Box ml={1} flexGrow={1} maxWidth={120}>
                <Typography fontSize={14} fontWeight={600}>
                  {projectParticipantToDrop.name}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography fontSize={12}>
                  {projectParticipantToDrop?.email}
                </Typography>
              </Box>
              <Box>
                <Button variant="outlined" disableElevation color="primary">
                  {roles.find(r => r.role === projectParticipantToDrop.role)
                    ?.description || ""}
                </Button>
              </Box>
            </Box>
          </Box>
        </ConfirmDialog>
      ) : null}
    </Box>
  )
}

export default ProjectParticipantsSetting
