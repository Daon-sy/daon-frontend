import {
  Box,
  Button,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"
import { useAlert } from "hooks/useAlert"
import useModifyWorkspaceNotice from "hooks/workspace/useModifyWorkspaceNotice"
import React from "react"
import { ModifyWorkspaceNoticeRequestBody } from "api/workspaceNotice"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 0.5,
          position: "relative",
        }}
      >
        <Box
          component="button"
          onClick={onCancel}
          sx={{
            bgcolor: "white",
            border: "none",
            color: "#9e9e9e",
            width: 30,
            height: 30,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#e2e2e4",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ width: 24, height: 24 }} />
        </Box>
        <Box
          sx={{
            fontSize: 24,
            fontWeight: 600,
            color: "#595959",
            lineHeight: "28px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordBreak: "break-word",
            WebkitBoxOrient: "vertical",
          }}
        >
          <TextField
            required
            size="small"
            sx={{ width: "604px" }}
            value={requestBody.title}
            onChange={e =>
              setRequestBody(data => ({
                ...data,
                title: e.target.value,
              }))
            }
            inputProps={{ maxLength: 49 }}
            placeholder="빈 값 입력시, 수정 전 값이 그대로 저장됩니다 :)"
          />
          <FormHelperText
            sx={{ textAlign: "end", position: "absolute", top: 40, right: 0 }}
          >{`${(requestBody?.title || title).length + 1}/50자`}</FormHelperText>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Box sx={{ color: "#bababa" }}>{notice.createdAt}</Box>
        <Typography sx={{ color: "#1f4838", fontSize: 12 }}>
          {notice.writer?.name}
        </Typography>
      </Box>
      <Divider sx={{ mt: 0.5, mb: 1 }} />
      <Box
        sx={{
          height: 408,
          lineHeight: "20px",
          position: "relative",
        }}
      >
        <TextField
          required
          multiline
          rows={15}
          sx={{
            width: "99%",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
          value={requestBody.content}
          onChange={e =>
            setRequestBody(data => ({
              ...data,
              content: e.target.value,
            }))
          }
          inputProps={{ maxLength: 499 }}
          placeholder="빈 값 입력시, 수정 전 값이 그대로 저장됩니다 :)"
        />
        <FormHelperText
          sx={{ textAlign: "end", position: "absolute", right: 0 }}
        >{`${
          (requestBody?.content || content).length + 1
        }/500자`}</FormHelperText>
      </Box>
      <Button onClick={handleModify} sx={{ position: "relative", top: -32 }}>
        수정
      </Button>
      <Button onClick={onCancel} sx={{ position: "relative", top: -32 }}>
        취소
      </Button>
    </Box>
  )
}

export default ModifyWorkspaceNotice
