import { Box, Chip, DialogContent, Divider, Stack } from "@mui/material"
import React from "react"
import ProjectGeneralSetting from "components/project/ProjectGeneralSetting"
import Typography from "@mui/material/Typography"
import ProjectParticipantsSetting from "components/project/ProjectParticipantsSetting"
import { getWorkspaceStore } from "store/userStore"
import TitleModal from "components/common/TitleModal"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import { roles } from "_types/workspace"

type PageType = "project" | "projectParticipant"

interface MenuProps {
  page: string
  setPage: (page: PageType) => void
}

const Menu = ({ page, setPage }: MenuProps) => {
  return (
    <Box height="100%">
      <Stack spacing={1} p={1}>
        <ToggleButtonGroup
          orientation="vertical"
          value={page}
          exclusive
          sx={{
            backgroundColor: "white",
          }}
          color="primary"
          onChange={(e: React.MouseEvent<HTMLElement>, newPage: PageType) =>
            newPage && setPage(newPage)
          }
        >
          <ToggleButton value="project">프로젝트</ToggleButton>
          <ToggleButton value="projectParticipant">
            프로젝트 참여자
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  )
}

const Body = ({
  workspaceId,
  projectId,
  page,
}: {
  workspaceId: number
  projectId: number
  page: PageType
}) => {
  const renderPage = () => {
    switch (page) {
      case "project":
        return (
          <ProjectGeneralSetting
            workspaceId={workspaceId}
            projectId={projectId}
          />
        )
      case "projectParticipant":
        return (
          <ProjectParticipantsSetting
            workspaceId={workspaceId}
            projectId={projectId}
          />
        )
      default:
        return null
    }
  }

  return <Box sx={{ paddingX: 4, paddingBottom: 10 }}>{renderPage()}</Box>
}

interface Props {
  projectId: number
  open: boolean
  handleClose: () => void
}

const ProjectSettingsModal = ({ projectId, open, handleClose }: Props) => {
  const { workspace, myProfile } = getWorkspaceStore()
  const [page, setPage] = React.useState<PageType>("project")

  if (!workspace) return <Box />

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="프로젝트 설정"
      subTitle={
        <Box display="flex" alignItems="center">
          <Typography fontSize={15}>사용자 : {myProfile?.name}</Typography>
          <Chip
            label={roles.find(p => p.role === myProfile?.role)?.description}
            size="small"
            sx={{
              fontSize: 12,
              marginLeft: 1,
            }}
          />
        </Box>
      }
      padding={0}
      height={600}
    >
      <Box height="100%">
        <Stack direction="row" height="100%">
          <DialogContent
            sx={{
              padding: 0,
              width: 300,
              height: "100%",
            }}
          >
            <Menu page={page} setPage={setPage} />
          </DialogContent>
          <Divider orientation="vertical" />
          <DialogContent
            sx={{
              width: "100%",
            }}
          >
            <Body
              workspaceId={workspace?.workspaceId}
              projectId={projectId}
              page={page}
            />
          </DialogContent>
        </Stack>
      </Box>
    </TitleModal>
  )
}

export default ProjectSettingsModal
