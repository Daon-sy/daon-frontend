import React from "react"
import { useAlert } from "hooks/useAlert"
import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import InputWsProfileInfo from "components/workspace/InputWsProfileInfo"
import InputWorkspaceInfo from "components/workspace/InputWorkspaceInfo"
import CustomModal from "components/common/CustomModal"
import useInputs from "hooks/useInputs"
import {
  createWorkspaceApi,
  CreateWorkspaceRequestBody,
  WorkspaceInfo,
  WsProfileInfo,
} from "api/workspace"

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
  const [data, onChange] = useInputs<WorkspaceInfo>(workspaceInfo)

  return (
    <>
      <InputWorkspaceInfo data={data} onChange={onChange} />
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
            setWorkspaceInfo(data)
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
  const [data, onChange] = useInputs<WsProfileInfo>(wsProfileInfo)

  return (
    <>
      <InputWsProfileInfo data={data} onChange={onChange} />
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
          onClick={onPrevBtnClick}
        >
          이전
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => {
            setWsProfileInfo(data)
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

const CreateWorkspaceModal = (props: CreateWorkspaceModalProps) => {
  const [{ workspace, profile }, setRequest] =
    React.useState<CreateWorkspaceRequestBody>(initialState)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [processComplete, setProcessComplete] = React.useState(false)
  const { addSuccess, addError } = useAlert()
  const { open, handleClose } = props

  const createWorkspace = React.useCallback(async () => {
    createWorkspaceApi({ workspace, profile })
      .then(res => {
        const { workspaceId } = res.data
        // TODO 메시지 변경, 워크스페이스 페이지로 이동
        addSuccess(`워크스페이스가 생성되었습니다. id: ${workspaceId}`)
        handleClose()
      })
      .catch(err => {
        if (err.response) {
          const { status } = err.response
          if (status === 400) addError("입력값을 확인해주세요.")
          if (status === 401) {
            addError("로그인이 필요한 서비스입니다.")
            // TODO 로그인 페이지로 이동
          }
          if (status >= 500) addError("서버 오류입니다. 다시 시도해주세요.")
        }
      })
  }, [addError, addSuccess, handleClose, profile, workspace])

  React.useEffect(() => {
    // processComplete가 변경되면 워크스페이스 생성 요청 전송
    if (processComplete) {
      createWorkspace()
    }

    return setProcessComplete(false)
  }, [createWorkspace, processComplete])

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
        onCancelBtnClick={handleClose}
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

  /**
   * 모달 닫을 때 clean-up 함수
   */
  const cleanUp = () => {
    setPageNumber(1)
    setProcessComplete(false)
    setRequest(initialState)
  }

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      cleanUp={cleanUp}
      width={500}
      minHeight={500}
      maxHeight={800}
    >
      <Stack spacing={2}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            paddingBottom: 2,
          }}
        >
          워크스페이스 생성
        </Typography>
        {renderModalPage()}
      </Stack>
    </CustomModal>
  )
}

export default CreateWorkspaceModal
