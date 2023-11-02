import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { Stack, TextField } from "@mui/material"
import Button from "@mui/material/Button"

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

const CreateProjectModal: React.FC<CreateProjectProps> = (
  props: CreateProjectProps,
) => {
  const { open, handleClose } = props

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
            <TextField required label="프로젝트 이름" variant="outlined" />
            <TextField
              multiline
              rows={5}
              label="프로젝트 설명"
              variant="outlined"
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
            <Button fullWidth size="large" variant="outlined">
              확인
            </Button>
            <Button fullWidth size="large" variant="contained">
              취소
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateProjectModal
