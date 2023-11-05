import React from "react"
import Box from "@mui/material/Box"
import { Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import ImageInput from "components/image/ImageInput"
import { WsProfileInfo } from "api/workspaceApi"
import { imageUploadApi } from "api/imageApi"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"

interface Props {
  data: WsProfileInfo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputWsProfileInfo: React.FC<Props> = ({ data, onChange }: Props) => {
  const { name, imageUrl } = data
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
        <Typography variant="h6">워크스페이스 프로필 입력</Typography>
        <Box display="flex" justifyContent="center">
          <ImageInput
            width={218}
            height={218}
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
        </Box>
        <TextField
          required
          label="프로필 이름"
          name="name"
          variant="outlined"
          value={name}
          onChange={onChange}
        />
      </Stack>
    </Box>
  )
}

export default InputWsProfileInfo
