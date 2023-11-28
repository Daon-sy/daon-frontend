/* eslint-disable no-nested-ternary */
import React from "react"
import { Box } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import { getWorkspaceStore } from "store/userStore"
import { WorkspaceParticipant } from "_types/workspace"
import { workspaceParticipantListApi } from "api/workspace"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faCrown,
  faLeaf,
  faFileCircleExclamation,
  faPeopleGroup,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons"

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
  }, [])

  const getColorByIndex = (index: number) => {
    const colors = ["#9bd9e5", "#f2625a", "#fedc7a", "#8dcfb0"]
    return colors[index % colors.length]
  }

  return (
    <Box
      component="section"
      sx={{
        maxWidth: "265px",
        width: "22%",
        pl: 4,
        height: "100%",
      }}
    >
      {/* title */}
      <Box
        component="h3"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "16px",
          color: "#3A4CA8",
          fontSize: "20px",
          fontWeight: "800",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            bgcolor: "#3A4CA8",
            alignItems: "center",
            justifyContent: "center",
            mr: "4px",
          }}
        >
          <FontAwesomeIcon icon={faPeopleGroup} color="#ffffff" />
        </Box>
        구성원
      </Box>
      {/* 구성원 Wrapper */}
      <Box
        component="ul"
        sx={{
          borderRadius: "15px",
          width: "100%",
          height: "200px",
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
        {workspaceParticipants.map((participant, index) => (
          <Box
            component="li"
            sx={{
              width: "100%",
              height: "40px",
              paddingY: "10px",
              paddingX: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {participant.imageUrl ? (
              <Box
                component="img"
                sx={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                  display: "block",
                }}
                src={participant.imageUrl}
              />
            ) : (
              <Box
                component="div"
                sx={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                  backgroundColor: getColorByIndex(index),
                }}
              >
                <PersonIcon
                  sx={{ fontSize: "32px", color: "#ffffff", ml: "1.5px" }}
                />
              </Box>
            )}

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
                <Box
                  component="div"
                  sx={{
                    color: "#1F4838",
                    fontWeight: "bold",
                    maxWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    wordBreak: "break-all",
                    fontSize: "14px",
                  }}
                >
                  {participant.name}
                </Box>
                {participant.role === "WORKSPACE_ADMIN" ? (
                  <Box
                    component="span"
                    sx={{
                      color: "#fdd835",
                      ml: "4px",
                    }}
                  >
                    <FontAwesomeIcon icon={faCrown} />
                  </Box>
                ) : participant.role === "PROJECT_ADMIN" ? (
                  <Box component="span" sx={{ color: "#1F4838", ml: "4px" }}>
                    <FontAwesomeIcon icon={faLeaf} />
                  </Box>
                ) : null}
              </Box>
              <Box
                component="div"
                sx={{
                  color: "#a9a9a9",
                  overflow: "hidden",
                  width: "120px",
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
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default WorkspaceParticipants
