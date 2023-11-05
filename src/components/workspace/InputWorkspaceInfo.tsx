import React from "react"
import Box from "@mui/material/Box"
import { Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import ImageInput from "components/image/ImageInput"
import { WorkspaceInfo } from "api/workspaceApi"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import { imageUploadApi } from "../../api/imageApi"

interface Props {
  data: WorkspaceInfo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputWorkspaceInfo: React.FC<Props> = ({ data, onChange }: Props) => {
  const { name, subject, description, imageUrl } = data
  const [ref, changeRef] = useImageUrlInputRef()
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    if (file) {
      try {
        const { data: responseData } = await imageUploadApi({ image: file })
        changeRef(responseData.data.imageUrl)
      } catch (err) {
        console.error(err)
      }
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
          <input
            hidden
            type="text"
            name="imageUrl"
            ref={ref}
            onChange={onChange}
          />
          <Box width="100%">
            <Stack spacing={2}>
              <TextField
                required
                label="워크스페이스 이름"
                name="name"
                variant="outlined"
                value={name}
                onChange={onChange}
              />
              <TextField
                label="워크스페이스 목적"
                name="subject"
                variant="outlined"
                value={subject}
                onChange={onChange}
              />
            </Stack>
          </Box>
        </Box>
        <TextField
          multiline
          rows={5}
          label="워크스페이스 설명"
          name="description"
          variant="outlined"
          value={description}
          onChange={onChange}
        />
      </Stack>
    </Box>
  )
}

export default InputWorkspaceInfo
