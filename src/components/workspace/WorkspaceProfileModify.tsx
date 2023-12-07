import React from "react"
import { FormControl, MenuItem, Select, Stack, Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { useAlert } from "hooks/useAlert"
import { getWorkspaceStore } from "store/userStore"
import {
  modifyMyWorkspaceParticipantInfoApi,
  ModifyMyWorkspaceParticipantInfoRequestBody,
  myWorkspaceParticipantDetailApi,
  withdrawWorkspaceApi,
} from "api/workspace"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import { MemberEmail } from "_types/member"
import { myEmailsApi } from "api/member"
import EditableTextBox from "components/common/EditableTextBox"
import ConfirmDialog from "components/common/ConfirmDialog"
import { useNavigate } from "react-router-dom"
import ColorAvatar from "components/common/ColorAvatar"
import MenuBox from "../common/MenuBox"
import useImageUpload from "../../hooks/image/useImageUpload"

const WorkspaceProfileModify = () => {
  const { workspace, myProfile, setMyProfile } = getWorkspaceStore()
  const workspaceId = workspace?.workspaceId
  const { addSuccess } = useAlert()
  const navigate = useNavigate()
  const [ref, changeRef] = useImageUrlInputRef()
  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])
  const [workspaceWithdrawModalOpen, setWorkspaceWithdrawModalOpen] =
    React.useState(false)
  const fetchMemberEmails = async () => {
    const { data } = await myEmailsApi()
    setMemberEmails(data.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

  const { ImageInput, selectFile } = useImageUpload()

  if (!(workspace && myProfile)) return <Box />
  const { workspaceParticipantId, imageUrl, name, email } = myProfile

  const updateMyWorkspaceProfile = async (
    data: ModifyMyWorkspaceParticipantInfoRequestBody,
  ) => {
    await modifyMyWorkspaceParticipantInfoApi(workspace.workspaceId, {
      ...data,
    })
    addSuccess("프로필 정보 수정 완료")
    const { data: myWorkspaceProfile } = await myWorkspaceParticipantDetailApi(
      workspace.workspaceId,
    )
    setMyProfile(myWorkspaceProfile)
  }

  const withdrawWorkspace = async () => {
    if (workspaceId) {
      await withdrawWorkspaceApi(workspaceId)
      addSuccess("워크스페이스를 탈퇴하였습니다")
      // 개인워크스페이스로 이동
      navigate("workspace/1")
    }
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="center">
          <MenuBox
            menus={[
              {
                disabled: !imageUrl,
                children: "기본이미지",
                onClick: () => updateMyWorkspaceProfile({ imageUrl: "" }),
              },
              {
                children: "이미지 선택",
                onClick: () =>
                  selectFile({
                    autoFetch: true,
                    fetchCallback: changeRef,
                  }),
              },
            ]}
          >
            <ImageInput>
              <ColorAvatar
                id={workspaceParticipantId}
                src={imageUrl}
                sx={{
                  width: 140,
                  height: 140,
                }}
              />
            </ImageInput>
          </MenuBox>
          <input
            hidden
            type="text"
            name="imageUrl"
            ref={ref}
            onChange={e =>
              updateMyWorkspaceProfile({ imageUrl: e.currentTarget.value })
            }
          />

          <Box ml={4} width="100%">
            <Stack spacing={2} justifyContent="center" height="100%">
              <Box>
                <Typography
                  variant="inherit"
                  pb={1}
                  fontSize={15}
                  fontWeight={700}
                  color="primary.main"
                >
                  프로필 이름
                </Typography>
                <EditableTextBox
                  enterComplete
                  text={name}
                  handleUpdate={value =>
                    value && updateMyWorkspaceProfile({ name: value })
                  }
                  fontSize={14}
                  maxTextLength={20}
                />
              </Box>
              <Box>
                <Typography
                  variant="inherit"
                  pb={1}
                  fontSize={15}
                  fontWeight={700}
                  color="primary.main"
                >
                  이메일
                </Typography>
                <FormControl
                  fullWidth
                  sx={{
                    fontSize: 14,
                    minWidth: 80,
                    "&:hover": {
                      backgroundColor: "rgb(242,242,242)",
                    },
                  }}
                >
                  <Select
                    autoWidth
                    style={{ height: 40 }}
                    size="small"
                    value={email}
                    onChange={e =>
                      updateMyWorkspaceProfile({ email: e.target.value })
                    }
                  >
                    {memberEmails?.map(memberEmail => (
                      <MenuItem
                        value={memberEmail.email}
                        sx={{ minWidth: 80, fontSize: 14 }}
                      >
                        {memberEmail.email}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>

      <Box mt={1} sx={{ position: "absolute", bottom: 10, right: 30 }}>
        <Button
          sx={{ color: "#c9c9c9" }}
          onClick={() => setWorkspaceWithdrawModalOpen(true)}
        >
          워크스페이스 탈퇴
        </Button>
      </Box>
      {workspaceWithdrawModalOpen ? (
        <ConfirmDialog
          open={workspaceWithdrawModalOpen}
          maxWidth="xs"
          handleConfirm={withdrawWorkspace}
          handleClose={() => {
            setWorkspaceWithdrawModalOpen(false)
          }}
        >
          정말로 이 워크스페이스를 탈퇴하시겠습니까?
        </ConfirmDialog>
      ) : null}
    </Box>
  )
}

export default WorkspaceProfileModify
