import React from "react"
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormHelperText,
} from "@mui/material"
import { CreateProjectRequestBody } from "api/project"
import { getWorkspaceStore } from "store/userStore"
import TitleModal from "components/common/TitleModal"
import useInputs from "hooks/useInputs"
import useCreateProject from "hooks/project/useCreateProject"

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
  const [data, onChange] = useInputs<CreateProjectRequestBody>(initialState)
  const { fetch } = useCreateProject(
    {
      workspaceId: workspace?.workspaceId || 0,
    },
    handleClose,
  )

  return (
    <div>
      <TitleModal
        open={open}
        handleClose={handleClose}
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
            onClick={() => fetch(data)}
          >
            확인
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={handleClose}
          >
            취소
          </Button>
        </Stack>
      </TitleModal>
    </div>
  )
}

export default CreateProjectModal
