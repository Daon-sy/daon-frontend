/* eslint-disable no-nested-ternary */
import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import { WorkspaceParticipant } from "_types/workspace"
import { workspaceParticipantListApi } from "api/workspace"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown, faLeaf } from "@fortawesome/free-solid-svg-icons"
import ColorAvatar from "components/common/ColorAvatar"

const WorkspaceParticipants: React.FC = () => {
  const { workspace, myProfile } = getWorkspaceStore()
  const [workspaceParticipants, setWorkspaceParticipants] = React.useState<
    Array<WorkspaceParticipant>
  >([])

  const fetchWorkspaceParticipants = async () => {
    if (workspace) {
      const { data } = await workspaceParticipantListApi(workspace.workspaceId)
      setWorkspaceParticipants(data.workspaceParticipants)
    }
  }

  React.useEffect(() => {
    fetchWorkspaceParticipants()
  }, [myProfile])

  return (
    <Box
      component="ul"
      sx={{
        boxSizing: "border-box",
        p: 1,
        borderRadius: "6px",
        height: "calc(30vh - 44px)",
        bgcolor: "#ffffff",
        scrollbarWidth: "0.5em",
        WebkitScrollSnapType: "none",
        overflowX: "hidden",
        overflowY: "scroll",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#495e57",
          borderRadius: "15px",
        },
        "&::-webkit-scrollbar-button": {
          height: "16px",
        },
      }}
    >
      {/* 구성원 Item */}
      {workspaceParticipants.map(participant => (
        <Box
          component="li"
          sx={{
            width: "100%",
            height: "40px",
            paddingY: "8px",
            paddingX: "5px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ColorAvatar
            id={participant.workspaceParticipantId}
            src={participant.imageUrl}
            sx={{
              width: "36px",
              height: "36px",
            }}
          />
          <Box
            component="div"
            sx={{
              flexDirection: "column",
              textAlign: "left",
              width: "80%",
              marginLeft: "8px",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", position: "relative" }}>
              {participant.role === "WORKSPACE_ADMIN" ? (
                <Box
                  component="span"
                  sx={{
                    color: "#fdd835",
                    mr: "4px",
                  }}
                >
                  <FontAwesomeIcon icon={faCrown} />
                </Box>
              ) : participant.role === "PROJECT_ADMIN" ? (
                <Box component="span" sx={{ color: "#1F4838", mr: "4px" }}>
                  <FontAwesomeIcon icon={faLeaf} />
                </Box>
              ) : null}
              <Box
                component="div"
                sx={{
                  // width: "fit-content",
                  color: "#1F4838",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                  fontSize: "14px",
                }}
              >
                {participant.name}
              </Box>
            </Box>
            <Box
              component="div"
              sx={{
                color: "#a9a9a9",
                overflow: "hidden",
                // width: "120px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
                position: "relative",
                fontSize: "12px",
              }}
            >
              {participant.email}
            </Box>
          </Box>

          <Box
            component="button"
            sx={{
              mx: "auto",
              py: 1,
              px: 1,
              bgcolor: "transparent",
              border: "none",
              borderRadius: "50%",
              color: "#a5a5a5",
              "&:hover": {
                bgcolor: "#dcdcdc",
              },
            }}
          >
            <ArrowForwardIosIcon />
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default WorkspaceParticipants
