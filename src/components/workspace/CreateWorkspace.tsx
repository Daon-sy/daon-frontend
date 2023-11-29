import React from "react"
import { Box, Button, Stack } from "@mui/material"
import { CreateWorkspaceRequestBody } from "api/workspace"
import { useAlert } from "hooks/useAlert"
import useCreateWorkspace from "hooks/workspace/useCreateWorkspace"
import InputWsProfileInfo from "components/workspace/InputWsProfileInfo"
import InputWorkspaceInfo from "components/workspace/InputWorkspaceInfo"

const initialState: CreateWorkspaceRequestBody = {
  workspace: {
    title: "",
    imageUrl: "",
    description: "",
    subject: "",
  },
  profile: {
    name: "",
    imageUrl: "",
    email: "",
  },
}

interface ButtonProps {
  text: string
  action: () => void
}

interface Props {
  handleCancel: () => void
}

const CreateWorkspace = ({ handleCancel }: Props) => {
  const [{ workspace, profile }, setRequest] =
    React.useState<CreateWorkspaceRequestBody>(initialState)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [processComplete, setProcessComplete] = React.useState(false)
  const { fetch: createWorkspace } = useCreateWorkspace(handleCancel)
  const { addError } = useAlert()

  React.useEffect(() => {
    // processComplete가 변경되면 워크스페이스 생성 요청 전송
    if (processComplete) createWorkspace({ workspace, profile })

    return setProcessComplete(false)
  }, [processComplete])

  const buttonProps: Array<ButtonProps[]> = [
    [
      {
        text: "다음",
        action: () => {
          if (!workspace.title) {
            addError("워크스페이스 제목을 입력해주세요")
            return
          }
          setPageNumber(2)
        },
      },
      { text: "취소", action: handleCancel },
    ],
    [
      {
        text: "생성",
        action: () => {
          if (!profile.name) {
            addError("프로필 이름을 입력해주세요")
            return
          }
          if (!profile.email) {
            addError("사용할 이메일을 선택해주세요")
            return
          }
          setProcessComplete(true)
        },
      },
      { text: "이전", action: () => setPageNumber(1) },
    ],
  ]

  return (
    <Box p={0}>
      <Stack spacing={2}>
        <Box height={400}>
          {pageNumber === 1 ? (
            <InputWorkspaceInfo
              workspaceInfo={workspace}
              handleDataChange={workspaceInfo =>
                setRequest(request => ({
                  ...request,
                  workspace: workspaceInfo,
                }))
              }
            />
          ) : (
            <InputWsProfileInfo
              wsProfileInfo={profile}
              handleDataChange={profileInfo =>
                setRequest(request => ({
                  ...request,
                  profile: profileInfo,
                }))
              }
            />
          )}
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={buttonProps[pageNumber - 1][0].action}
          >
            {buttonProps[pageNumber - 1][0].text}
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={buttonProps[pageNumber - 1][1].action}
          >
            {buttonProps[pageNumber - 1][1].text}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CreateWorkspace
