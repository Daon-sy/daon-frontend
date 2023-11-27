import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { getMyMemberDetailStore } from "store/userStore"
import { MemberEmail } from "_types/member"
import { myEmailsApi } from "api/member"

const MemberDataManage = () => {
  const { myDetail } = getMyMemberDetailStore()
  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])

  const fetchMemberEmails = async () => {
    const { data } = await myEmailsApi()
    setMemberEmails(data.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

  return (
    <Box>
      <Typography>마이페이지 정보</Typography>
      <Typography>아이디: {myDetail?.username}</Typography>
      <Typography>이름: {myDetail?.name}</Typography>
      {memberEmails.map(email => (
        <Box>
          <Typography>이메일: {email.email}</Typography>
        </Box>
      ))}
      <Button size="small" color="error">
        회원 탈퇴
      </Button>
    </Box>
  )
}

export default MemberDataManage
