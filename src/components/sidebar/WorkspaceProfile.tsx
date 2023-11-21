import * as React from "react"
import { Box } from "@mui/material"
import { TEST_IMAGE_URL } from "env"
import { getWorkspaceStore } from "store/userStore"

const WorkSpaceProfile: React.FC = () => {
  const { workspace, myProfile } = getWorkspaceStore()
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "75%",
        minHeight: "230px",
        bgcolor: "#82b89b",
        position: "relatvie",
        cursor: " pointer",
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
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: 20,
          textAlign: "center",
          color: "#476354",
          fontWeight: "bold",
        }}
      >
        {workspace?.title}
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
            marginY: 1,
            fontSize: 18,
            lineHeight: "20px",
            fontWeight: "bold",
          }}
        >
          {myProfile?.email}
        </Box>
      </Box>
    </Box>
  )
}

export default WorkSpaceProfile
