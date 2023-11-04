import Box from "@mui/material/Box"
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import React from "react"
import { useCreateWorkspaceStore } from "store/requestStore"
import { AxiosResponse } from "axios"
import { imageUploadApi, ImageUploadResponse } from "api/imageApi"
import ImageInput from "components/image/ImageInput"
import { ApiResponse } from "../../api"

const InputWorkspaceInfo = () => {
  const createWorkspaceState = useCreateWorkspaceStore()
  const { name, subject, description, imageUrl } =
    createWorkspaceState.createWorkspaceRequest.workspace

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    createWorkspaceState.setCreateWorkspaceRequest({
      ...createWorkspaceState.createWorkspaceRequest,
      workspace: {
        ...createWorkspaceState.createWorkspaceRequest.workspace,
        name: e.target.value,
      },
    })
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    createWorkspaceState.setCreateWorkspaceRequest({
      ...createWorkspaceState.createWorkspaceRequest,
      workspace: {
        ...createWorkspaceState.createWorkspaceRequest.workspace,
        description: e.target.value,
      },
    })
  }

  const onSubjectChange = (e: SelectChangeEvent) => {
    createWorkspaceState.setCreateWorkspaceRequest({
      ...createWorkspaceState.createWorkspaceRequest,
      workspace: {
        ...createWorkspaceState.createWorkspaceRequest.workspace,
        subject: e.target.value,
      },
    })
  }

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    if (file) {
      imageUploadApi({ image: file }).then(
        (res: AxiosResponse<ApiResponse<ImageUploadResponse>>) => {
          createWorkspaceState.setCreateWorkspaceRequest({
            ...createWorkspaceState.createWorkspaceRequest,
            workspace: {
              ...createWorkspaceState.createWorkspaceRequest.workspace,
              imageUrl: res.data.data.imageUrl,
            },
          })
        },
      )
    }
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">워크스페이스 정보 입력</Typography>
        <Box display="flex" alignItems="center">
          <ImageInput
            width={120}
            height={120}
            imageUrl={imageUrl}
            onImageChange={onImageChange}
          />
          <Box width="100%">
            <Stack spacing={2}>
              <TextField
                required
                label="워크스페이스 이름"
                variant="outlined"
                value={name}
                onChange={onNameChange}
              />
              <FormControl fullWidth required>
                <InputLabel>목적</InputLabel>
                <Select label="목적" value={subject} onChange={onSubjectChange}>
                  {/* TODO 임시 value */}
                  <MenuItem value="DEV_TEAM">IT 개발팀</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </Box>
        <TextField
          multiline
          rows={5}
          label="워크스페이스 설명"
          variant="outlined"
          value={description}
          onChange={onDescriptionChange}
        />
      </Stack>
    </Box>
  )
}

export default InputWorkspaceInfo
