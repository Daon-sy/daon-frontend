import React from "react"
import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material"
import useCreateWorkspaceNotice from "hooks/workspace/useCreateWorkspaceNotice"
import { useAlert } from "hooks/useAlert"

interface Props {
  workspaceId: number
  onCancel: () => void
}

const CreateWorkspaceNotice: React.FC<Props> = ({
  workspaceId,
  onCancel,
}: Props) => {
  const [title, setTitle] = React.useState<string>("")
  const [content, setContent] = React.useState<string>("")
  const { fetchCreateWorkspaceNotice, error } =
    useCreateWorkspaceNotice(workspaceId)
  const { addError } = useAlert()
  const handleCreate = async () => {
    if (title.length === 0 || content.length === 0) {
      addError("필수 입력 값을 입력해주세요")
      return
    }
    await fetchCreateWorkspaceNotice({ title, content })
    if (!error) {
      onCancel()
    }
  }
  return (
    <Box>
      <Stack direction="row">
        <Box component="div">제목</Box>
        <TextField
          required
          size="small"
          value={title}
          onChange={e => setTitle(e.target.value)}
          inputProps={{ maxLength: 50 }}
        />
        <FormHelperText
          sx={{ textAlign: "end" }}
        >{`${title.length}/50자`}</FormHelperText>
      </Stack>
      <Stack direction="row">
        <Box component="div">내용</Box>
        <TextField
          required
          multiline
          value={content}
          onChange={e => setContent(e.target.value)}
          inputProps={{ maxLength: 500 }}
        />
        <FormHelperText
          sx={{ textAlign: "end" }}
        >{`${content.length}/500자`}</FormHelperText>
      </Stack>
      <Button onClick={handleCreate}>생성</Button>
    </Box>
  )
}

export default CreateWorkspaceNotice
