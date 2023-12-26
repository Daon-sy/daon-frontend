import React from "react"
import { Box, Button, Stack } from "@mui/material"
import { JoinWorkspaceRequestBody } from "api/workspace"
import { useAlert } from "hooks/useAlert"
import useJoinWorkspace from "hooks/workspace/useJoinWorkspace"
import InputWsProfileInfo from "components/workspace/InputWsProfileInfo"

interface Props {
  workspaceId: number
  handleSuccess: () => void
  handleCancel: () => void
}

const JoinWorkspace = ({ workspaceId, handleSuccess, handleCancel }: Props) => {
  const [profile, setProfile] = React.useState<JoinWorkspaceRequestBody>({
    name: "",
    imageUrl: "",
    email: "",
  })
  const { fetch: joinWorkspace } = useJoinWorkspace(handleSuccess)
  const { addError } = useAlert()

  return (
    <Box p={0}>
      <Stack spacing={2}>
        <Box height={220}>
          <InputWsProfileInfo
            wsProfileInfo={profile}
            handleDataChange={profileInfo => setProfile({ ...profileInfo })}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              if (!profile.name) {
                addError("프로필 이름을 입력해주세요")
                return
              }
              if (!profile.email) {
                addError("사용할 이메일을 선택해주세요")
                return
              }
              joinWorkspace(workspaceId, profile)
            }}
          >
            참여
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={handleCancel}
          >
            취소
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default JoinWorkspace
