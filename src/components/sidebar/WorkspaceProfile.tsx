import * as React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import WorkspaceProfileModifyModal from "components/workspace/modal/WorkspaceProfileModifyModal"
import EditIcon from "@mui/icons-material/Edit"
import ColorAvatar from "components/common/ColorAvatar"
import wsIcon from "assets/img/ws_icon.png"
import pjIcon from "assets/img/pj_icon.png"
import SubIconBtn from "./SubIconBtn"

const WorkSpaceProfile: React.FC = () => {
  let icon = null
  const { myProfile } = getWorkspaceStore()
  const [profileModfiyModalOpen, setProfileModfiyModalOpen] =
    React.useState(false)
  const [isMouseover, setIsMouseHover] = React.useState(false)

  const openProfileModifyModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setProfileModfiyModalOpen(true)
  }

  if (myProfile?.role === "WORKSPACE_ADMIN") {
    icon = wsIcon
  } else if (myProfile?.role === "PROJECT_ADMIN") {
    icon = pjIcon
  }

  return (
    <Box
      onMouseEnter={() => setIsMouseHover(true)}
      onMouseLeave={() => setIsMouseHover(false)}
      sx={{
        boxSizing: "border-box",
        paddingX: 1,
        width: "100%",
        height: "20%",
        minHeight: "80px",
        bgcolor: "#1f4838",
        position: "relative",
        border: "none",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        pl: "12px",
      }}
    >
      {isMouseover && (
        <SubIconBtn
          color="#ffbe00"
          onClick={openProfileModifyModal}
          icon={<EditIcon sx={{ width: 20, height: 20, p: 0.5 }} />}
          position="absolute"
          bottom="0"
          right="0"
        />
      )}

      <Box sx={{ position: "relative", mr: 1 }}>
        {icon ? (
          <Box
            component="img"
            sx={{
              position: "absolute",
              width: "16px",
              height: "16px",
              zIndex: 10,
              bottom: 2,
              right: 0,
            }}
            src={icon}
          />
        ) : null}
        <ColorAvatar
          id={myProfile?.workspaceParticipantId}
          src={myProfile?.imageUrl}
          sx={{ width: 52, height: 52 }}
        />
      </Box>
      <Box
        sx={{
          width: "70%",
          mt: "2px",
          textAlign: "left",
          color: "white",
          lineHeight: "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordBreak: "break-all",
            borderRadius: 1,
            fontSize: 14,
            fontWeight: "bold",
            display: "block",
          }}
        >
          {myProfile?.name}
        </Box>

        <Box
          sx={{
            borderRadius: 1,
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#b6d1c2",
            fontSize: 12,
            lineHeight: "20px",
            fontWeight: "bold",
            maxWidth: "132px",
          }}
        >
          {myProfile?.email}
        </Box>
      </Box>
      <WorkspaceProfileModifyModal
        open={profileModfiyModalOpen}
        handleClose={() => setProfileModfiyModalOpen(false)}
      />
    </Box>
  )
}

export default WorkSpaceProfile
