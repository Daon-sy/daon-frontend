import React from "react"
import { Link as RouterLink, useLocation, useParams } from "react-router-dom"
import { Box, Button, Divider } from "@mui/material"
import { Groups, AddCircle, Bookmark, EmojiEmotions } from "@mui/icons-material"
import { faBullhorn, faComment } from "@fortawesome/free-solid-svg-icons"
import ParticipantsModal from "components/workspace/ParticipantsModal"
import { useCreateTaskModal } from "components/task/CreateTask"
import WorkspaceNoticeModal from "components/workspace/modal/WorkspaceNoticeModal"
import MessageBoxModal from "components/message/modal/MessageBoxModal"
import { getWorkspaceStore } from "store/userStore"
import { useTitleDialog } from "components/common/TitleDialog"
import CreateWorkspace from "components/workspace/CreateWorkspace"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import IconBtn from "./IconBtn"

const IconBtnWrapper: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { workspaceId } = useParams()
  const [participantsModalOpen, setParticipantsModalOpen] =
    React.useState(false)
  const [workspaceNoticeModalOpen, setWorkspaceNoticeModalOpen] =
    React.useState(false)
  const { CreateTaskModal, open: openCreateTaskModal } = useCreateTaskModal()
  const [sendMessageModalOpen, setSendMessageModalOpen] =
    React.useState<boolean>(false)

  const {
    TitleDialog,
    open: openCreateWorkspaceDialog,
    close: closeCreateWorkspaceDialog,
  } = useTitleDialog()

  const openMessageModal = () => setSendMessageModalOpen(true)
  const openParticipantsModal = () => setParticipantsModalOpen(true)
  const openWorkspaceNoticeModal = () => {
    setWorkspaceNoticeModalOpen(true)
  }

  const { state: locState } = useLocation()
  React.useEffect(() => {
    if (locState && locState.openMessage) {
      setSendMessageModalOpen(true)
    }
  }, [locState])

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
          icon={<Bookmark fontSize="medium" />}
          to={`/workspace/${workspaceId}/task/bookmark`}
        />
        <IconBtn
          component={RouterLink}
          text="나의 할일 모음"
          icon={<EmojiEmotions fontSize="medium" />}
          to={`/workspace/${workspaceId}/task/my`}
        />

        <IconBtn
          component="button"
          text="할일추가"
          icon={<AddCircle fontSize="medium" />}
          onClick={openCreateTaskModal}
        />
      </Box>
      {workspace?.division === "PERSONAL" ? (
        <Box
          component="div"
          sx={{
            mx: 2,
            mt: 1,
            zIndex: 1,
            minHeight: "40px",
          }}
        >
          <Button
            fullWidth
            size="medium"
            variant="outlined"
            onClick={() => {
              openCreateWorkspaceDialog()
            }}
          >
            <LibraryAddIcon sx={{ mr: 1 }} />
            그룹 워크스페이스 생성
          </Button>
        </Box>
      ) : (
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
            icon={<Groups fontSize="medium" />}
            onClick={openParticipantsModal}
          />
        </Box>
      )}

      <Divider
        sx={{
          border: 2,
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
      <TitleDialog title="워크스페이스 생성" maxWidth="sm">
        <CreateWorkspace handleCancel={closeCreateWorkspaceDialog} />
      </TitleDialog>
    </Box>
  )
}

export default IconBtnWrapper
