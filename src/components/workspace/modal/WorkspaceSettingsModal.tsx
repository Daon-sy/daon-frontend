import React from "react"
import { Box, Chip, Typography } from "@mui/material"
import { roles } from "_types/workspace"
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
  const { workspace, myProfile } = getWorkspaceStore()

  const menuWithPageList: MenuWithPage[] = [
    {
      pageName: "워크스페이스",
      pageValue: "workspace",
      pageComponent: <WorkspaceDataManage />,
    },
    {
      pageName: "프로필 관리",
      pageValue: "workspaceProfile",
      pageComponent: <WorkspaceProfileModify />,
    },
  ]
  if (workspace?.division !== "PERSONAL")
    menuWithPageList.push({
      pageName: "워크스페이스 참여자",
      pageValue: "workspaceParticipant",
      pageComponent: <WorkspaceParticipantManage />,
    })

  return (
    <MenuModal
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
      menuWithPageList={menuWithPageList}
    />
  )
}

export default WorkspaceSettingsModal
