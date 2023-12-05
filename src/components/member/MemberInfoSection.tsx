import React from "react"
import { getMyMemberDetailStore } from "store/userStore"
import { Box, Button, TextField, Typography } from "@mui/material"
import BadgeIcon from "@mui/icons-material/Badge"
import PersonIcon from "@mui/icons-material/Person"
import LockIcon from "@mui/icons-material/Lock"
import { myMemberDetailApi } from "api/member"
import CheckPasswordModal from "./modal/CheckPasswordModal"

interface PasswordModalInfo {
  name: string | undefined
  newPassword: string
}

const MemberInfoSection: React.FC = () => {
  const { myDetail, setMyDetail } = getMyMemberDetailStore()
  const [editMyInfoOpen, setEditMyInfoOpen] = React.useState<boolean>(false)
  const [editPasswordOpen, setEditPasswordOpen] = React.useState<boolean>(false)
  const [checkPasswordModalOpen, setCheckPasswordModalOpen] =
    React.useState<boolean>(false)
  const [checkPasswordModalInfo, setCheckPasswordModalInfo] =
    React.useState<PasswordModalInfo>({
      name: "",
      newPassword: "",
    })

  const [name, setName] = React.useState(myDetail?.name)
  const [newPassword, setNewPassword] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")

  const fetchMyMemberDetail = async () => {
    const { data } = await myMemberDetailApi()
    setMyDetail(data)
  }

  React.useEffect(() => {
    fetchMyMemberDetail()
  }, [])

  const handleEditMyInfoClick = async () => {
    setEditPasswordOpen(false)
    setEditMyInfoOpen(!editMyInfoOpen)
  }

  const handleCancleEditClick = () => {
    fetchMyMemberDetail()
    setName(name)
    setNewPassword("")
    setConfirmPassword("")
    setEditMyInfoOpen(false)
  }

  const handleEditPasswordClick = () => {
    setEditPasswordOpen(true)
  }

  const handleCheckPasswordClick = () => {
    if (newPassword === confirmPassword) {
      setCheckPasswordModalInfo({
        name,
        newPassword,
      })
      setCheckPasswordModalOpen(true)
    }
  }

  const handleCancleEditPasswordClick = () => {
    setNewPassword("")
    setConfirmPassword("")
    setEditPasswordOpen(false)
  }

  return (
    <Box sx={{ width: 584, m: 1.5 }}>
      <Typography sx={{ color: "#1F4838", fontWeight: "bold" }}>
        회원 정보
      </Typography>
      {editMyInfoOpen ? (
        <Box>
          {/* 회원 정보 수정 */}
          <Box
            sx={{
              my: 2,
              height: 50,
              display: "flex",
              alignItems: "center",
            }}
          >
            <BadgeIcon sx={{ width: "10%", color: "#1F4838" }} />
            <Typography sx={{ width: "12%", color: "#1F4838" }}>
              이름
            </Typography>
            <Box sx={{ position: "relative", width: "78%" }}>
              <TextField
                size="small"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                inputProps={{ maxLength: 20 }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  right: 0,
                  fontSize: 12,
                  color: "gray",
                }}
              >
                ({name?.length}/20)
              </Typography>
            </Box>
          </Box>
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ width: "10%", color: "#1F4838" }} />
            <Typography sx={{ width: "12%", color: "#1F4838" }}>
              아이디
            </Typography>
            <TextField
              sx={{ width: "78%", backgroundColor: "#F6F7F9" }}
              size="small"
              fullWidth
              value={myDetail?.username}
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
            }}
          >
            <LockIcon sx={{ mt: "13px", width: "10%", color: "#1F4838" }} />
            <Typography sx={{ mt: "13px", width: "12%", color: "#1F4838" }}>
              비밀번호
            </Typography>
            {editPasswordOpen ? (
              <Box sx={{ position: "relative", mt: "13px", width: "78%" }}>
                <Button sx={{ p: 0 }} onClick={handleCancleEditPasswordClick}>
                  취소
                </Button>
                <Typography sx={{ mt: 2, fontSize: 14, color: "#1F4838" }}>
                  새 비밀번호 입력
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    right: 0,
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  ({newPassword?.length}/30)
                </Typography>
                <Typography sx={{ mt: 2, fontSize: 14, color: "#1F4838" }}>
                  새 비밀번호 확인
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  error={newPassword !== confirmPassword}
                  helperText={
                    newPassword !== confirmPassword
                      ? "* 비밀번호가 일치하지 않습니다."
                      : undefined
                  }
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    right: 0,
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  ({confirmPassword?.length}/30)
                </Typography>
              </Box>
            ) : (
              <Button
                sx={{
                  display: "flex",
                  alignItems: "start",
                  height: "24.5px",
                  mt: "13px",
                  p: 0,
                }}
                onClick={handleEditPasswordClick}
              >
                재설정
              </Button>
            )}
          </Box>
          <Box
            sx={{
              mt: 5,
              mb: 5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                height: 30,
                borderRadius: 1,
                color: "white",
                backgroundColor: "#1F4838",
                ":hover": {
                  backgroundColor: "#FFBE00",
                },
              }}
              onClick={handleCheckPasswordClick}
            >
              수정
            </Button>
            <Button
              sx={{
                height: 30,
                ml: 1.5,
                border: 1,
                borderRadius: 1,
                color: "#1F4838",
              }}
              onClick={handleCancleEditClick}
            >
              취소
            </Button>
          </Box>
          {checkPasswordModalOpen ? (
            <CheckPasswordModal
              open={checkPasswordModalOpen}
              handleClose={() => setCheckPasswordModalOpen(false)}
              onSuccess={handleCancleEditClick}
              modalInfo={checkPasswordModalInfo}
            />
          ) : null}
        </Box>
      ) : (
        <Box>
          {/* 회원 정보 */}
          <Box
            sx={{ my: 2, height: 50, display: "flex", alignItems: "center" }}
          >
            <BadgeIcon sx={{ width: "10%", color: "#1F4838" }} />
            <Typography sx={{ width: "12%" }}>이름</Typography>
            <TextField
              sx={{ width: "78%", backgroundColor: "#F6F7F9" }}
              size="small"
              fullWidth
              value={myDetail?.name}
              InputProps={{ readOnly: true }}
            />
          </Box>
          <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ width: "10%", color: "#1F4838" }} />
            <Typography sx={{ width: "12%" }}>아이디</Typography>
            <TextField
              sx={{ width: "78%", backgroundColor: "#F6F7F9" }}
              size="small"
              fullWidth
              value={myDetail?.username}
              InputProps={{ readOnly: true }}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              mb: 5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                height: 30,
                border: 1,
                borderRadius: 1,
                color: "#1F4838",
              }}
              onClick={handleEditMyInfoClick}
            >
              회원 정보 수정
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MemberInfoSection
