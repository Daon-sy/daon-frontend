import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceNoticesStore, getWorkspaceStore } from "store/userStore"
import MainEmpty from "components/common/MainEmpty"
import { faBullhorn, faNoteSticky } from "@fortawesome/free-solid-svg-icons"
import NoticeCard from "./NoticeCard"
import WorkspaceNoticeModal from "../modal/WorkspaceNoticeModal"

const WorkspaceNotice: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { workspaceNotices } = getWorkspaceNoticesStore()
  const [modalOpenMap, setModalOpenMap] = React.useState(
    new Map<number, boolean>(),
  )

  const openWorkspaceNoticeModal = (noticeId: number) => {
    setModalOpenMap(prevMap => new Map(prevMap.set(noticeId, true)))
  }

  const closeWorkspaceNoticeModal = (noticeId: number) => {
    setModalOpenMap(prevMap => new Map(prevMap.set(noticeId, false)))
  }
  return (
    <Box
      component="ul"
      sx={{
        boxSizing: "border-box",
        paddingX: "1vw",
        height: "calc(30vh - 44px)",
        borderRadius: "6px",
        width: "100%",
        bgcolor: "#ffffff",
        display: "flex",
        alignItems: "center",
        WebkitScrollSnapType: "none",
        overflowX: "scroll",
        overflowY: "hidden",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#495e57",
          borderRadius: "15px",
        },
        "&::-webkit-scrollbar-button": {
          width: "0px",
        },
      }}
    >
      {workspace?.division === "GROUP"
        ? workspaceNotices.length === 0 && (
            <Box
              component="li"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainEmpty
                icon={faBullhorn}
                content="입력된 공지사항이 없어요"
                bgcolor="rgba(226,88,96,0.6)"
              />
            </Box>
          )
        : workspaceNotices.length === 0 && (
            <Box
              component="li"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainEmpty
                icon={faNoteSticky}
                content="입력된 메모장 없어요"
                bgcolor="rgba(226,88,96,0.6)"
              />
            </Box>
          )}

      {workspaceNotices.map(workspaceNotice => (
        <NoticeCard
          key={workspaceNotice.noticeId}
          title={workspaceNotice.title}
          content={workspaceNotice.content}
          name={workspaceNotice.writer.name}
          createdAt={workspaceNotice.createdAt}
          onClick={() => openWorkspaceNoticeModal(workspaceNotice.noticeId)}
        />
      ))}
      {Array.from(modalOpenMap.entries()).map(
        ([noticeId, isOpen]) =>
          isOpen && (
            <WorkspaceNoticeModal
              key={noticeId}
              open={isOpen}
              handleClose={() => closeWorkspaceNoticeModal(noticeId)}
              mainNoticeId={noticeId}
            />
          ),
      )}
    </Box>
  )
}

export default WorkspaceNotice
