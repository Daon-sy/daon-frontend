import React from "react"
import { Box, Stack } from "@mui/material"
import {
  faPeopleGroup,
  faBullhorn,
  faFileCircleExclamation,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons"
import { getWorkspaceStore } from "store/userStore"
import WorkspaceNotice from "components/workspace/main/WorkspaceNotice"
import WorkspaceParticipants from "components/workspace/main/WorkspaceParticipants"
import WorkspaceDeadlineTaskWrapper from "components/workspace/main/WorkspaceDeadlineTaskWrapper"
import TaskTimelineView from "components/task/timeline/TaskTimelineView"
import SectionTitleWrapper from "components/workspace/main/SectionTitleWrapper"
import useFetchTaskList from "hooks/task/useFetchTaskList"

const WorkspaceMain: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { tasks, fetchTaskList } = useFetchTaskList(
    {
      workspaceId: workspace?.workspaceId || 0,
      params: { my: true },
    },
    true,
  )

  React.useLayoutEffect(() => {
    fetchTaskList()
  }, [workspace])

  if (!workspace) return null

  console.log(workspace)

  return (
    <Box
      component="div"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "calc(100vh - 100px)",
      }}
    >
      <Box
        component="h2"
        sx={{
          color: "#445a53",
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        {workspace.title}에 오신 것을 환영합니다.
      </Box>
      {workspace.division === "PERSONAL" ? null : (
        <Stack mt={2} spacing={2} direction="row" height="30vh" width="100%">
          <SectionTitleWrapper
            width="80vw"
            minWidth="912px"
            color="#E25860"
            icon={faBullhorn}
            title="공지사항"
          >
            <WorkspaceNotice />
          </SectionTitleWrapper>
          <SectionTitleWrapper
            width="20vw"
            minWidth="243px"
            color="#3A4CA8"
            icon={faPeopleGroup}
            title="구성원"
          >
            <WorkspaceParticipants />
          </SectionTitleWrapper>
        </Stack>
      )}

      <Stack
        mt={2}
        spacing={2}
        direction="row"
        height="calc(80vh - 240px)"
        width="100%"
      >
        <SectionTitleWrapper
          width="calc(80vw - 270px)"
          minWidth="912px"
          color="#B96BC6"
          icon={faStopwatch}
          title="타임라인"
        >
          <TaskTimelineView tasks={tasks} height="calc(68vh - 160px - 44px)" />
        </SectionTitleWrapper>
        <SectionTitleWrapper
          width="calc(20vw - 67.2px)"
          color="#7DB249"
          icon={faFileCircleExclamation}
          title="할일 D-3"
        >
          <WorkspaceDeadlineTaskWrapper tasks={tasks} />
        </SectionTitleWrapper>
      </Stack>
    </Box>
  )
}

export default WorkspaceMain
