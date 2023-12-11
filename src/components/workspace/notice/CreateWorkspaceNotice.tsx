import React from "react"
import { Box, Button, Divider, FormHelperText, TextField } from "@mui/material"
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
    <Box
      sx={{
        border: "2px solid #dcdcdc",
        height: "90%",
        borderRadius: 1,
        paddingY: "2%",
        paddingX: "4%",
        fontSize: 14,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            fontSize: 24,
            fontWeight: 600,
            color: "#595959",
            lineHeight: "28px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordBreak: "break-word",
            WebkitBoxOrient: "vertical",
          }}
        >
          <TextField
            required
            label="제목"
            sx={{ width: "1046px" }}
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{ maxLength: 49 }}
            placeholder="공지사항 제목을 입력해주세요"
          />
          <FormHelperText
            sx={{ textAlign: "end", position: "absolute", top: 58, right: 0 }}
          >{`${title.length}/50자`}</FormHelperText>
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 2 }} />
      <Box
        sx={{
          width: "100%",
          height: "348px",
          lineHeight: "20px",
          position: "relative",
        }}
      >
        <TextField
          required
          label="내용"
          multiline
          rows={12}
          id="margin-normal"
          style={{
            width: "99%",
            whiteSpace: "pre-wrap",
            boxSizing: "content-box",
          }}
          value={content}
          onChange={e => setContent(e.target.value)}
          inputProps={{ maxLength: 499, style: { whiteSpace: "pre-wrap" } }}
          placeholder="공지사항 내용을 입력해주세요"
        />
        <FormHelperText
          sx={{ textAlign: "end", position: "absolute", right: 0 }}
        >{`${content.length}/500자`}</FormHelperText>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="green"
          sx={{
            fontSize: 16,
            cursor: "pointer",
            borderRadius: 1,
            py: 1,
            px: 8,
          }}
        >
          생성
        </Button>

        <Button
          onClick={onCancel}
          variant="outlined"
          color="green"
          sx={{
            border: "1px solid #dcdcdc",
            fontSize: 16,
            cursor: "pointer",
            borderRadius: 1,
            py: 1,
            px: 8,
          }}
        >
          취소
        </Button>
      </Box>
    </Box>
  )
}

export default CreateWorkspaceNotice
