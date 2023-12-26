import React from "react"
import {
  Box,
  CircularProgress,
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
} from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { getWorkspaceStore } from "store/userStore"
import {
  deportationWorkspaceParticipantApi,
  modifyWorkspaceParticipantRoleApi,
  ModifyWorkspaceParticipantRoleRequestBody,
} from "api/workspace"
import { roleColors as roles, WorkspaceParticipant } from "_types/workspace"
import ListItemText from "@mui/material/ListItemText"
import { useAlert } from "hooks/useAlert"
import ConfirmDialog from "components/common/ConfirmDialog"
import { useTitleDialog } from "components/common/TitleDialog"
import MemberInvite from "components/workspace/invite/MemberInvite"
import ColorAvatar from "components/common/ColorAvatar"
import SearchIcon from "@mui/icons-material/Search"
import SelectRoleButton from "components/workspace/role/SelectRoleButton"
import RoleButton from "components/workspace/role/RoleButton"
import ConfirmOutMemberComponent from "components/common/confirm/ConfirmOutMember"
import useFetchMyWorkspaceProfile from "hooks/workspace/useFetchMyWorkspaceProfile"
import useFetchWorkspaceParticipants from "hooks/workspace/useFetchWorkspaceParticipants"
import NoData from "components/common/NoData"
import useDebounce from "hooks/useDebounce"

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

const WorkspaceParticipantManage = () => {
  const { addSuccess } = useAlert()
  const { workspace } = getWorkspaceStore()
  const [workspaceParticipants, setWorkspaceParticipants] =
    React.useState<WorkspaceParticipant[]>()
  const [workspaceParticipantToDrop, setWorkspaceParticipantToDrop] =
    React.useState<WorkspaceParticipant>()
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")
  const { debouncedValue: debouncedFilterText, debouncing } =
    useDebounce<string>(filterText, 500)
  const { TitleDialog, open: openInviteMember } = useTitleDialog()

  const {
    workspaceParticipants: fetchedParticipants,
    fetch: fetchWorkspaceParticipants,
    isFetching: isWorkspaceParticipantsFetching,
  } = useFetchWorkspaceParticipants(workspace?.workspaceId || 0)

  const { myWorkspaceProfile: myProfile, fetchMyWorkspaceProfile } =
    useFetchMyWorkspaceProfile(workspace?.workspaceId || 0)

  React.useEffect(() => {
    if (fetchedParticipants) {
      setWorkspaceParticipants(
        fetchedParticipants
          .filter(
            participant =>
              participant.workspaceParticipantId !==
              myProfile?.workspaceParticipantId,
          )
          .sort((p1, p2) => {
            if (p1.name < p2.name) return -1
            if (p1.name > p2.name) return 1
            return p1.workspaceParticipantId - p2.workspaceParticipantId
          }),
      )
    }
  }, [fetchedParticipants])

  const updateWorkspaceParticipantRole = async (
    data: ModifyWorkspaceParticipantRoleRequestBody,
  ) => {
    if (workspace) {
      await modifyWorkspaceParticipantRoleApi(workspace.workspaceId, {
        ...data,
      })
      addSuccess("구성원 권한 변경 완료")
      await fetchWorkspaceParticipants()

      if (data.workspaceParticipantId === myProfile?.workspaceParticipantId)
        await fetchMyWorkspaceProfile()
    }
  }

  const handleWorkspaceParticipantDropClick = async () => {
    if (workspace && workspaceParticipantToDrop) {
      await deportationWorkspaceParticipantApi(workspace.workspaceId, {
        workspaceParticipantId:
          workspaceParticipantToDrop.workspaceParticipantId,
      })
      addSuccess(`사용자 [${workspaceParticipantToDrop.name}]를 내보냈습니다.`)

      await fetchWorkspaceParticipants()
    }
  }

  return (
    <Box>
      <Stack spacing={5}>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography fontSize={20} fontWeight={500} flexGrow={1}>
              내 정보
            </Typography>
            {myProfile?.role === "WORKSPACE_ADMIN" ? (
              <>
                <Box display="flex" justifyContent="end">
                  <Button variant="outlined" onClick={openInviteMember}>
                    초대하기
                  </Button>
                </Box>
                <TitleDialog
                  title="워크스페이스 초대"
                  maxWidth="xs"
                  height={400}
                >
                  <MemberInvite />
                </TitleDialog>
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
                        roles.find(r => r.role === myProfile?.role) || roles[2]
                      }
                    />
                  </Box>
                }
              >
                <ListItemAvatar>
                  <ColorAvatar
                    id={myProfile?.workspaceParticipantId}
                    src={myProfile?.imageUrl}
                    sx={{ width: 36, height: 36 }}
                  />
                </ListItemAvatar>
                <ListItemText>
                  <Box>
                    <Typography fontSize={14} color="primary" fontWeight={600}>
                      {myProfile?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize={12} color="gray">
                      {myProfile?.email}
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
          {isWorkspaceParticipantsFetching ? (
            <Box
              sx={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
                  {workspaceParticipants
                    ?.filter(participant =>
                      participant[filter]
                        .toUpperCase()
                        .includes(debouncedFilterText.toUpperCase()),
                    )
                    .map((participant, index) => (
                      <ListItem
                        divider={index < workspaceParticipants.length - 1}
                        secondaryAction={
                          <Box display="flex" alignItems="center">
                            {myProfile?.role === "WORKSPACE_ADMIN" ? (
                              <SelectRoleButton
                                initValue={roles.findIndex(
                                  r => r.role === participant.role,
                                )}
                                onChange={item => {
                                  updateWorkspaceParticipantRole({
                                    workspaceParticipantId:
                                      participant.workspaceParticipantId,
                                    role: item.role,
                                  })
                                }}
                              />
                            ) : (
                              <RoleButton
                                colorRole={
                                  roles.find(
                                    r => r.role === participant?.role,
                                  ) || roles[2]
                                }
                              />
                            )}
                            {myProfile?.role === "WORKSPACE_ADMIN" ? (
                              <Button
                                color="error"
                                size="small"
                                sx={{ ml: 1, fontSize: 12 }}
                                onClick={() =>
                                  setWorkspaceParticipantToDrop(participant)
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
                            id={participant.workspaceParticipantId}
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
                  {workspaceParticipants?.length === 0 ? (
                    <Typography fontSize={14} p={1}>
                      <NoData
                        content="구성원들이 존재하지 않습니다."
                        width={200}
                        height={100}
                        sx={{ pb: 3 }}
                      />
                    </Typography>
                  ) : null}
                  {(workspaceParticipants?.length || 0) > 0 &&
                  filterText &&
                  workspaceParticipants?.filter(participant =>
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
          )}
        </Box>
      </Stack>
      {workspaceParticipantToDrop ? (
        <ConfirmDialog
          open={!!workspaceParticipantToDrop}
          maxWidth="sm"
          handleConfirm={handleWorkspaceParticipantDropClick}
          handleClose={() => {
            setWorkspaceParticipantToDrop(undefined)
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
                  id={workspaceParticipantToDrop.workspaceParticipantId}
                  src={workspaceParticipantToDrop.imageUrl}
                  name={workspaceParticipantToDrop.name}
                />
              </Box>
              <Box ml={1} flexGrow={1} maxWidth={120}>
                <Typography fontSize={14} fontWeight={600}>
                  {workspaceParticipantToDrop.name}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography fontSize={12}>
                  {workspaceParticipantToDrop.email}
                </Typography>
              </Box>
              <Box>
                <Button variant="outlined" disableElevation color="primary">
                  {roles.find(r => r.role === workspaceParticipantToDrop.role)
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

export default WorkspaceParticipantManage
