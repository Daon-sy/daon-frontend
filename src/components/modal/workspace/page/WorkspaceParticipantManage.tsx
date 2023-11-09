import React from "react"
import { Box, Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const WorkspaceParticipantManage = () => {
  return (
    <Box>
      <Stack spacing={10}>
        <Box>
          <Typography variant="h6">워크스페이스 참여자 목록</Typography>
          {/* TODO 여기서 참여자 역할 변경, 강퇴 가능 */}
        </Box>
        <Box>
          <Typography variant="h6">워크스페이스에 초대</Typography>
          <Box
            sx={{
              display: "flex",
              paddingY: 2,
            }}
          >
            <TextField
              label="이메일"
              name="email"
              variant="outlined"
              sx={{
                width: 500,
              }}
            />
            <Button
              variant="contained"
              sx={{
                mx: 1,
              }}
            >
              초대하기
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default WorkspaceParticipantManage
