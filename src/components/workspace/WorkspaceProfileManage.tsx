import React from "react"
import { FormControl, MenuItem, Select, Stack } from "@mui/material"
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
} from "api/workspace"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import EditableBox from "components/common/EditableBox"
import { MemberEmail } from "_types/member"
import { myEmailsApi } from "api/member"

const WorkspaceProfileManage = () => {
  const { workspace, myProfile, setMyProfile } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [ref, changeRef] = useImageUrlInputRef()
  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])

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

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">내 프로필 정보</Typography>
        <Box display="flex" justifyContent="center">
          <Box mr={2}>
            <ImageInput
              width={160}
              height={160}
              borderRadius={20}
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
          </Box>
          <Box width="100%">
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="inherit"
                  p={0.5}
                  fontSize={15}
                  fontWeight={500}
                >
                  프로필 이름
                </Typography>
                <EditableBox
                  autoFocus
                  enterComplete
                  text={name}
                  handleUpdate={value =>
                    value && updateMyWorkspaceProfile({ name: value })
                  }
                  maxTextLength={20}
                  style={{
                    borderColor: "rgba(200,200,200)",
                    borderWidth: 1,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="inherit"
                  p={0.5}
                  fontSize={15}
                  fontWeight={500}
                >
                  이메일
                </Typography>
                <FormControl
                  fullWidth
                  sx={{
                    minWidth: 80,
                    "&:hover": {
                      backgroundColor: "rgb(242,242,242)",
                    },
                  }}
                >
                  <Select
                    autoWidth
                    size="small"
                    value={email}
                    onChange={e =>
                      updateMyWorkspaceProfile({ email: e.target.value })
                    }
                  >
                    {memberEmails.map(memberEmail => (
                      <MenuItem value={memberEmail.email}>
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
    </Box>
  )
}

export default WorkspaceProfileManage
