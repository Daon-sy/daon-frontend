import React from "react"
import { Box } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import WorkspaceNotice from "components/workspace/main/WorkspaceNotice"
import WorkspaceParticipants from "components/workspace/main/WorkspaceParticipants"
import WorkspaceDeadlineTaskWrapper from "components/workspace/main/WorkspaceDeadlineTaskWrapper"
import TaskTimelineView from "components/task/timeline/TaskTimelineView"
import {
  faPeopleGroup,
  faBullhorn,
  faFileCircleExclamation,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons"
import SectionTitleWrapper from "../../components/workspace/main/SectionTitleWrapper"

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
        <SectionTitleWrapper
          width="80%"
          color="#E25860"
          icon={faBullhorn}
          title="공지사항"
        >
          <WorkspaceNotice />
        </SectionTitleWrapper>
        <SectionTitleWrapper
          width="20%"
          maxWidth="265px"
          color="#3A4CA8"
          icon={faPeopleGroup}
          title="구성원"
          pl={4}
        >
          <WorkspaceParticipants />
        </SectionTitleWrapper>
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
        <SectionTitleWrapper
          width="80%"
          height="5%"
          color="#B96BC6"
          icon={faStopwatch}
          title="타임라인"
        >
          <TaskTimelineView params={{ my: true }} height="85%" />
        </SectionTitleWrapper>
        <SectionTitleWrapper
          width="20%"
          height="5%"
          color="#7DB249"
          icon={faFileCircleExclamation}
          title="할일 D-3"
          pl={4}
        >
          <WorkspaceDeadlineTaskWrapper />
        </SectionTitleWrapper>
      </Box>
    </Box>
  ) : null
}

export default WorkspaceMain
