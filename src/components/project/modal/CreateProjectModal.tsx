import React from "react"
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormHelperText,
} from "@mui/material"
import { useAlert } from "hooks/useAlert"
import TitleModal from "components/common/TitleModal"
import useInputs from "hooks/useInputs"
import { createProjectApi, CreateProjectRequestBody } from "api/project"
import { getProjectsStore, getWorkspaceStore } from "store/userStore"

interface CreateProjectProps {
  open: boolean
  handleClose: () => void
}

const initialState: CreateProjectRequestBody = {
  title: "",
  description: "",
}

const CreateProjectModal: React.FC<CreateProjectProps> = ({
  open,
  handleClose,
}: CreateProjectProps) => {
  const { workspace } = getWorkspaceStore()
  const { addSuccess, addError } = useAlert()
  const { projects, setProjects } = getProjectsStore()
  const [data, onChange, resetData] =
    useInputs<CreateProjectRequestBody>(initialState)
  const onValidateBtn = () => {
    if (!workspace?.workspaceId) return

    if (data.title.length === 0) {
      addError("프로젝트 제목은 필수입력 값입니다")

      return
    }

    createProjectApi(workspace.workspaceId, data)
      .then(response => {
        addSuccess("프로젝트 생성 성공!")
        const newProject = {
          projectId: response.data.projectId,
          title: data.title,
          description: data.description,
        }
        setProjects([...projects, newProject])
        handleClose()
      })
      .catch(err => {
        if (err.response.status >= 500) {
          addError("서버 오류입니다. 다시 시도해주세요")
        }
      })
  }

  return (
    <div>
      <TitleModal
        open={open}
        handleClose={() => {
          resetData()
          handleClose()
        }}
        title="프로젝트 생성"
        maxWidth="xs"
      >
        <Stack spacing={2}>
          <Typography variant="h6">프로젝트 정보 입력</Typography>
          <Box sx={{ width: "100%" }}>
            <TextField
              required
              label="프로젝트 이름"
              variant="outlined"
              name="title"
              value={data.title}
              onChange={onChange}
              inputProps={{ maxLength: 20 }}
              fullWidth
            />
            <FormHelperText
              sx={{ textAlign: "end" }}
            >{`${data.title.length}/20자`}</FormHelperText>
          </Box>
          <Box>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={5}
              label="프로젝트 설명"
              name="description"
              variant="outlined"
              value={data.description}
              onChange={onChange}
              inputProps={{ maxLength: 100 }}
            />
            <FormHelperText sx={{ textAlign: "end" }}>
              {`${data.description?.length}/100자`}
            </FormHelperText>
          </Box>
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
            variant="contained"
            onClick={onValidateBtn}
          >
            확인
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => {
              resetData()
              handleClose()
            }}
          >
            취소
          </Button>
        </Stack>
      </TitleModal>
    </div>
  )
}

export default CreateProjectModal
