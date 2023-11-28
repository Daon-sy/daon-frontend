import React from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material"
import {
  addEmailApi,
  modifyMyMemberInfoApi,
  myEmailsApi,
  myMemberDetailApi,
  removeEmailApi,
  withdrawApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import { getMyMemberDetailStore } from "store/userStore"
import { MemberEmail } from "_types/member"
import ConfirmDialog from "components/common/ConfirmDialog"

const MyPageModify = () => {
  const { myDetail, setMyDetail } = getMyMemberDetailStore()
  const { addSuccess } = useAlert()

  const [name, setName] = React.useState(myDetail?.name)
  const [prevPassword, setPrevPassword] = React.useState<string>("")
  const [newPassword, setNewPassword] = React.useState<string>("")

  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])
  const [newEmail, setNewEmail] = React.useState<string>("")
  const [selectedEmailId, setSelectedEmailId] = React.useState<number | null>(
    null,
  )
  const [removeEmailModalOpen, setRemoveEmailModalOpen] = React.useState(false)

  const [withdrawMemberModalOpen, setWithdrawMemberModalOpen] =
    React.useState(false)

  const modifyMyMemberInfo = async () => {
    await modifyMyMemberInfoApi({
      name,
      prevPassword,
      newPassword,
    })
    addSuccess("내 정보 수정 완료")
    const { data: updatedMyDetail } = await myMemberDetailApi()
    setMyDetail(updatedMyDetail)
    setPrevPassword("")
    setNewPassword("")
  }

  const fetchMemberEmails = async () => {
    const { data } = await myEmailsApi()
    setMemberEmails(data.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

  const addEmail = async () => {
    if (newEmail.trim() === "") {
      return
    }
    await addEmailApi({ email: newEmail })
    addSuccess("이메일이 추가되었습니다.")
    fetchMemberEmails()

    setNewEmail("")
  }

  const handleRemoveButtonClick = (emailId: number) => {
    setSelectedEmailId(emailId)
    setRemoveEmailModalOpen(true)
  }

  const removeEmail = async () => {
    if (selectedEmailId !== null) {
      await removeEmailApi(selectedEmailId)
      addSuccess("이메일이 삭제되었습니다.")
      fetchMemberEmails()

      setSelectedEmailId(null)
      setRemoveEmailModalOpen(false)
    }
  }

  const withdraw = async () => {
    await withdrawApi()
    addSuccess("회월 탈퇴 완료")
  }

  return (
    <Box>
      <Typography pt={1}>정보 수정</Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ m: 2 }}
          label="이름"
          helperText="* 이름은 20자 이내여야 합니다."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          sx={{ m: 2 }}
          type="password"
          label="현재 비밀번호"
          helperText="* 비밀번호는 30자 이내여야 합니다."
          required
          InputLabelProps={{ shrink: true }}
          value={prevPassword}
          onChange={e => setPrevPassword(e.target.value)}
          autoComplete="password"
        />
        <TextField
          sx={{ m: 2, mb: 4 }}
          type="password"
          label="새 비밀번호"
          InputLabelProps={{ shrink: true }}
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          autoComplete="password"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mr: 1, mb: 4 }}
          variant="contained"
          onClick={modifyMyMemberInfo}
        >
          적용
        </Button>
        <Button sx={{ ml: 1, mb: 4 }} variant="outlined">
          닫기
        </Button>
      </Box>
      <Divider />
      <Typography pt={3}>내 이메일 목록</Typography>
      <List>
        {memberEmails.map(email => (
          <ListItem key={email.memberEmailId}>
            <ListItemText primary={email.email} />
            <Button
              color="error"
              onClick={() => handleRemoveButtonClick(email.memberEmailId)}
            >
              삭제
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={removeEmailModalOpen}
        onClose={() => setRemoveEmailModalOpen(false)}
      >
        <DialogTitle>이메일 삭제</DialogTitle>
        <DialogContent>이메일을 삭제하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={removeEmail}>삭제</Button>
          <Button onClick={() => setRemoveEmailModalOpen(false)}>취소</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", m: 2, mb: 4 }}>
        <TextField
          label="추가할 이메일을 입력하세요."
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
        />
        <Button onClick={addEmail}>이메일 추가</Button>
      </Box>
      <Divider />
      <Button
        sx={{ mt: 4 }}
        size="small"
        color="error"
        onClick={() => setWithdrawMemberModalOpen(true)}
      >
        회원 탈퇴
      </Button>
      <ConfirmDialog
        open={withdrawMemberModalOpen}
        title="주의!!"
        content="회원 탈퇴가 진행되면 복구가 불가능합니다."
        handleConfirm={withdraw}
        handleClose={() => {
          setWithdrawMemberModalOpen(false)
        }}
      />
    </Box>
  )
}

export default MyPageModify
