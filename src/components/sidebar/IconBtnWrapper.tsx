import React from "react"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Box, Divider } from "@mui/material"
import { Groups, AddCircle, Bookmark, EmojiEmotions } from "@mui/icons-material"
import { faBullhorn, faComment } from "@fortawesome/free-solid-svg-icons"
import ParticipantsModal from "components/workspace/ParticipantsModal"
import { useCreateTaskModal } from "components/task/CreateTask"
import WorkspaceNoticeModal from "components/workspace/modal/WorkspaceNoticeModal"
import MessageBoxModal from "components/message/modal/MessageBoxModal"
import IconBtn from "./IconBtn"

const IconBtnWrapper: React.FC = () => {
  const { workspaceId } = useParams()
  const [participantsModalOpen, setParticipantsModalOpen] =
    React.useState(false)
  const [workspaceNoticeModalOpen, setWorkspaceNoticeModalOpen] =
    React.useState(false)
  const { CreateTaskModal, open: openCreateTaskModal } = useCreateTaskModal()
  const [sendMessageModalOpen, setSendMessageModalOpen] =
    React.useState<boolean>(false)

  const openMessageModal = () => setSendMessageModalOpen(true)
  const openParticipantsModal = () => setParticipantsModalOpen(true)
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
          component="button"
          text="공지사항"
          icon={faBullhorn}
          onClick={openWorkspaceNoticeModal}
        />
        <IconBtn
          component="button"
          text="쪽지"
          icon={faComment}
          onClick={openMessageModal}
        />
        <IconBtn
          component="button"
          text="구성원보기"
          icon={<Groups fontSize="large" />}
          onClick={openParticipantsModal}
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
      <ParticipantsModal
        open={participantsModalOpen}
        handleClose={() => setParticipantsModalOpen(false)}
      />
      <WorkspaceNoticeModal
        open={workspaceNoticeModalOpen}
        handleClose={() => setWorkspaceNoticeModalOpen(false)}
      />
      <CreateTaskModal />
      <MessageBoxModal
        open={sendMessageModalOpen}
        handleClose={() => setSendMessageModalOpen(false)}
        category="MessageList"
      />
    </Box>
  )
}

export default IconBtnWrapper
