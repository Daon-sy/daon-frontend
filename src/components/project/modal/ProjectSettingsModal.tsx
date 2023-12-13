import React from "react"
import { Box, Button } from "@mui/material"
import ProjectGeneralSetting from "components/project/ProjectGeneralSetting"
import ProjectParticipantsSetting from "components/project/ProjectParticipantsSetting"
import { getWorkspaceStore } from "store/userStore"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import MenuModal, { MenuWithPage } from "components/common/MenuModal"
import ConfirmDialog from "components/common/ConfirmDialog"
import useRemoveProject from "hooks/project/useRemoveProject"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = [
  "WORKSPACE_ADMIN",
  "PROJECT_ADMIN",
]

interface Props {
  projectId: number
  open: boolean
  handleClose: () => void
}

const ProjectSettingsModal = ({ projectId, open, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()
  const [projectRemoveModalOpen, setProjectRemoveModalOpen] =
    React.useState(false)

  const menuWithPageList: MenuWithPage[] = [
    {
      pageName: "프로젝트 정보",
      pageValue: "project",
      pageComponent: (
        <ProjectGeneralSetting
          workspaceId={workspace?.workspaceId || 0}
          projectId={projectId}
          handleClose={handleClose}
        />
      ),
    },
    {
      pageName: "참여자 관리",
      pageValue: "projectParticipant",
      pageComponent: (
        <ProjectParticipantsSetting
          workspaceId={workspace?.workspaceId || 0}
          projectId={projectId}
        />
      ),
    },
  ]

  const { fetch: removeProject } = useRemoveProject()
  const removeButton = (
    <Box>
      <Button
        sx={{ color: "#c9c9c9" }}
        onClick={() => setProjectRemoveModalOpen(true)}
      >
        프로젝트 삭제
      </Button>
      <ConfirmDialog
        open={projectRemoveModalOpen}
        maxWidth="xs"
        handleConfirm={() =>
          removeProject(
            {
              workspaceId: workspace?.workspaceId || 0,
              projectId,
            },
            handleClose,
          )
        }
        handleClose={() => setProjectRemoveModalOpen(false)}
      >
        프로젝트 내의 모든 정보가 삭제됩니다.
        <br />
        정말로 이 프로젝트를 삭제하시겠습니까?
      </ConfirmDialog>
    </Box>
  )

  if (!workspace) return <Box />

  return (
    <MenuModal
      open={open}
      title="프로젝트 설정"
      minWidth="900px"
      handleClose={handleClose}
      menuWithPageList={menuWithPageList}
      allowedEditRoles={allowedEdit}
    />
  )
}

export default ProjectSettingsModal
