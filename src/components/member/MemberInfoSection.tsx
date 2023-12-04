import React from "react"
import { getMyMemberDetailStore } from "store/userStore"
import { Box, Button, TextField, Typography } from "@mui/material"
import BadgeIcon from "@mui/icons-material/Badge"
import PersonIcon from "@mui/icons-material/Person"
import LockIcon from "@mui/icons-material/Lock"

const MemberInfoSection: React.FC = () => {
  const { myDetail, setMyDetail } = getMyMemberDetailStore()
  const [myInfoEditOpen, setMyInfoEditOpen] = React.useState<boolean>(false)

  const [name, setName] = React.useState(myDetail?.name)
  const [prevPassword, setPrevPassword] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")

  return (
    <Box>
      {myInfoEditOpen ? (
        <Box>
          <BadgeIcon />
          <Typography>이름</Typography>
          <TextField />
        </Box>
      ) : (
        <Box>
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <BadgeIcon sx={{ width: 40 }} />
            <Typography sx={{ width: 70 }}>이름</Typography>
            <Box>
              <Typography>{myDetail?.name}</Typography>
              <Typography>(길/이)</Typography>
            </Box>
          </Box>
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ width: 40 }} />
            <Typography sx={{ width: 70 }}>아이디</Typography>
            <Typography>{myDetail?.username}</Typography>
          </Box>
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <LockIcon sx={{ width: 40 }} />
            <Typography sx={{ width: 70 }}>비밀번호</Typography>
            <Button sx={{ height: 24 }}>변경</Button>
          </Box>
          <Box>
            <Button>회원 정보 수정</Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MemberInfoSection
