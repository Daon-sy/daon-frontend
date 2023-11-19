import React from "react"
import { Box, List, ListItem, ListItemAvatar, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { getWorkspaceStore } from "store/userStore"
import {
  modifyWorkspaceParticipantRoleApi,
  ModifyWorkspaceParticipantRoleRequestBody,
  myWorkspaceParticipantDetailApi,
  workspaceParticipantListApi,
} from "api/workspace"
import { roles, WorkspaceParticipant } from "_types/workspace"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import SelectListButton from "components/common/SelectListButton"
import { useAlert } from "hooks/useAlert"
import MemberInviteModal from "components/workspace/modal/MemberInviteModal"

const WorkspaceParticipantManage = () => {
  const { addSuccess } = useAlert()
  const { workspace, myProfile, setMyProfile } = getWorkspaceStore()
  const [workspaceParticipants, setWorkspaceParticipants] = React.useState<
    Array<WorkspaceParticipant>
  >([])
  const [inviteModalOpen, setInviteModalOpen] = React.useState(false)

  const fetchWorkspaceParticipants = async () => {
    if (workspace) {
      const { data } = await workspaceParticipantListApi(workspace.workspaceId)
      setWorkspaceParticipants(data.workspaceParticipants)
    }
  }

  const fetchMyWorkspaceProfile = async () => {
    if (workspace) {
      const { data } = await myWorkspaceParticipantDetailApi(
        workspace.workspaceId,
      )
      setMyProfile(data)
    }
  }

  React.useEffect(() => {
    fetchWorkspaceParticipants()
  }, [])

  const updateWorkspaceParticipantRole = async (
    data: ModifyWorkspaceParticipantRoleRequestBody,
  ) => {
    if (workspace) {
      await modifyWorkspaceParticipantRoleApi(workspace.workspaceId, {
        ...data,
      })
      addSuccess("참여자 권한 변경 완료")
      await fetchWorkspaceParticipants()

      if (data.workspaceParticipantId === myProfile?.workspaceParticipantId)
        await fetchMyWorkspaceProfile()
    }
  }

  return (
    <Box>
      <Stack spacing={5}>
        <Box>
          <Typography variant="h6">워크스페이스 참여자 목록</Typography>
          {myProfile?.role === "WORKSPACE_ADMIN" ? (
            <>
              <Box display="flex" justifyContent="end">
                <Button
                  variant="outlined"
                  onClick={() => setInviteModalOpen(true)}
                >
                  워크스페이스에 초대
                </Button>
              </Box>
              {inviteModalOpen ? (
                <MemberInviteModal
                  open={inviteModalOpen}
                  handleClose={() => setInviteModalOpen(false)}
                />
              ) : null}
            </>
          ) : null}
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
              {workspaceParticipants.map((participant, index) => (
                <ListItem
                  divider={index !== workspaceParticipants.length - 1}
                  secondaryAction={
                    <Box display="flex" alignItems="center">
                      <SelectListButton
                        readonly={myProfile?.role !== "WORKSPACE_ADMIN"}
                        buttonSize="small"
                        defaultValueId={
                          roles.findIndex(
                            value => value.role === participant.role,
                          ) + 1
                        }
                        valueList={roles.map((r, i) => {
                          return {
                            id: i + 1,
                            text: r.description,
                            value: r.role,
                          }
                        })}
                        endMuiIcon={
                          myProfile?.role === "WORKSPACE_ADMIN" ? (
                            <KeyboardArrowDownIcon />
                          ) : null
                        }
                        onValueChange={selectedValue =>
                          selectedValue &&
                          updateWorkspaceParticipantRole({
                            workspaceParticipantId:
                              participant.workspaceParticipantId,
                            role: selectedValue.value,
                          })
                        }
                      />
                      {myProfile?.role === "WORKSPACE_ADMIN" ? (
                        <Button size="small" sx={{ ml: 1, fontSize: 12 }}>
                          내보내기
                        </Button>
                      ) : null}
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={participant.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText>
                    <Box>
                      <Typography fontSize={15} fontWeight={700}>
                        {participant.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize={12} color="grey">
                        {participant.email}
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default WorkspaceParticipantManage
