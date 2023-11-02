import Box from "@mui/material/Box"
import { Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import React from "react"
import { TEST_IMAGE_URL } from "env"
import { useCreateWorkspaceStore } from "store/requestStore"

const InputWsProfileInfo = () => {
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

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">워크스페이스 프로필 입력</Typography>
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              overflow: "hidden",
              marginRight: 2,
              border: "solid 1px",
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderRadius: "10px",
              width: 200,
              height: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={!imageUrl ? `${TEST_IMAGE_URL}` : imageUrl}
              sx={{
                objectFit: "cover",
                width: 200,
              }}
            />
          </Box>
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
