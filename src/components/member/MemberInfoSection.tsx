import React from "react"
import { useAlert } from "hooks/useAlert"
import { getMyMemberDetailStore } from "store/userStore"
import { Box, Button, Typography } from "@mui/material"
import BadgeIcon from "@mui/icons-material/Badge"
import PersonIcon from "@mui/icons-material/Person"
import LockIcon from "@mui/icons-material/Lock"

const MemberInfoSection: React.FC = () => {
  const { addSuccess } = useAlert()
  const { myDetail, setMyDetail } = getMyMemberDetailStore()

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BadgeIcon />
        <Typography>이름</Typography>
        <Typography>{myDetail?.name}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <PersonIcon />
        <Typography>아이디</Typography>
        <Typography>{myDetail?.username}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LockIcon />
        <Typography>비밀번호</Typography>
        <Button sx={{ height: 24 }}>변경</Button>
      </Box>
    </Box>
  )
}

export default MemberInfoSection
