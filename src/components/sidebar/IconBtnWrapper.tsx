import React from "react"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Box, Divider } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import SettingsIcon from "@mui/icons-material/Settings"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"
import { Link as RouterLink, useParams } from "react-router-dom"
// import WorkspaceParticipantsModal from "components/common/ParticipantsModal"
import WorkspaceSettingsModal from "components/workspace/modal/WorkspaceSettingsModal"
import ParticipantsModal from "components/common/ParticipantsModal"
// import WorkspaceParticipantsModal from "components/workspace/modal/WorkspaceParticipantsModal"
import { useCreateTaskModal } from "components/task/CreateTask"
import IconBtn from "./IconBtn"

const IconBtnWrapper: React.FC = () => {
  const { workspaceId } = useParams()
  const [participantsModalOpen, setParticipantsModalOpen] =
    React.useState(false)
  const [workspaceManageModalOpen, setWorkspaceManageModalOpen] =
    React.useState(false)
  const { CreateTaskModal, open: openCreateTaskModal } = useCreateTaskModal()
  const openParticipantsModal = () => setParticipantsModalOpen(true)
  const openWorkspaceManageModal = () => {
    setWorkspaceManageModalOpen(true)
  }

  return (
    <Box sx={{ width: "100%", height: "40%" }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          mt: 1,
          zIndex: 1,
          minHeight: "40px",
        }}
      >
        <IconBtn
          component="button"
          text="워크스페이스 설정"
          icon={<SettingsIcon fontSize="large" />}
          onClick={openWorkspaceManageModal}
        />
        <IconBtn
          component="button"
          text="구성원보기"
          icon={<GroupsIcon fontSize="large" />}
          onClick={openParticipantsModal}
        />
        <IconBtn
          component="button"
          text="할일추가"
          icon={<AddCircleIcon fontSize="large" />}
          onClick={openCreateTaskModal}
        />
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          mt: 1,
          zIndex: 1,
          minHeight: "40px",
        }}
      >
        <IconBtn
          component={RouterLink}
          text="북마크"
          icon={<BookmarkIcon fontSize="large" />}
          to={`/workspace/${workspaceId}/task/bookmark`}
        />
        <IconBtn
          component={RouterLink}
          text="나의 할일 모음"
          icon={<EmojiEmotionsIcon fontSize="large" />}
          to={`/workspace/${workspaceId}/task/my`}
        />
      </Box>
      <Divider
        sx={{
          border: 1,
          width: "80%",
          marginX: "auto",
          color: "#eeeeef",
          mt: 1,
        }}
      />
      {workspaceManageModalOpen ? (
        <WorkspaceSettingsModal
          open={workspaceManageModalOpen}
          handleClose={() => setWorkspaceManageModalOpen(false)}
        />
      ) : null}
      {/* <WorkspaceParticipantsModal
        open={participantsModalOpen}
        handleClose={() => setParticipantsModalOpen(false)}
      /> */}
      <ParticipantsModal
        open={participantsModalOpen}
        handleClose={() => setParticipantsModalOpen(false)}
      />
      <CreateTaskModal />
    </Box>
  )
}

export default IconBtnWrapper
