/* eslint-disable no-nested-ternary */
import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import wsIcon from "assets/img/ws_icon.png"
import pjIcon from "assets/img/pj_icon.png"
import ColorAvatar from "components/common/ColorAvatar"
import useFetchWorkspaceParticipants from "hooks/workspace/useFetchWorkspaceParticipants"

const WorkspaceParticipants: React.FC = () => {
  const { workspace, myProfile } = getWorkspaceStore()
  const { fetch: fetchWorkspaceParticipants, workspaceParticipants } =
    useFetchWorkspaceParticipants(workspace?.workspaceId || 0, true)

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
      {workspaceParticipants?.map(participant => (
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
            position: "relative",
            borderBottom: "1px solid #b9b9b9",
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
          {participant.role === "WORKSPACE_ADMIN" ? (
            <Box
              component="img"
              sx={{
                position: "absolute",
                width: "16px",
                height: "16px",
                zIndex: 10,
                bottom: 10,
                left: 30,
              }}
              src={wsIcon}
            />
          ) : participant.role === "PROJECT_ADMIN" ? (
            <Box
              component="img"
              sx={{
                position: "absolute",
                width: "16px",
                height: "16px",
                zIndex: 10,
                bottom: 10,
                left: 30,
              }}
              src={pjIcon}
            />
          ) : null}
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
            <Box
              component="div"
              sx={{
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

            <Box
              component="div"
              sx={{
                color: "#a9a9a9",
                overflow: "hidden",
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
