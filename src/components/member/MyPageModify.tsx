import { Box, Button, TextField, Typography } from "@mui/material"
import { MemberEmail } from "_types/member"
import {
  addEmailApi,
  modifyMyMemberInfoApi,
  myEmailsApi,
  myMemberDetailApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import React from "react"
import { getMyMemberDetailStore } from "store/userStore"

const MyPageModify = () => {
  const { myDetail, setMyDetail } = getMyMemberDetailStore()
  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])
  const { addSuccess } = useAlert()

  const [name, setName] = React.useState(myDetail?.name)
  const [prevPassword, setPrevPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")

  const fetchMemberEmails = async () => {
    const { data } = await myEmailsApi()
    setMemberEmails(data.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

  const modifyMyMemberInfo = async () => {
    await modifyMyMemberInfoApi({
      name,
      prevPassword,
      newPassword,
    })
    addSuccess("내 정보 수정 완료")
    const { data: updatedMyDetail } = await myMemberDetailApi()
    setMyDetail(updatedMyDetail)
  }

  interface EmailProps {
    email: string
  }

  const addEmail = async (email: EmailProps) => {
    await addEmailApi(email)
    addSuccess("이메일이 추가되었습니다.")
    fetchMemberEmails()
  }

  return (
    <Box>
      <Typography>마이페이지 수정</Typography>
      <Box>
        <Typography>이름</Typography>
        <TextField value={name} onChange={e => setName(e.target.value)} />
        <Typography>* 현재 비밀번호</Typography>
        <TextField
          type="password"
          required
          value={prevPassword}
          onChange={e => setPrevPassword(e.target.value)}
        />
        <Typography>새 비밀번호</Typography>
        <TextField
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <Typography>이메일 목록</Typography>
        {memberEmails.map(email => (
          <Typography>{email.email}</Typography>
        ))}
      </Box>
      <Button>이메일 추가</Button>
      <Button variant="contained" onClick={modifyMyMemberInfo}>
        적용
      </Button>
      <Button variant="outlined">취소</Button>
    </Box>
  )
}

export default MyPageModify
