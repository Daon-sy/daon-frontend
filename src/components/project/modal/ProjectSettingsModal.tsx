import { Box, Divider, Stack } from "@mui/material"
import CustomModal from "components/common/CustomModal"
import React from "react"
import Button from "@mui/material/Button"
import ProjectGeneralSetting from "components/project/ProjectGeneralSetting"
import Typography from "@mui/material/Typography"
import ProjectParticipantsSetting from "components/project/ProjectParticipantsSetting"
import { useAlert } from "hooks/useAlert"
import { getWorkspaceStore } from "store/userStore"

interface Props {
  projectId: number
  open: boolean
  handleClose: () => void
}

const ProjectSettingsModal = ({ projectId, open, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()
  const [page, setPage] = React.useState(1)
  const { addSuccess, addError } = useAlert()

  const renderPage = () => {
    if (!workspace) return <Box />

    if (page === 2)
      return (
        <ProjectParticipantsSetting
          workspaceId={workspace?.workspaceId}
          projectId={projectId}
          addSuccessAlert={addSuccess}
          addErrorAlert={addError}
        />
      )

    return (
      <ProjectGeneralSetting
        workspaceId={workspace?.workspaceId}
        projectId={projectId}
        addSuccessAlert={addSuccess}
        addErrorAlert={addError}
      />
    )
  }

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      width={800}
      height={600}
      fullHeight
      px={0}
      py={0}
    >
      <Stack direction="row" height="100%">
        <Box p={1} width={250}>
          <Typography variant="h5" textAlign="center" padding={2}>
            프로젝트 관리
          </Typography>
          <Divider />
          <Box mt={2}>
            <Stack spacing={1}>
              <Button
                disabled={page === 1}
                variant={page === 1 ? "contained" : "outlined"}
                onClick={() => setPage(1)}
              >
                일반
              </Button>
              <Button
                disabled={page === 2}
                variant={page === 2 ? "contained" : "outlined"}
                onClick={() => setPage(2)}
              >
                참여자 관리
              </Button>
            </Stack>
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            borderWidth: 1,
          }}
        />
        <Box
          sx={{
            paddingTop: 5,
            paddingLeft: 3,
            width: "100%",
            overflowY: "auto",
            paddingBottom: 5,
          }}
        >
          <Box pr={5}>{renderPage()}</Box>
        </Box>
      </Stack>
    </CustomModal>
  )
}

export default ProjectSettingsModal
