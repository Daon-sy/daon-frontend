import * as React from "react"
import { Box } from "@mui/material"
import { TEST_IMAGE_URL } from "env"
import { getWorkspaceStore } from "store/userStore"
import SettingsIcon from "@mui/icons-material/Settings"
import WorkspaceSettingsModal from "components/workspace/modal/WorkspaceSettingsModal"
import WorkspaceProfileModifyModal from "components/workspace/modal/WorkspaceProfileModifyModal"
import EditIcon from "@mui/icons-material/Edit"
import SubIconBtn from "./SubIconBtn"

const WorkSpaceProfile: React.FC = () => {
  const { workspace, myProfile } = getWorkspaceStore()

  const [workspaceManageModalOpen, setWorkspaceManageModalOpen] =
    React.useState(false)
  const [profileModfiyModalOpen, setProfileModfiyModalOpen] =
    React.useState(false)

  const openWorkspaceManageModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setWorkspaceManageModalOpen(true)
  }
  const openProfileModifyModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setProfileModfiyModalOpen(true)
  }
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "75%",
        minHeight: "230px",
        bgcolor: "#82b89b",
        position: "relative",
        border: "none",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        component="div"
        sx={{
          borderRadius: 1,
          width: "100%",
          fontSize: 20,
          textAlign: "center",
          color: "#476354",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            maxWidth: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {workspace?.title}
        </Box>
        <SubIconBtn
          color="#808080"
          onClick={openWorkspaceManageModal}
          icon={<SettingsIcon />}
        />
      </Box>
      <Box
        component="div"
        sx={{
          width: "130px",
          height: "130px",
          background: "linear-gradient( #ffffff, #faa788)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Box
          component="img"
          src={myProfile?.imageUrl || TEST_IMAGE_URL}
          sx={{
            objectFit: "cover",
            width: "110px",
            height: "110px",
            borderRadius: 50,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "2px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            width: "100%",
            fontSize: 20,
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {myProfile?.name}
          <SubIconBtn
            color="#808080"
            onClick={openProfileModifyModal}
            icon={<EditIcon />}
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
            fontSize: 18,
            lineHeight: "20px",
            fontWeight: "bold",
          }}
        >
          {myProfile?.email}
        </Box>
      </Box>
      <WorkspaceSettingsModal
        open={workspaceManageModalOpen}
        handleClose={() => setWorkspaceManageModalOpen(false)}
      />
      <WorkspaceProfileModifyModal
        open={profileModfiyModalOpen}
        handleClose={() => setProfileModfiyModalOpen(false)}
      />
    </Box>
  )
}

export default WorkSpaceProfile
