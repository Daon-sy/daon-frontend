import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { Stack, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { createProjectApi } from "api/projectApi"
import { useAlert } from "hooks/useAlert"

interface CreateProjectProps {
  open: boolean
  handleClose: () => void
}
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

interface CreateProjectForm {
  projectName: string
  description: string
}

const CreateProjectModal: React.FC<CreateProjectProps> = (
  props: CreateProjectProps,
) => {
  const { open, handleClose } = props
  const [formData, setFormData] = React.useState<CreateProjectForm>({
    projectName: "",
    description: "",
  })
  const { addSuccess, addError } = useAlert()

  const onProjectNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      projectName: e.target.value,
    })
  }

  const onProjectDescriptionChanged = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }

  const onValidateBtn = () => {
    if (formData.projectName.length === 0) {
      addError("프로젝트 제목은 필수입력 값입니다")

      return
    }

    createProjectApi({
      projectName: formData.projectName,
      description: formData.description,
    })
      .then(res => {
        if (res.status === 201) {
          addSuccess("프로젝트 생성 성공!")
        }
      })
      .catch(err => {
        if (err.response >= 500) {
          addError("서버 오류입니다. 다시 시도해주세요")
        }
      })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              variant="outlined"
              value={formData.projectName}
              onChange={onProjectNameChanged}
            />
            <TextField
              multiline
              rows={5}
              label="프로젝트 설명"
              variant="outlined"
              value={formData.description}
              onChange={onProjectDescriptionChanged}
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
              onClick={handleClose}
            >
              취소
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateProjectModal
