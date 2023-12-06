import React from "react"
import { FormControl, MenuItem, Select, Stack, Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { useAlert } from "hooks/useAlert"
import ImageInput from "components/image/ImageInput"
import { getWorkspaceStore } from "store/userStore"
import { imageUploadApi } from "api/image"
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

  if (!(workspace && myProfile)) return <Box />
  const { imageUrl, name, email } = myProfile

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    if (file) {
      try {
        const { data: responseBody } = await imageUploadApi({ image: file })
        changeRef(responseBody.imageUrl)
      } catch (err) {
        console.error(err)
      }
    }
  }

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
          <ImageInput
            width={200}
            height={200}
            borderRadius={50}
            border="none"
            imageUrl={imageUrl}
            onImageChange={onImageChange}
          />
          <input
            hidden
            type="text"
            name="imageUrl"
            ref={ref}
            onChange={e =>
              updateMyWorkspaceProfile({ imageUrl: e.currentTarget.value })
            }
          />

          <Box width="100%">
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

      <Box mt={1} sx={{ position: "absolute", bottom: 10, right: 0 }}>
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
