import React from "react"
import { getMyWorkspaceIdStore, getWorkspaceStore } from "store/userStore"
import MenuModal, { MenuWithPage } from "components/common/MenuModal"
import WorkspaceDataManage from "components/workspace/settings/WorkspaceDataManage"
import WorkspaceParticipantManage from "components/workspace/settings/WorkspaceParticipantManage"
import { Box, Button } from "@mui/material"
import ConfirmDialog from "components/common/ConfirmDialog"
import { useNavigate } from "react-router-dom"
import { removeWorkspaceApi } from "api/workspace"
import { useAlert } from "hooks/useAlert"
import WorkspaceProfileManage from "components/workspace/settings/WorkspaceProfileManage"

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceSettingsModal = ({ open = false, handleClose }: Props) => {
  const navigate = useNavigate()
  const { addSuccess } = useAlert()
  const { workspace } = getWorkspaceStore()
  const { myWorkspaceId } = getMyWorkspaceIdStore()
  const [workspaceRemoveModalOpen, setWorkspaceRemoveModalOpen] =
    React.useState(false)
  const removeWorkspace = async () => {
    if (workspace?.workspaceId) {
      removeWorkspaceApi(workspace.workspaceId)
      handleClose()
      addSuccess("워크스페이스가 삭제되었습니다")
      navigate(`/workspace/${myWorkspaceId}`)
    }
  }

  const menuWithPageList: MenuWithPage[] = [
    {
      pageName: "워크스페이스 정보",
      pageValue: "workspace",
      pageComponent: <WorkspaceDataManage />,
    },
    {
      pageName: "나의 프로필 관리",
      pageValue: "workspaceProfile",
      pageComponent: <WorkspaceProfileManage />,
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
          handleConfirm={removeWorkspace}
          handleClose={() => {
            setWorkspaceRemoveModalOpen(false)
          }}
        >
          워크스페이스 내의 모든 정보가 삭제됩니다.
          <br />
          정말로 이 워크스페이스를 삭제하시겠습니까?
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
    />
  )
}

export default WorkspaceSettingsModal
