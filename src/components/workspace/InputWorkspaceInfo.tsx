import React from "react"
import Box from "@mui/material/Box"
import { FormHelperText, Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import ImageInput from "components/image/ImageInput"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import { imageUploadApi } from "api/image"
import { WorkspaceInfo } from "api/workspace"

interface Props {
  workspaceInfo: WorkspaceInfo
  handleDataChange: (data: WorkspaceInfo) => void
}

const InputWorkspaceInfo: React.FC<Props> = ({
  workspaceInfo,
  handleDataChange,
}: Props) => {
  const { title, subject, description, imageUrl } = workspaceInfo
  const [ref, changeRef] = useImageUrlInputRef()

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

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">워크스페이스 정보 입력</Typography>
        <Box display="flex" alignItems="center">
          <ImageInput
            width={140}
            height={140}
            imageUrl={imageUrl}
            onImageChange={onImageChange}
          />
          <input
            hidden
            type="text"
            ref={ref}
            onChange={e =>
              handleDataChange({ ...workspaceInfo, imageUrl: e.target.value })
            }
          />
          <Box width="100%">
            <Stack spacing={1}>
              <Box>
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="워크스페이스 이름"
                  variant="outlined"
                  value={title}
                  onChange={e =>
                    handleDataChange({
                      ...workspaceInfo,
                      title: e.target.value,
                    })
                  }
                  inputProps={{ maxLength: 20 }}
                />
                <FormHelperText
                  sx={{ textAlign: "end" }}
                >{`${title?.length}/20자`}</FormHelperText>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  size="small"
                  label="워크스페이스 목적"
                  variant="outlined"
                  value={subject}
                  onChange={e =>
                    handleDataChange({
                      ...workspaceInfo,
                      subject: e.target.value,
                    })
                  }
                  inputProps={{ maxLength: 10 }}
                />
                <FormHelperText
                  sx={{ textAlign: "end" }}
                >{`${subject?.length}/10자`}</FormHelperText>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={5}
            label="워크스페이스 설명"
            variant="outlined"
            value={description}
            onChange={e =>
              handleDataChange({
                ...workspaceInfo,
                description: e.target.value,
              })
            }
            inputProps={{ maxLength: 100 }}
          />
          <FormHelperText sx={{ textAlign: "end" }}>
            {`${description?.length}/100자`}
          </FormHelperText>
        </Box>
      </Stack>
    </Box>
  )
}

export default InputWorkspaceInfo
