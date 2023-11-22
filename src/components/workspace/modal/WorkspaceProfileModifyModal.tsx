import React from "react"
import TitleModal from "components/common/TitleModal"
import WorkspaceProfileModify from "../WorkspaceProfileModify"

interface ProfileModifyModalProps {
  open: boolean
  handleClose: () => void
}

const WorkspaceProfileModifyModal: React.FC<ProfileModifyModalProps> = ({
  open,
  handleClose,
}: ProfileModifyModalProps) => {
  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="워크스페이스 프로필 수정"
      aria-labelledby="워크스페이스 프로필 수정 모달"
      maxWidth="sm"
    >
      <WorkspaceProfileModify />
    </TitleModal>
  )
}

export default WorkspaceProfileModifyModal
