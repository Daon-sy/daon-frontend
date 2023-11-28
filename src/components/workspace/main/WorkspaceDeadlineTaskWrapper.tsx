import React from "react"
import { Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const WorkspaceDeadlineTaskWrapper: React.FC = () => {
  return (
    <Box component="section" sx={{ width: "22%", height: "100%", ml: 4 }}>
      <Box
        component="h3"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "16px",
          color: "#7DB249",
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
            bgcolor: "#7DB249",
            alignItems: "center",
            justifyContent: "center",
            mr: "4px",
          }}
        >
          <FontAwesomeIcon icon={faFileCircleExclamation} color="#ffffff" />
        </Box>
        할일 D-3
      </Box>

      {/* 할일 Wrapper */}
      <Box
        component="ul"
        sx={{
          borderRadius: "15px",
          width: "100%",
          height: "80%",
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
      />
    </Box>
  )
}

export default WorkspaceDeadlineTaskWrapper
