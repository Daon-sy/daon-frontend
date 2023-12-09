import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"
import { useAlert } from "hooks/useAlert"
import useModifyWorkspaceNotice from "hooks/workspace/useModifyWorkspaceNotice"
import React from "react"
import { ModifyWorkspaceNoticeRequestBody } from "api/workspaceNotice"

interface Props {
  workspaceId: number
  noticeId: number
  notice: WorkspaceNoticeDetail
  onCancel: () => void
}

const ModifyWorkspaceNotice: React.FC<Props> = ({
  workspaceId,
  noticeId,
  notice,
  onCancel,
}: Props) => {
  const { title, content } = notice
  const [requestBody, setRequestBody] =
    React.useState<ModifyWorkspaceNoticeRequestBody>({ title, content })
  const { addError } = useAlert()
  const { fetchModifyWorkspaceNotice, error } = useModifyWorkspaceNotice(
    workspaceId,
    noticeId,
  )
  const handleModify = async () => {
    if (title.length === 0 || content.length === 0) {
      addError("필수 입력 값을 입력해주세요")
      return
    }
    await fetchModifyWorkspaceNotice(requestBody)
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
          value={requestBody.title}
          onChange={e =>
            setRequestBody(data => ({
              ...data,
              title: e.target.value,
            }))
          }
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
          value={requestBody.content}
          onChange={e =>
            setRequestBody(data => ({
              ...data,
              content: e.target.value,
            }))
          }
          inputProps={{ maxLength: 500 }}
        />
        <FormHelperText
          sx={{ textAlign: "end" }}
        >{`${content.length}/500자`}</FormHelperText>
      </Stack>
      <Button onClick={handleModify}>수정</Button>
      <Button onClick={onCancel}>취소</Button>
    </Box>
  )
}

export default ModifyWorkspaceNotice
