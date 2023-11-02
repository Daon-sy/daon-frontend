import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { TEST_IMAGE_URL } from "env"
import "./ShowMember.css"

interface ShowMemberProps {
  open: boolean
  handleClose: () => void
}

interface Participant {
  id: number
  nickname: string
  imgUrl: string
  email: string
  permission: "wsManager" | "pjManager" | "participants"
}

const participants: Participant[] = [
  {
    id: 1,
    nickname: "User1",
    imgUrl: `${TEST_IMAGE_URL}`,
    email: "user1@gmail.com",
    permission: "wsManager",
  },
  {
    id: 2,
    nickname: "User2",
    imgUrl: `${TEST_IMAGE_URL}`,
    email: "user2@gmail.com",
    permission: "pjManager",
  },
  {
    id: 3,
    nickname: "User3",
    imgUrl: `${TEST_IMAGE_URL}`,
    email: "user3@gmail.com",
    permission: "participants",
  },
  {
    id: 4,
    nickname: "User4",
    imgUrl: `${TEST_IMAGE_URL}`,
    email: "user4@gmail.com",
    permission: "participants",
  },
]

const style = {
  position: "absolute" as const,
  top: "68.5px",
  ml: "256px",
  width: 400,
  height: 450,
  bgcolor: "background.paper",
  p: 2,
}

const ShowMember: React.FC<ShowMemberProps> = (props: ShowMemberProps) => {
  const { open, handleClose } = props
  const [selectedPermission, setSelectedPermission] = React.useState<string[]>(
    [],
  )

  // toggle btn
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setSelectedPermission(newFormats)
  }

  const filteredParticipants =
    selectedPermission.length === 0
      ? participants
      : participants.filter(participant =>
          selectedPermission.includes(participant.permission),
        )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="구성원 보기 모달"
      >
        <Box sx={style}>
          {/* toggle Btn */}
          <ToggleButtonGroup
            value={selectedPermission}
            onChange={handleFormat}
            aria-label="text formatting"
            sx={{
              width: "400px",
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <ToggleButton value="wsManager" aria-label="워크스페이스 관리자">
              워크스페이스 관리자
            </ToggleButton>
            <ToggleButton value="pjManager" aria-label="프로젝트 관리자">
              프로젝트 관리자
            </ToggleButton>
            <ToggleButton value="participants" aria-label="참여 구성원">
              구성원
            </ToggleButton>
          </ToggleButtonGroup>

          {/* 참가자들 리스트 */}
          <ul className="list_wrapper">
            {filteredParticipants.map(participant => (
              <li key={participant.id}>
                <div className="participant_Wrapper">
                  <img
                    className="participant_img"
                    src={participant.imgUrl}
                    alt={participant.nickname}
                  />
                  <p className="participant_nick">{participant.nickname}</p>
                  <p className="participant_email">{participant.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  )
}

export default ShowMember
