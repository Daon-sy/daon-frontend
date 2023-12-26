import React from "react"
import {
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { getWorkspaceStore } from "store/userStore"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import useSearchMembersToInvite, {
  Member,
} from "hooks/workspace/useSearchMembersToInvite"
import useInviteWorkspace from "hooks/workspace/useInviteWorkspace"
import ColorAvatar from "components/common/ColorAvatar"
import ConfirmDialog from "components/common/ConfirmDialog"
import SelectRoleButton from "components/workspace/role/SelectRoleButton"
import { ConfirmInvitationComponent } from "components/common/confirm/ConfirmInvitation"
import NoData from "components/common/NoData"
import useDebounce from "hooks/useDebounce"

const MemberInvite = () => {
  const { workspace } = getWorkspaceStore()
  const [usernameKeyword, setUsernameKeyword] = React.useState("")
  const { debouncedValue: debouncedUsernameKeyword, debouncing } =
    useDebounce<string>(usernameKeyword, 500)

  const {
    members: searchedMembers,
    fetch: searchMembers,
    isFetching: isSearching,
    clear,
  } = useSearchMembersToInvite(workspace?.workspaceId || 0)
  const { fetch: invite } = useInviteWorkspace(workspace?.workspaceId || 0)

  React.useLayoutEffect(() => {
    if (debouncedUsernameKeyword) searchMembers(debouncedUsernameKeyword)
    else clear()
  }, [debouncedUsernameKeyword])

  const [members, setMembers] = React.useState<Member[]>([])

  React.useEffect(() => {
    setMembers([...searchedMembers])
  }, [searchedMembers])

  const [selectedMember, setSelectedMember] = React.useState<Member>()
  const [selectedRole, setSelectedRole] =
    React.useState<WORKSPACE_PARTICIPANT_ROLE>("BASIC_PARTICIPANT")

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false)
  const openConfirm = () => setIsConfirmDialogOpen(true)
  const closeConfirm = () => setIsConfirmDialogOpen(false)

  React.useEffect(() => {
    if (selectedMember) openConfirm()
  }, [selectedMember])

  React.useEffect(() => {
    if (!isConfirmDialogOpen) setSelectedMember(undefined)
  }, [isConfirmDialogOpen])

  return (
    <Box height="100%">
      <Stack spacing={2} height="100%">
        <Box>
          <TextField
            fullWidth
            autoComplete="off"
            size="small"
            placeholder="회원 아이디를 검색하세요"
            value={usernameKeyword}
            onChange={e => setUsernameKeyword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              style: { fontSize: 15 },
            }}
          />
        </Box>
        {usernameKeyword ? (
          <Box>
            {debouncing || isSearching ? (
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box pb={5}>
                <Typography fontSize={14}>검색결과</Typography>
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
                  {members.map((member, index) => (
                    <>
                      <Box
                        sx={{
                          p: 0.5,
                          px: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <ColorAvatar
                            id={member.username}
                            name={member.name}
                          />
                        </Box>
                        <Box ml={1} flexGrow={1}>
                          <Tooltip
                            title="username"
                            arrow
                            placement="left-start"
                          >
                            <Typography fontSize={14} fontWeight={500}>
                              {member.username}
                            </Typography>
                          </Tooltip>
                          <Tooltip title="이름" arrow placement="left-start">
                            <Typography fontSize={12}>{member.name}</Typography>
                          </Tooltip>
                        </Box>
                        <Box>
                          {member.invited ? (
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              disableElevation
                              sx={{
                                p: 0,
                                fontSize: 13,
                              }}
                            >
                              초대중
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              disableElevation
                              sx={{
                                p: 0,
                                fontSize: 13,
                              }}
                              onClick={() => setSelectedMember(member)}
                            >
                              초대
                            </Button>
                          )}
                        </Box>
                      </Box>
                      {index < members.length - 1 ? <Divider /> : null}
                    </>
                  ))}
                  {members.length === 0 ? (
                    <Box
                      sx={{
                        p: 0.5,
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography fontSize={14}>
                        <NoData
                          content="일치하는 회원이 없습니다"
                          width={200}
                          height={100}
                          sx={{ pb: 3 }}
                        />
                      </Typography>
                    </Box>
                  ) : null}
                </Stack>
              </Box>
            )}
          </Box>
        ) : null}
        {/* 초대 확인 */}
        <ConfirmDialog
          open={isConfirmDialogOpen}
          handleClose={closeConfirm}
          maxWidth="sm"
          handleConfirm={() => {
            if (selectedMember) {
              invite(selectedMember.username, selectedRole)
              setMembers([
                {
                  username: selectedMember.username,
                  name: selectedMember.name,
                  invited: true,
                },
                ...members.filter(m => m.username !== selectedMember.username),
              ])
            }
          }}
        >
          <Box width={500}>
            <ConfirmInvitationComponent />
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
              <Box>
                <ColorAvatar
                  id={selectedMember?.username}
                  name={selectedMember?.name}
                />
              </Box>
              <Box ml={2} flexGrow={1}>
                <Typography fontSize={14} fontWeight={600}>
                  {selectedMember?.username}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography fontSize={12}>{selectedMember?.name}</Typography>
              </Box>
              <Box>
                <SelectRoleButton
                  onChange={item => setSelectedRole(item.role)}
                />
              </Box>
            </Box>
          </Box>
        </ConfirmDialog>
      </Stack>
    </Box>
  )
}

export default MemberInvite
