import React from "react"
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import { getMyMemberDetailStore } from "store/userStore"
import { MemberEmail } from "_types/member"
import { myEmailsApi } from "api/member"

const MyPageDataManage = () => {
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
    <Box sx={{ pt: 1 }}>
      <Box sx={{ border: 1, borderRadius: 2, mb: 2, p: 2 }}>
        <Typography variant="h6" mb={2}>
          기본 정보
        </Typography>
        <Typography>아이디🐔 {myDetail?.username}</Typography>
        <Typography>이름🐔 {myDetail?.name}</Typography>
      </Box>
      <Box sx={{ border: 1, borderRadius: 2, p: 2 }}>
        <Typography variant="h6" mb={1}>
          이메일 목록
        </Typography>
        <List>
          {memberEmails.map(email => (
            <ListItem key={email.memberEmailId}>
              <ListItemText primary={email.email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default MyPageDataManage
