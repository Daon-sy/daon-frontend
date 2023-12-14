import React from "react"
import { Button, Box } from "@mui/material"
import { resetPersonalWorkspaceApi } from "api/workspace"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import ConfirmDialog from "components/common/ConfirmDialog"
import WorkspaceProfileModify from "components/workspace/WorkspaceProfileModify"
import ConfirmWOrkspaceWithdrawalComponent from "../../common/confirm/withdrawal/ConfirmWorkspaceWithdrawal"
import useWithdrawWorkspace from "hooks/workspace/useWithdrawWorkspace"

interface Props {
  handleWithdraw?: () => void
}

const WorkspaceProfileManage: React.FC<Props> = ({ handleWithdraw }) => {
  const { workspace, myProfile } = getWorkspaceStore()
  const workspaceId = workspace?.workspaceId
  const { addSuccess } = useAlert()
  const [workspaceWithdrawModalOpen, setWorkspaceWithdrawModalOpen] =
    React.useState(false)
  const [resetPersonalWorkspaceModalOpen, setResetPersonalWorkspaceModalOpen] =
    React.useState(false)

  const { fetch: withdrawWorkspace } = useWithdrawWorkspace()

  if (!(workspace && myProfile)) return <Box />

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
              handleConfirm={() =>
                withdrawWorkspace(
                  { workspaceId: workspace?.workspaceId || 0 },
                  handleWithdraw,
                )
              }
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
