import * as React from "react"
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { TEST_IMAGE_URL } from "env"
import TitleModal from "components/common/TitleModal"
import { WorkspaceParticipant } from "_types/workspace"
import { getWorkspaceStore } from "store/userStore"
import { workspaceParticipantListApi } from "api/workspace"

const ListWrapper = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
  overflowY: "auto",
  alignitems: "center",
}

const ParticipantWrapper = {
  border: "1px solid #b2d6c7",
  boxSizing: "border-box",
  width: "379px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginY: "1px",
  paddingX: "10px",
  bgcolor: "transparent",
}

const ParticipantImg = {
  borderRadius: "50%",
  width: "38px",
  height: "38px",
}

const ParticipantName = {
  display: "block",
  width: "30%",
  height: "20px",
  textAlign: "center",
  borderRight: "1px solid black",
}

const ParticipantEmail = {
  display: "block",
  width: "60%",
  textAlign: "center",
}

interface WorkspaceParticipantsModalProps {
  open: boolean
  handleClose: () => void
}

const WorkspaceParticipantsModal: React.FC<WorkspaceParticipantsModalProps> = ({
  open,
  handleClose,
}: WorkspaceParticipantsModalProps) => {
  const { workspace, myProfile } = getWorkspaceStore()
  const [workspaceParticipants, setWorkspaceParticipants] = React.useState<
    Array<WorkspaceParticipant>
  >([])
  const [selectedPermission, setSelectedPermission] = React.useState<string[]>(
    [],
  )

  const fetchWorkspaceParticipants = async () => {
    if (workspace) {
      const { data } = await workspaceParticipantListApi(workspace.workspaceId)
      setWorkspaceParticipants(data.workspaceParticipants)
    }
  }

  React.useEffect(() => {
    fetchWorkspaceParticipants()
  }, [])

  // toggle btn
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setSelectedPermission(newFormats)
  }

  const participants = workspaceParticipants.map(participant => ({
    workspaceParticipantId: participant.workspaceParticipantId,
    name: participant.name,
    email: participant.email,
    imageUrl: participant.imageUrl,
    role: participant.role,
  }))

  const filteredParticipants =
    selectedPermission.length === 0
      ? participants
      : participants.filter(participant =>
          selectedPermission.includes(participant.role),
        )

  return (
    <div>
      <TitleModal
        open={open}
        handleClose={handleClose}
        title="구성원 보기"
        aria-labelledby="구성원보기 모달"
        maxWidth="xs"
        height={450}
      >
        {/* toggle Btn */}
        <ToggleButtonGroup
          value={selectedPermission}
          onChange={handleFormat}
          aria-label="text formatting"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <ToggleButton
            value="WORKSPACE_ADMIN"
            aria-label="워크스페이스 관리자"
          >
            워크스페이스 관리자
          </ToggleButton>
          <ToggleButton value="PROJECT_ADMIN" aria-label="프로젝트 관리자">
            프로젝트 관리자
          </ToggleButton>
          <ToggleButton value="BASIC_PARTICIPANT" aria-label="참여 구성원">
            구성원
          </ToggleButton>
        </ToggleButtonGroup>

        {/* 참가자들 리스트 */}
        <Box component="ul" sx={ListWrapper}>
          {filteredParticipants.map(participant => (
            <li key={participant.workspaceParticipantId}>
              <Box
                component="div"
                sx={{
                  ...ParticipantWrapper,
                  bgcolor:
                    participant.workspaceParticipantId ===
                    myProfile?.workspaceParticipantId
                      ? "#b2d6c7"
                      : "transparent",
                }}
              >
                <Box
                  sx={ParticipantImg}
                  component="img"
                  src={participant.imageUrl || TEST_IMAGE_URL}
                  alt={participant.name}
                />
                <Box component="span" sx={ParticipantName}>
                  {participant.name}
                </Box>
                <Box component="span" sx={ParticipantEmail}>
                  {participant.email}
                </Box>
              </Box>
            </li>
          ))}
        </Box>
      </TitleModal>
    </div>
  )
}

export default WorkspaceParticipantsModal
