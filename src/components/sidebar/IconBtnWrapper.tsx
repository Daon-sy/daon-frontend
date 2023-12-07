import React from "react"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Box, Divider } from "@mui/material"
import {
  Groups,
  AddCircle,
  Settings,
  Bookmark,
  EmojiEmotions,
} from "@mui/icons-material"
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"
import WorkspaceSettingsModal from "components/workspace/modal/WorkspaceSettingsModal"
import ParticipantsModal from "components/common/ParticipantsModal"
import { useCreateTaskModal } from "components/task/CreateTask"
import WorkspaceNoticeModal from "components/workspace/modal/WorkspaceNoticeModal"
import IconBtn from "./IconBtn"

const IconBtnWrapper: React.FC = () => {
  const { workspaceId } = useParams()
  const [participantsModalOpen, setParticipantsModalOpen] =
    React.useState(false)
  const [workspaceManageModalOpen, setWorkspaceManageModalOpen] =
    React.useState(false)
  const [workspaceNoticeModalOpen, setWorkspaceNoticeModalOpen] =
    React.useState(false)
  const { CreateTaskModal, open: openCreateTaskModal } = useCreateTaskModal()
  const openParticipantsModal = () => setParticipantsModalOpen(true)
  const openWorkspaceManageModal = () => {
    setWorkspaceManageModalOpen(true)
  }
  const openWorkspaceNoticeModal = () => {
    setWorkspaceNoticeModalOpen(true)
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
          icon={<Settings fontSize="large" />}
          onClick={openWorkspaceManageModal}
        />
        <IconBtn
          component="button"
          text="구성원보기"
          icon={<Groups fontSize="large" />}
          onClick={openParticipantsModal}
        />
        <IconBtn
          component="button"
          text="할일추가"
          icon={<AddCircle fontSize="large" />}
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
          icon={<Bookmark fontSize="large" />}
          to={`/workspace/${workspaceId}/task/bookmark`}
        />
        <IconBtn
          component={RouterLink}
          text="나의 할일 모음"
          icon={<EmojiEmotions fontSize="large" />}
          to={`/workspace/${workspaceId}/task/my`}
        />
        <IconBtn
          component="button"
          text="공지사항"
          icon={faBullhorn}
          onClick={openWorkspaceNoticeModal}
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
      <ParticipantsModal
        open={participantsModalOpen}
        handleClose={() => setParticipantsModalOpen(false)}
      />
      <WorkspaceNoticeModal
        open={workspaceNoticeModalOpen}
        handleClose={() => setWorkspaceNoticeModalOpen(false)}
      />
      <CreateTaskModal />
    </Box>
  )
}

export default IconBtnWrapper
