import Box from "@mui/material/Box"
import { Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import React from "react"
import { useCreateWorkspaceStore } from "store/requestStore"
import { imageUploadApi, ImageUploadResponse } from "api/imageApi"
import { AxiosResponse } from "axios"
import ImageInput from "components/image/ImageInput"

const InputWsProfileInfo = () => {
  const fileInput = React.useRef<HTMLInputElement>(null)
  const createWorkspaceState = useCreateWorkspaceStore()
  const { imageUrl, nickname } =
    createWorkspaceState.createWorkspaceRequest.profile

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    createWorkspaceState.setCreateWorkspaceRequest({
      ...createWorkspaceState.createWorkspaceRequest,
      profile: {
        ...createWorkspaceState.createWorkspaceRequest.profile,
        nickname: e.target.value,
      },
    })
  }

  const onImageBoxClick = () => fileInput.current?.click()

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    if (file) {
      imageUploadApi({ image: file }).then(
        (res: AxiosResponse<ImageUploadResponse>) => {
          createWorkspaceState.setCreateWorkspaceRequest({
            ...createWorkspaceState.createWorkspaceRequest,
            profile: {
              ...createWorkspaceState.createWorkspaceRequest.profile,
              imageUrl: res.data.imageUrl,
            },
          })
        },
      )
    }
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">워크스페이스 프로필 입력</Typography>
        <Box display="flex" justifyContent="center">
          <ImageInput
            width={200}
            height={200}
            imageUrl={imageUrl}
            onImageChange={onImageChange}
          />
        </Box>
        <TextField
          required
          label="프로필 이름"
          variant="outlined"
          value={nickname}
          onChange={onNicknameChange}
        />
      </Stack>
    </Box>
  )
}

export default InputWsProfileInfo
