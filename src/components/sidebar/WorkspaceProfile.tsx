import * as React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import WorkspaceProfileModifyModal from "components/workspace/modal/WorkspaceProfileModifyModal"
import EditIcon from "@mui/icons-material/Edit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown, faLeaf } from "@fortawesome/free-solid-svg-icons"
import ColorAvatar from "components/common/ColorAvatar"
import SubIconBtn from "./SubIconBtn"

const WorkSpaceProfile: React.FC = () => {
  let icon = null
  let color = null
  const { myProfile } = getWorkspaceStore()
  const [profileModfiyModalOpen, setProfileModfiyModalOpen] =
    React.useState(false)

  const openProfileModifyModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setProfileModfiyModalOpen(true)
  }

  if (myProfile?.role === "WORKSPACE_ADMIN") {
    icon = faCrown
    color = "#fdd835"
  } else if (myProfile?.role === "PROJECT_ADMIN") {
    icon = faLeaf
    color = "#009959"
  }

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "20%",
        minHeight: "110px",
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
      {icon ? (
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 10,
            color,
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </Box>
      ) : null}
      <ColorAvatar
        id={myProfile?.workspaceParticipantId}
        src={myProfile?.imageUrl}
        sx={{ width: 65, height: 65 }}
      />
      <Box
        sx={{
          width: "55%",
          mt: "2px",
          textAlign: "left",
          color: "white",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              borderRadius: 1,
              fontSize: 20,
              fontWeight: "bold",
              display: "block",
              mt: 2,
            }}
          >
            {myProfile?.name}
          </Box>
          <SubIconBtn
            color="#808080"
            onClick={openProfileModifyModal}
            icon={<EditIcon />}
            position="relative"
            top="8px"
          />
        </Box>
        <Box
          sx={{
            borderRadius: 1,
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#b6d1c2",
            marginY: 1,
            fontSize: 12,
            lineHeight: "20px",
            fontWeight: "bold",
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
