import React from "react"
import { useAlert } from "hooks/useAlert"
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import InputWsProfileInfo from "components/workspace/InputWsProfileInfo"
import InputWorkspaceInfo from "components/workspace/InputWorkspaceInfo"
import {
  createWorkspaceApi,
  CreateWorkspaceRequestBody,
  WorkspaceInfo,
  WsProfileInfo,
} from "api/workspace"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TitleModal from "components/common/TitleModal"

interface InputWorkspaceInfoPageProps {
  workspaceInfo: WorkspaceInfo
  setWorkspaceInfo: (data: WorkspaceInfo) => void
  onCancelBtnClick: () => void
  onNextBtnClick: () => void
}

const InputWorkspaceInfoPage = ({
  workspaceInfo,
  setWorkspaceInfo,
  onCancelBtnClick,
  onNextBtnClick,
}: InputWorkspaceInfoPageProps) => {
  const { addError } = useAlert()

  return (
    <>
      <InputWorkspaceInfo
        workspaceInfo={workspaceInfo}
        handleDataChange={setWorkspaceInfo}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          height: 50,
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="outlined"
          onClick={onCancelBtnClick}
        >
          취소
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => {
            if (!workspaceInfo.title) {
              addError("워크스페이스 이름을 입력해주세요")

              return
            }
            onNextBtnClick()
          }}
        >
          다음
        </Button>
      </Stack>
    </>
  )
}

interface InputWsProfileInfoPageProps {
  wsProfileInfo: WsProfileInfo
  setWsProfileInfo: (data: WsProfileInfo) => void
  onPrevBtnClick: () => void
  onCreateBtnClick: () => void
}

const InputWsProfileInfoPage = ({
  wsProfileInfo,
  setWsProfileInfo,
  onPrevBtnClick,
  onCreateBtnClick,
}: InputWsProfileInfoPageProps) => {
  const { addError } = useAlert()

  return (
    <>
      <InputWsProfileInfo
        wsProfileInfo={wsProfileInfo}
        handleDataChange={setWsProfileInfo}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          pt: 2,
          height: 50,
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="outlined"
          onClick={onPrevBtnClick}
        >
          이전
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => {
            if (!wsProfileInfo.name) {
              addError("프로필 이름을 입력해주세요")

              return
            }

            if (!wsProfileInfo.email) {
              addError("사용할 이메일을 선택해주세요")

              return
            }
            onCreateBtnClick()
          }}
        >
          워크스페이스 생성
        </Button>
      </Stack>
    </>
  )
}

interface CreateWorkspaceModalProps {
  open: boolean
  handleClose: () => void
}

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

const CreateWorkspaceModal = ({
  open,
  handleClose,
}: CreateWorkspaceModalProps) => {
  const navigate = useNavigate()
  const { addSuccess } = useAlert()
  const [{ workspace, profile }, setRequest] =
    React.useState<CreateWorkspaceRequestBody>(initialState)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [processComplete, setProcessComplete] = React.useState(false)

  /**
   * 모달 닫을 때 clean-up 함수
   */
  const cleanUp = () => {
    setPageNumber(1)
    setProcessComplete(false)
    setRequest(initialState)
  }

  const close = () => {
    cleanUp()
    handleClose()
  }

  const createWorkspace = async () => {
    const { data } = await createWorkspaceApi({ workspace, profile })
    const { workspaceId } = data
    addSuccess(`워크스페이스가 생성되었습니다. id: ${workspaceId}`)
    navigate(`/workspace/${workspaceId}`)
    close()
  }

  React.useEffect(() => {
    // processComplete가 변경되면 워크스페이스 생성 요청 전송
    if (processComplete) {
      createWorkspace()
    }

    return setProcessComplete(false)
  }, [processComplete])

  const renderModalPage = () => {
    return pageNumber === 1 ? (
      <InputWorkspaceInfoPage
        workspaceInfo={workspace}
        setWorkspaceInfo={workspaceInfo =>
          setRequest(request => ({
            ...request,
            workspace: workspaceInfo,
          }))
        }
        onCancelBtnClick={close}
        onNextBtnClick={() => setPageNumber(2)}
      />
    ) : (
      <InputWsProfileInfoPage
        wsProfileInfo={profile}
        setWsProfileInfo={profileInfo =>
          setRequest(request => ({
            ...request,
            profile: profileInfo,
          }))
        }
        onPrevBtnClick={() => setPageNumber(1)}
        onCreateBtnClick={() => setProcessComplete(true)}
      />
    )
  }

  return (
    <TitleModal
      open={open}
      handleClose={close}
      title="워크스페이스 생성"
      maxWidth="sm"
    >
      <Box p={0}>
        <Stack spacing={2}>{renderModalPage()}</Stack>
      </Box>
    </TitleModal>
  )
}

export default CreateWorkspaceModal
