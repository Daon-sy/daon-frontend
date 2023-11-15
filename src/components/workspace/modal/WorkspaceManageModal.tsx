import React from "react"
import CustomModal from "components/common/CustomModal"
import { Box, Stack } from "@mui/material"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import WorkspaceDataManage from "components/workspace/WorkspaceDataManage"
import WorkspaceParticipantManage from "components/workspace/WorkspaceParticipantManage"

type pageType = "workspace" | "workspaceParticipant"

interface LayoutProps {
  menu: React.ReactNode
  body: React.ReactNode
}

const Layout = ({ menu, body }: LayoutProps) => {
  return (
    <Box
      sx={{
        width: 1160,
        height: 640,
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
            backgroundColor: "rgb(220, 220, 220)",
          }}
        >
          {menu}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "0.4em" },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { background: "#888" },
            "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
          }}
        >
          {body}
        </Box>
      </Stack>
    </Box>
  )
}

interface MenuProps {
  page: string
  setPage: (page: pageType) => void
}

const Menu = ({ page, setPage }: MenuProps) => {
  return (
    <Box>
      <Stack spacing={1} p={1}>
        <ToggleButtonGroup
          orientation="vertical"
          value={page}
          exclusive
          sx={{
            backgroundColor: "white",
          }}
          color="primary"
          onChange={(e: React.MouseEvent<HTMLElement>, newPage: pageType) => {
            setPage(newPage)
          }}
        >
          <ToggleButton value="workspace">워크스페이스 정보 관리</ToggleButton>
          <ToggleButton value="workspaceParticipant">
            워크스페이스 참여자 관리
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  )
}

interface BodyProps {
  page: pageType
}

const Body = ({ page }: BodyProps) => {
  const renderPage = () => {
    switch (page) {
      case "workspace":
        return <WorkspaceDataManage />
      case "workspaceParticipant":
        return <WorkspaceParticipantManage />
      default:
        return null
    }
  }

  return <Box sx={{ padding: 4 }}>{renderPage()}</Box>
}

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceManageModal: React.FC<Props> = ({
  open,
  handleClose,
}: Props) => {
  const [page, setPage] = React.useState<pageType>("workspace")

  const cleanUp = () => console.log(123)

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      cleanUp={cleanUp}
      px={0}
      py={0}
    >
      <Layout
        menu={<Menu page={page} setPage={setPage} />}
        body={<Body page={page} />}
      />
    </CustomModal>
  )
}

export default WorkspaceManageModal
