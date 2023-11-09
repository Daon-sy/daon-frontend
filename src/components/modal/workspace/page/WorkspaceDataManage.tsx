import { Box, Button, Stack, TextField } from "@mui/material"
import React from "react"
import Typography from "@mui/material/Typography"
import ImageInput from "components/image/ImageInput"
import useInputs from "hooks/useInputs"
import { WorkspaceInfo } from "api/workspaceApi"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"

const WorkspaceDataManage = () => {
  const [ref] = useImageUrlInputRef()
  const [data, onChange] = useInputs<WorkspaceInfo>({
    name: "ws1",
    imageUrl: "",
    subject: "목적없음",
    description: "",
  })

  const { name, imageUrl, subject, description } = data

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    console.log(file)
  }

  return (
    <Box>
      <Box>
        <Box>
          <Stack spacing={2}>
            <Typography variant="h6">워크스페이스 정보</Typography>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 4,
          }}
        >
          <Button variant="contained">저장</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkspaceDataManage
