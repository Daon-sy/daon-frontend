import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import WorkspaceNotice from "components/workspace/main/WorkspaceNotice"
import WorkspaceParticipants from "components/workspace/main/WorkspaceParticipants"
import WorkspaceDeadlineTaskWrapper from "components/workspace/main/WorkspaceDeadlineTaskWrapper"
import TaskTimelineView from "components/task/timeline/TaskTimelineView"

const WorkspaceMain: React.FC = () => {
  const { workspace } = getWorkspaceStore()

  return workspace ? (
    <Box
      component="div"
      sx={{
        width: "100%",
        minHeight: "600px",
        height: "85%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        component="h2"
        sx={{
          color: "#445a53",
          fontSize: "24px",
          fontWeight: "800",
        }}
      >
        {workspace.title}에 오신 것을 환영합니다.
      </Box>

      <Box
        component="div"
        sx={{
          height: "30%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "265px",
          mt: 2,
        }}
      >
        <WorkspaceNotice />
        <WorkspaceParticipants />
      </Box>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <TaskTimelineView params={{ my: true }} height="100%" />
        <WorkspaceDeadlineTaskWrapper />
      </Box>
    </Box>
  ) : null
}

export default WorkspaceMain
