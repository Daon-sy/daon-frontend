import React from "react"
import Typography from "@mui/material/Typography"
import { Stack, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { useAlert } from "hooks/useAlert"
import CustomModal from "components/common/CustomModal"
import useInputs from "hooks/useInputs"
import { createProjectApi, CreateProjectRequestBody } from "api/project"
import { getWorkspaceStore } from "store/userStore"

interface CreateProjectProps {
  open: boolean
  handleClose: () => void
  cleanUp: () => void
}

const initialState: CreateProjectRequestBody = {
  title: "",
  description: "",
}

const CreateProjectModal: React.FC<CreateProjectProps> = ({
  open,
  handleClose,
  cleanUp,
}: CreateProjectProps) => {
  const { workspace } = getWorkspaceStore()
  const [data, onChange, resetData] =
    useInputs<CreateProjectRequestBody>(initialState)
  const { addSuccess, addError } = useAlert()

  const onValidateBtn = () => {
    if (!workspace?.workspaceId) return

    if (data.title.length === 0) {
      addError("프로젝트 제목은 필수입력 값입니다")

      return
    }

    createProjectApi(workspace.workspaceId, data)
      .then(() => {
        addSuccess("프로젝트 생성 성공!")
      })
      .catch(err => {
        if (err.response.status >= 500) {
          addError("서버 오류입니다. 다시 시도해주세요")
        }
      })
  }

  return (
    <div>
      <CustomModal
        open={open}
        handleClose={() => {
          resetData()
          handleClose()
        }}
        cleanUp={cleanUp}
        width={400}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            paddingBottom: 2,
          }}
        >
          프로젝트 생성
        </Typography>
        <Stack spacing={2}>
          <Typography variant="h6">프로젝트 정보 입력</Typography>
          <TextField
            required
            label="프로젝트 이름"
            name="projectName"
            variant="outlined"
            value={data.title}
            onChange={onChange}
          />
          <TextField
            multiline
            rows={5}
            label="프로젝트 설명"
            name="projectDescription"
            variant="outlined"
            value={data.description}
            onChange={onChange}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            height: 50,
            mt: 2,
          }}
        >
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={onValidateBtn}
          >
            확인
          </Button>
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              resetData()
              handleClose()
            }}
          >
            취소
          </Button>
        </Stack>
      </CustomModal>
    </div>
  )
}

export default CreateProjectModal
