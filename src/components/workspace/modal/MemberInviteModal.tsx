import React from "react"
import TitleModal from "components/common/TitleModal"
import { Box, InputAdornment, Stack, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { searchMemberByUsernameApi } from "api/member"
import { inviteWorkspace } from "api/workspace"
import { getMyMemberDetailStore, getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"

interface SearchedMember {
  username: string
  name: string
}

interface Props {
  open: boolean
  handleClose: () => void
}

const MemberInviteModal = ({ open, handleClose }: Props) => {
  const { myDetail } = getMyMemberDetailStore()
  const { workspace } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [username, setUsername] = React.useState("")
  const [members, setMembers] = React.useState<Array<SearchedMember>>([])

  const fetchMembers = async () => {
    const { data } = await searchMemberByUsernameApi(username)
    setMembers(
      data.members.filter(member => member.username !== myDetail?.username),
    )
  }

  React.useEffect(() => {
    if (username) fetchMembers()
    else setMembers([])
  }, [username])

  const inviteMember = async (selectedUsername: string) => {
    if (workspace) {
      await inviteWorkspace(workspace.workspaceId, {
        username: selectedUsername,
      })
      addSuccess("사용자 초대 완료")
    }
  }

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="회원 초대"
      maxWidth="xs"
      height={400}
    >
      <Box height="100%">
        <Stack spacing={2} height="100%">
          <Box>
            <TextField
              fullWidth
              autoComplete="off"
              size="small"
              placeholder="회원 아이디를 검색하세요"
              value={username}
              onChange={e => setUsername(e.target.value)}
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
          {members.length > 0 ? (
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
                {members.map(member => (
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
                      <Box>
                        <Typography fontWeight={700}>{member.name}</Typography>
                      </Box>
                      <Box>
                        <Typography fontSize={14}>{member.username}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          p: 0,
                          fontSize: 13,
                        }}
                        onClick={() => inviteMember(member.username)}
                      >
                        초대
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Stack>
      </Box>
    </TitleModal>
  )
}

export default MemberInviteModal
