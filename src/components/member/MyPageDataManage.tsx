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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography mb={0.5} color="#1F4838">
          아이디🐔
        </Typography>
        <Typography
          sx={{
            p: 1,
            pl: 1.5,
            border: 1,
            borderRadius: 1,
            borderColor: "lightgray",
          }}
        >
          {myDetail?.username}
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography mb={0.5} color="#1F4838">
          이름🐔
        </Typography>
        <Typography
          sx={{
            p: 1,
            pl: 1.5,
            border: 1,
            borderRadius: 1,
            borderColor: "lightgray",
          }}
        >
          {myDetail?.name}
        </Typography>
      </Box>
      <Box>
        <Typography mb={0.5} color="#1F4838">
          이메일 목록🐔
        </Typography>
        <List sx={{ border: 1, borderRadius: 1, borderColor: "lightgray" }}>
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
