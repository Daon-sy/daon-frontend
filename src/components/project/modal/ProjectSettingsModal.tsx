import React from "react"
import { Box } from "@mui/material"
import ProjectGeneralSetting from "components/project/ProjectGeneralSetting"
import ProjectParticipantsSetting from "components/project/ProjectParticipantsSetting"
import { getWorkspaceStore } from "store/userStore"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import MenuModal, { MenuWithPage } from "components/common/MenuModal"

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
      pageName: "구성원 관리",
      pageValue: "projectParticipant",
      pageComponent: (
        <ProjectParticipantsSetting
          workspaceId={workspace?.workspaceId || 0}
          projectId={projectId}
        />
      ),
    },
  ]

  if (!workspace) return <Box />

  return (
    <MenuModal
      open={open}
      title="프로젝트 설정"
      minWidth={900}
      maxWidth={1000}
      handleClose={handleClose}
      menuWithPageList={menuWithPageList}
      allowedEditRoles={allowedEdit}
    />
  )
}

export default ProjectSettingsModal
