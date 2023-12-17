import React from "react"
import { Box, Button } from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import MenuModal, { MenuWithPage } from "components/common/MenuModal"
import WorkspaceDataManage from "components/workspace/settings/WorkspaceDataManage"
import WorkspaceParticipantManage from "components/workspace/settings/WorkspaceParticipantManage"
import ConfirmDialog from "components/common/ConfirmDialog"
import WorkspaceProfileManage from "components/workspace/settings/WorkspaceProfileManage"
import useRemoveWorkspace from "hooks/workspace/useRemoveWorkspace"
import ConfirmWorkspaceDeleteComponent from "../../common/confirm/delete/ConfirmWorkspaceDelete"

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceSettingsModal = ({ open = false, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()
  const [workspaceRemoveModalOpen, setWorkspaceRemoveModalOpen] =
    React.useState(false)
  const { fetch: removeWorkspace } = useRemoveWorkspace()

  const menuWithPageList: MenuWithPage[] = [
    {
      pageName: "워크스페이스 정보",
      pageValue: "workspace",
      pageComponent: <WorkspaceDataManage />,
    },
    {
      pageName: "나의 프로필 관리",
      pageValue: "workspaceProfile",
      pageComponent: <WorkspaceProfileManage handleWithdraw={handleClose} />,
    },
  ]
  if (workspace?.division !== "PERSONAL")
    menuWithPageList.push({
      pageName: "구성원 관리",
      pageValue: "workspaceParticipant",
      pageComponent: <WorkspaceParticipantManage />,
    })

  const removeButton =
    workspace?.division === "PERSONAL" ? null : (
      <Box>
        <Button
          sx={{ color: "#c9c9c9" }}
          onClick={() => setWorkspaceRemoveModalOpen(true)}
        >
          워크스페이스 삭제
        </Button>
        <ConfirmDialog
          open={workspaceRemoveModalOpen}
          maxWidth="xs"
          handleConfirm={() =>
            removeWorkspace(
              { workspaceId: workspace?.workspaceId || 0 },
              handleClose,
            )
          }
          handleClose={() => {
            setWorkspaceRemoveModalOpen(false)
          }}
        >
          <ConfirmWorkspaceDeleteComponent />
        </ConfirmDialog>
      </Box>
    )

  return (
    <MenuModal
      minWidth="900px"
      open={open}
      title="워크스페이스 설정"
      handleClose={handleClose}
      menuWithPageList={menuWithPageList}
      removeButton={removeButton}
      allowedEditRoles={["WORKSPACE_ADMIN"]}
    />
  )
}

export default WorkspaceSettingsModal
