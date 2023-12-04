import React from "react"
import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { getMyMemberDetailStore } from "store/userStore"
import { MemberEmail } from "_types/member"
import {
  modifyMyMemberInfoApi,
  myEmailsApi,
  myMemberDetailApi,
  removeEmailApi,
  withdrawApi,
} from "api/member"
import { useAlert } from "hooks/useAlert"
import ConfirmDialog from "components/common/ConfirmDialog"
import DeleteIcon from "@mui/icons-material/Delete"
import BadgeIcon from "@mui/icons-material/Badge"
import PersonIcon from "@mui/icons-material/Person"
import LockIcon from "@mui/icons-material/Lock"
import MailIcon from "@mui/icons-material/Mail"
import AddEmailModal from "./modal/AddEmailModal"
import MemberInfoSection from "./MemberInfoSection"
import EmailInfoSection from "./EmailInfoSection"
import WithdrawSection from "./WithdrawSection"

const MyPageDataManage: React.FC = () => {
  const { addSuccess } = useAlert()
  const { myDetail, setMyDetail } = getMyMemberDetailStore()

  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])
  const [checkPasswordModalOpen, setCheckPasswordModalOpen] =
    React.useState<boolean>(false)
  const [myInfoEditOpen, setMyInfoEditOpen] = React.useState<boolean>(false)
  const [addEmailModalOpen, setAddEmailModalOpen] =
    React.useState<boolean>(false)

  const [name, setName] = React.useState(myDetail?.name)
  const [prevPassword, setPrevPassword] = React.useState<string>("")
  const [newPassword, setNewPassword] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")

  const [selectedEmailId, setSelectedEmailId] = React.useState<number | null>(
    null,
  )
  const [removeEmailModalOpen, setRemoveEmailModalOpen] = React.useState(false)

  const [withdrawMemberModalOpen, setWithdrawMemberModalOpen] =
    React.useState<boolean>(false)

  const fetchMemberEmails = async () => {
    const { data } = await myEmailsApi()
    setMemberEmails(data.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

  const handleMyInfoEditClick = async () => {
    if (!(newPassword === confirmPassword)) {
      setConfirmPassword("")
      return
    }

    if (myInfoEditOpen === true) {
      await modifyMyMemberInfoApi({ name, prevPassword, newPassword })
      addSuccess("내 정보 수정 완료")
      const { data: updatedMyDetail } = await myMemberDetailApi()
      setMyDetail(updatedMyDetail)
      setPrevPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    setMyInfoEditOpen(!myInfoEditOpen)
  }

  const handleCancleEditClick = () => {
    setMyInfoEditOpen(!myInfoEditOpen)
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
    addSuccess("회원 탈퇴 완료")
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{ mb: 3, fontSize: 23, color: "gray", fontWeight: "bold" }}
      >
        마이페이지
      </Typography>
      <Typography
        sx={{ mb: 2, fontSize: 18, color: "#1F4838", fontWeight: "bold" }}
      >
        회원 정보
      </Typography>
      <MemberInfoSection />
      <Divider />
      {myInfoEditOpen ? (
        <Box>
          {/* 회원 정보 수정 */}
          <Box
            sx={{
              mt: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BadgeIcon sx={{ color: "#1F4838", mr: 0.5, pb: 3.7 }} />
            <Typography sx={{ mb: 3.2, pr: 4.5, color: "#1F4838" }}>
              이름
            </Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                sx={{ width: 452 }}
                size="small"
                helperText="* 이름은 20자 이내여야 합니다."
                value={name}
                onChange={e => setName(e.target.value)}
                inputProps={{ maxLength: 20 }}
              />
              {/* 길이 */}
              <Typography
                sx={{
                  fontSize: 12,
                  position: "absolute",
                  top: 40,
                  right: 0,
                }}
              >
                ({name?.length}/20)
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PersonIcon sx={{ color: "#1F4838", mr: 0.5, pb: 1 }} />
            <Typography sx={{ mb: 0.5, pr: 2.9, color: "#1F4838" }}>
              아이디
            </Typography>
            <Typography
              sx={{
                p: 1,
                pl: 1.5,
                width: 430,
                backgroundColor: "#F6F7F9",
                border: 1,
                borderRadius: 1,
                borderColor: "lightgray",
              }}
            >
              {myDetail?.username}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 4,
              height: 300,
              justifyContent: "space-between",
            }}
          >
            <LockIcon sx={{ color: "#1F4838", mr: 0.5, pb: 3.7 }} />
            <Typography sx={{ mb: 0.5, pr: 1.2, color: "#1F4838" }}>
              비밀번호
            </Typography>
            <Box sx={{ display: "flex-row" }}>
              <Box sx={{ width: 452 }}>
                <Typography
                  sx={{ mt: 0.2, mb: 0.5, color: "#1F4838", fontSize: 14 }}
                >
                  현재 비밀번호 입력
                </Typography>
                <TextField
                  size="small"
                  type="password"
                  helperText="* 비밀번호는 30자 이내여야 합니다."
                  fullWidth
                  required
                  autoComplete="password"
                  value={prevPassword}
                  onChange={e => setPrevPassword(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                />
              </Box>
              <Box mb={3}>
                <Typography
                  sx={{ mt: 1.5, mb: 0.5, color: "#1F4838", fontSize: 14 }}
                >
                  새 비밀번호 입력
                </Typography>
                <TextField
                  size="small"
                  type="password"
                  fullWidth
                  required
                  autoComplete="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                />
              </Box>
              <Box mb={3}>
                <Typography
                  sx={{ mt: 1.5, mb: 0.5, color: "#1F4838", fontSize: 14 }}
                >
                  새 비밀번호 확인
                </Typography>
                <TextField
                  size="small"
                  type="password"
                  fullWidth
                  required
                  error={newPassword !== confirmPassword}
                  helperText={
                    newPassword !== confirmPassword
                      ? "* 비밀번호가 일치하지 않습니다."
                      : undefined
                  }
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                  color={newPassword !== confirmPassword ? "error" : undefined}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                mr: 2,
                mb: 5,
                ml: 56.9,
                width: 50,
                height: 34,
                fontSize: 14,
                color: "white",
                border: 1,
                borderColor: "#1F4838",
                backgroundColor: "#1F4838",
              }}
              onClick={handleMyInfoEditClick}
            >
              수정
            </Button>
            <Button
              sx={{
                width: 50,
                height: 34,
                border: 1,
                color: "#1F4838",
                borderColor: "#1F4838",
              }}
              onClick={handleCancleEditClick}
            >
              취소
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          {/* 회원 정보 */}
          <Box
            sx={{
              mt: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BadgeIcon sx={{ color: "#1F4838", mr: 0.5 }} />
            <Typography sx={{ pr: 4.5, color: "#1F4838" }}>이름</Typography>
            <Typography
              sx={{
                p: 1,
                pl: 1.5,
                width: 430,
                border: 1,
                borderRadius: 1,
                borderColor: "lightgray",
              }}
            >
              {myDetail?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PersonIcon sx={{ color: "#1F4838", mr: 0.5 }} />
            <Typography sx={{ pr: 2.5, color: "#1F4838" }}>아이디</Typography>
            <Typography
              sx={{
                p: 1,
                pl: 1.5,
                width: 430,
                backgroundColor: "#F6F7F9",
                border: 1,
                borderRadius: 1,
                borderColor: "lightgray",
              }}
            >
              {myDetail?.username}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LockIcon sx={{ color: "#1F4838", mr: 1 }} />
            <Typography sx={{ pr: 1.2, color: "#1F4838" }}>비밀번호</Typography>
            <Button
              sx={{ height: 25, minWidth: 6, border: 1, color: "#1F4838" }}
              onClick={() => setCheckPasswordModalOpen(true)}
            >
              변경
            </Button>
            {checkPasswordModalOpen ? null : null}
          </Box>
          <Button
            sx={{
              mb: 5,
              ml: 55.6,
              width: 110,
              height: 34,
              fontSize: 14,
              color: "#1F4838",
              border: 1,
              borderColor: "#1F4838",
            }}
            onClick={handleMyInfoEditClick}
          >
            화면 정보 수정
          </Button>
        </Box>
      )}

      <Divider />
      {/* 이메일 목록 */}
      <Box mb={3}>
        <Typography
          sx={{
            mt: 3,
            mb: 2,
            fontSize: 18,
            color: "#1F4838",
            fontWeight: "bold",
          }}
        >
          이메일 정보
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MailIcon sx={{ color: "#1F4838", mr: 0.5 }} />
          <Typography sx={{ ml: 0.5, mt: 2, mb: 2, color: "#1F4838" }}>
            이메일
          </Typography>
          <Button
            sx={{
              ml: 2,
              height: 30,
              border: 1,
              color: "white",
              backgroundColor: "#FFBE00",
            }}
            onClick={() => setAddEmailModalOpen(true)}
          >
            이메일 추가
          </Button>
        </Box>
        {addEmailModalOpen ? (
          <AddEmailModal
            open={addEmailModalOpen}
            handleClose={() => setAddEmailModalOpen(false)}
            onSuccess={fetchMemberEmails}
          />
        ) : null}
        {memberEmails.map(email => (
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                mb: 0.5,
                p: 1,
                pl: 1.5,
                width: 300,
                border: 1,
                borderRadius: 1,
                borderColor: "lightgray",
              }}
            >
              {email.email}
            </Typography>
            <IconButton
              onClick={() => handleRemoveButtonClick(email.memberEmailId)}
            >
              <DeleteIcon sx={{ color: "lightgray" }} />
            </IconButton>
            <Dialog
              open={removeEmailModalOpen}
              onClose={() => setRemoveEmailModalOpen(false)}
            >
              <DialogTitle>이메일 삭제</DialogTitle>
              <DialogContent>이메일을 삭제하시겠습니까?</DialogContent>
              <DialogActions>
                <Button onClick={removeEmail}>삭제</Button>
                <Button onClick={() => setRemoveEmailModalOpen(false)}>
                  취소
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        ))}
      </Box>
      <EmailInfoSection />
      <Divider sx={{ mt: 5 }} />
      {/* 회원 탈퇴 */}
      <Box>
        <Button
          sx={{ mt: 5 }}
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
      <WithdrawSection />
    </Box>
  )
}

export default MyPageDataManage
