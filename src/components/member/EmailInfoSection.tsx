import React from "react"
import { MemberEmail } from "_types/member"
import { myEmailsApi, removeEmailApi } from "api/member"
import { useAlert } from "hooks/useAlert"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import MailIcon from "@mui/icons-material/Mail"
import DeleteIcon from "@mui/icons-material/Delete"
import AddEmailModal from "./modal/AddEmailModal"

const EmailInfoSection: React.FC = () => {
  const { addSuccess } = useAlert()

  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])
  const [addEmailModalOpen, setAddEmailModalOpen] =
    React.useState<boolean>(false)
  const [selectedEmailId, setSelectedEmailId] = React.useState<number | null>(
    null,
  )
  const [removeEmailModalOpen, setRemoveEmailModalOpen] = React.useState(false)

  const fetchMemberEmails = async () => {
    const { data } = await myEmailsApi()
    setMemberEmails(data.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

  const handleRemoveEmailButtonCick = (emailId: number) => {
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

  return (
    <Box sx={{ width: 584, m: 1.5, mb: 5 }}>
      <Typography sx={{ color: "#1F4838", fontWeight: "bold" }}>
        이메일 정보
      </Typography>
      <Box sx={{ mt: 2, mb: 1, display: "flex", alignItems: "center" }}>
        <MailIcon sx={{ width: "10%", color: "#1F4838" }} />
        <Typography sx={{ width: "12%", color: "#1F4838" }}>이메일</Typography>
        <Button
          sx={{
            width: "15%",
            p: 0,
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
        <Box sx={{ ml: 4, display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              width: "50%",
              m: 0.5,
              p: 1,
              border: 1,
              borderRadius: 1,
              borderColor: "lightGray",
            }}
          >
            {email.email}
          </Typography>
          <IconButton
            sx={{ color: "lightGray" }}
            onClick={() => handleRemoveEmailButtonCick(email.memberEmailId)}
          >
            <DeleteIcon />
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
  )
}

export default EmailInfoSection
