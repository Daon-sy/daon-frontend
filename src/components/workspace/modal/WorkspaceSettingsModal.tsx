import React from "react"
import { Box, Chip, DialogContent, Divider, Stack } from "@mui/material"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import { getWorkspaceStore } from "store/userStore"
import Typography from "@mui/material/Typography"
import TitleModal from "components/common/TitleModal"
import WorkspaceDataManage from "components/workspace/WorkspaceDataManage"
import WorkspaceParticipantManage from "components/workspace/WorkspaceParticipantManage"
import { roles } from "_types/workspace"
import WorkspaceProfileManage from "components/workspace/WorkspaceProfileManage"

type PageType = "workspace" | "workspaceProfile" | "workspaceParticipant"

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
          <ToggleButton value="workspace">워크스페이스</ToggleButton>
          <ToggleButton value="workspaceProfile">프로필 관리</ToggleButton>
          <ToggleButton value="workspaceParticipant">
            워크스페이스 참여자
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  )
}

const Body = ({ page }: { page: PageType }) => {
  const renderPage = () => {
    switch (page) {
      case "workspace":
        return <WorkspaceDataManage />
      case "workspaceProfile":
        return <WorkspaceProfileManage />
      case "workspaceParticipant":
        return <WorkspaceParticipantManage />
      default:
        return null
    }
  }

  return <Box sx={{ paddingX: 4, paddingBottom: 10 }}>{renderPage()}</Box>
}

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceSettingsModal = ({ open = false, handleClose }: Props) => {
  const { myProfile } = getWorkspaceStore()
  const [page, setPage] = React.useState<PageType>("workspace")

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="워크스페이스 설정"
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
            <Body page={page} />
          </DialogContent>
        </Stack>
      </Box>
    </TitleModal>
  )
}

export default WorkspaceSettingsModal
