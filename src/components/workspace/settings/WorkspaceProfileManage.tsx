import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Box } from "@mui/material"
import { resetPersonalWorkspaceApi, withdrawWorkspaceApi } from "api/workspace"
import { getMyWorkspaceIdStore, getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import ConfirmDialog from "components/common/ConfirmDialog"
import WorkspaceProfileModify from "components/workspace/WorkspaceProfileModify"
import ConfirmWOrkspaceWithdrawalComponent from "../../common/confirm/withdrawal/ConfirmWorkspaceWithdrawal"

interface Props {
  handleWithdraw?: () => void
}

const WorkspaceProfileManage: React.FC<Props> = ({ handleWithdraw }) => {
  const { workspace, myProfile } = getWorkspaceStore()
  const { myWorkspaceId } = getMyWorkspaceIdStore()
  const workspaceId = workspace?.workspaceId
  const { addSuccess } = useAlert()
  const navigate = useNavigate()
  const [workspaceWithdrawModalOpen, setWorkspaceWithdrawModalOpen] =
    React.useState(false)
  const [resetPersonalWorkspaceModalOpen, setResetPersonalWorkspaceModalOpen] =
    React.useState(false)

  if (!(workspace && myProfile)) return <Box />

  const withdrawWorkspace = async () => {
    if (workspaceId) {
      await withdrawWorkspaceApi(workspaceId)
      addSuccess("워크스페이스를 탈퇴하였습니다")
      // 개인워크스페이스로 이동
      if (handleWithdraw) handleWithdraw()
      navigate(`/workspace/${myWorkspaceId}`)
    }
  }

  const resetPersonalWorkspace = async () => {
    if (workspaceId) {
      await resetPersonalWorkspaceApi(workspaceId)
      addSuccess("초기화 완료")
    }
  }

  return (
    <Box>
      <WorkspaceProfileModify />
      {workspace.division !== "GROUP" ? (
        <Box>
          <Box mt={1} sx={{ position: "absolute", bottom: 10, right: 10 }}>
            <Button
              sx={{ color: "#c9c9c9" }}
              color="error"
              onClick={() => setResetPersonalWorkspaceModalOpen(true)}
            >
              초기화하기
            </Button>
          </Box>
          {resetPersonalWorkspaceModalOpen ? (
            <ConfirmDialog
              open={resetPersonalWorkspaceModalOpen}
              maxWidth="xs"
              handleConfirm={resetPersonalWorkspace}
              handleClose={() => {
                setResetPersonalWorkspaceModalOpen(false)
              }}
            >
              정말로 이 워크스페이스를 초기화 하시겠습니까?
            </ConfirmDialog>
          ) : null}
        </Box>
      ) : (
        <Box>
          <Box mt={1} sx={{ position: "absolute", bottom: 10, right: 10 }}>
            <Button
              sx={{ color: "#c9c9c9" }}
              onClick={() => setWorkspaceWithdrawModalOpen(true)}
            >
              워크스페이스 탈퇴
            </Button>
          </Box>
          {workspaceWithdrawModalOpen ? (
            <ConfirmDialog
              open={workspaceWithdrawModalOpen}
              maxWidth="xs"
              handleConfirm={withdrawWorkspace}
              handleClose={() => {
                setWorkspaceWithdrawModalOpen(false)
              }}
            >
              <ConfirmWOrkspaceWithdrawalComponent />
            </ConfirmDialog>
          ) : null}
        </Box>
      )}
    </Box>
  )
}

export default WorkspaceProfileManage
