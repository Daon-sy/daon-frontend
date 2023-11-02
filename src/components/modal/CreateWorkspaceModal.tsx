import React from "react"
import { useAlert } from "hooks/useAlert"
import { Backdrop, Fade, Modal, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import InputWsProfileInfo from "components/modal/InputWsProfileInfo"
import InputWorkspaceInfo from "components/modal/InputWorkspaceInfo"
import { AxiosResponse } from "axios"
import { useCreateWorkspaceStore } from "store/requestStore"
import { createWorkspaceApi, CreateWorkspaceResponse } from "api/workspaceApi"

interface RenderInputWorkspaceInfoProps {
  onCancelBtnClick: () => void
  onNextBtnClick: () => void
}

const RenderInputWorkspaceInfo = (props: RenderInputWorkspaceInfoProps) => {
  const { onCancelBtnClick, onNextBtnClick } = props

  return (
    <>
      <InputWorkspaceInfo />
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
          onClick={onNextBtnClick}
        >
          다음
        </Button>
      </Stack>
    </>
  )
}

interface RenderInputWsProfileInfoProps {
  onPrevBtnClick: () => void
  onCreateBtnClick: () => void
}

const RenderInputWsProfileInfo = (props: RenderInputWsProfileInfoProps) => {
  const { onPrevBtnClick, onCreateBtnClick } = props

  return (
    <>
      <InputWsProfileInfo />
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
          onClick={onCreateBtnClick}
        >
          워크스페이스 생성
        </Button>
      </Stack>
    </>
  )
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
}

interface CreateWorkspaceModalProps {
  open: boolean
  handleClose: () => void
}

const CreateWorkspaceModal = (props: CreateWorkspaceModalProps) => {
  const [pageNumber, setPageNumber] = React.useState(1)
  const { addSuccess, addError } = useAlert()
  const { open, handleClose } = props
  const createWorkspaceState = useCreateWorkspaceStore()

  const setWorkspaceInfoView = () => {
    setPageNumber(1)
  }

  const setWsProfileInfoView = () => {
    setPageNumber(2)
  }

  const createWorkspace = () => {
    // TODO 응답 처리 필요
    createWorkspaceApi(createWorkspaceState.createWorkspaceRequest)
      .then((res: AxiosResponse<CreateWorkspaceResponse>) => {
        if (res.status === 201) {
          console.log(res.data)
          addSuccess("워크스페이스가 생성되었습니다.")
          // TODO 페이지 이동 필요
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          addError("입력값을 확인해주세요.")
        }

        if (err.response.status >= 500) {
          addError("서버 오류입니다. 다시 시도해주세요.")
        }
      })

    handleClose()
  }

  // TODO 이미지 업로드
  const renderModalPage = () => {
    return pageNumber === 1 ? (
      <RenderInputWorkspaceInfo
        onCancelBtnClick={handleClose}
        onNextBtnClick={setWsProfileInfoView}
      />
    ) : (
      <RenderInputWsProfileInfo
        onPrevBtnClick={setWorkspaceInfoView}
        onCreateBtnClick={createWorkspace}
      />
    )
  }

  /**
   * 모달 닫을 때 clean-up 함수
   */
  const cleanUp = () => {
    setWorkspaceInfoView()
    createWorkspaceState.clear()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      onTransitionExited={cleanUp}
    >
      <Fade in={open}>
        <Box sx={style}>
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
        </Box>
      </Fade>
    </Modal>
  )
}

export default CreateWorkspaceModal
