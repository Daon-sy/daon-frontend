import React from "react"
import { Box, Grid } from "@mui/material"
import {
  faNoteSticky,
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
          mb: 2,
        }}
      >
        {workspace.title}에 오신 것을 환영합니다.
      </Box>
      <Grid container spacing={2} minWidth="780px">
        {workspace.division === "GROUP" && (
          <>
            <Grid item xs={9.5}>
              <SectionTitleWrapper
                width="100%"
                minWidth="600px"
                color="#E25860"
                icon={faBullhorn}
                title="공지사항"
              >
                <WorkspaceNotice />
              </SectionTitleWrapper>
            </Grid>
            <Grid item xs={2.5}>
              <SectionTitleWrapper
                width="100%"
                color="#3A4CA8"
                icon={faPeopleGroup}
                title="구성원"
              >
                <WorkspaceParticipants />
              </SectionTitleWrapper>
            </Grid>
          </>
        )}

        <Grid item xs={9.5}>
          <SectionTitleWrapper
            width="100%"
            minWidth="600px"
            color="#B96BC6"
            icon={faStopwatch}
            title="타임라인"
          >
            <TaskTimelineView
              tasks={tasks}
              height="calc(68vh - 160px - 44px)"
            />
          </SectionTitleWrapper>
        </Grid>
        <Grid item xs={2.5}>
          <SectionTitleWrapper
            width="100%"
            color="#7DB249"
            icon={faFileCircleExclamation}
            title="할일 D-3"
          >
            <WorkspaceDeadlineTaskWrapper tasks={tasks} />
          </SectionTitleWrapper>
        </Grid>

        {workspace.division === "PERSONAL" && (
          <Grid item xs={12} sx={{ position: "relative" }}>
            <SectionTitleWrapper
              width="100%"
              color="#E25860"
              icon={faNoteSticky}
              title="메모장"
            >
              <WorkspaceNotice />
            </SectionTitleWrapper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default WorkspaceMain
