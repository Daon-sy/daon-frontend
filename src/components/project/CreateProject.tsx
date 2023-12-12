import React from "react"
import { Box, Button, Stack, TextField, FormHelperText } from "@mui/material"
import { CreateProjectRequestBody } from "api/project"
import { getWorkspaceStore } from "store/userStore"
import useInputs from "hooks/useInputs"
import useCreateProject from "hooks/project/useCreateProject"

const initialState: CreateProjectRequestBody = {
  title: "",
  description: "",
}

interface Props {
  onCancelButtonClick: () => void
  navigateOnCreateSuccess?: boolean
}

const CreateProject: React.FC<Props> = ({
  onCancelButtonClick,
  navigateOnCreateSuccess = false,
}: Props) => {
  const { workspace } = getWorkspaceStore()
  const [data, onChange] = useInputs<CreateProjectRequestBody>(initialState)
  const { fetch } = useCreateProject(
    {
      workspaceId: workspace?.workspaceId || 0,
      navigateOnCreateSuccess,
    },
    onCancelButtonClick,
  )

  return (
    <Box p={2}>
      <Stack spacing={2}>
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
            rows={8}
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
          onClick={onCancelButtonClick}
        >
          취소
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateProject
