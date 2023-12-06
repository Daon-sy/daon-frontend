import React from "react"
import { getWorkspaceStore } from "store/userStore"
import MenuModal, { MenuWithPage } from "components/common/MenuModal"
import WorkspaceDataManage from "components/workspace/WorkspaceDataManage"
import WorkspaceProfileModify from "components/workspace/WorkspaceProfileModify"
import WorkspaceParticipantManage from "components/workspace/WorkspaceParticipantManage"

interface Props {
  open: boolean
  handleClose: () => void
}

const WorkspaceSettingsModal = ({ open = false, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()

  const menuWithPageList: MenuWithPage[] = [
    {
      pageName: "워크스페이스 정보",
      pageValue: "workspace",
      pageComponent: <WorkspaceDataManage />,
    },
    {
      pageName: "나의 프로필 관리",
      pageValue: "workspaceProfile",
      pageComponent: <WorkspaceProfileModify />,
    },
  ]
  if (workspace?.division !== "PERSONAL")
    menuWithPageList.push({
      pageName: "구성원 관리",
      pageValue: "workspaceParticipant",
      pageComponent: <WorkspaceParticipantManage />,
    })

  return (
    <MenuModal
      minWidth="900px"
      open={open}
      title="워크스페이스 설정"
      handleClose={handleClose}
      menuWithPageList={menuWithPageList}
    />
  )
}

export default WorkspaceSettingsModal
