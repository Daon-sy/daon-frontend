import { Box, Button, Stack } from "@mui/material"
import React from "react"
import Typography from "@mui/material/Typography"
import ImageInput from "components/image/ImageInput"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import {
  modifyWorkspaceApi,
  ModifyWorkspaceRequestBody,
  removeWorkspaceApi,
  withdrawWorkspaceApi,
  workspaceDetailApi,
} from "api/workspace"
import { getWorkspaceStore } from "store/userStore"
import EditableBox from "components/common/EditableBox"
import { useAlert } from "hooks/useAlert"
import { imageUploadApi } from "api/image"
import ConfirmDialog from "components/common/ConfirmDialog"
import { useNavigate } from "react-router-dom"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = ["WORKSPACE_ADMIN"]

const WorkspaceDataManage = () => {
  const { workspace, myProfile, setWorkspace } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [ref, changeRef] = useImageUrlInputRef()
  const navigate = useNavigate()
  const [workspaceRemoveModalOpen, setWorkspaceRemoveModalOpen] =
    React.useState(false)
  const [workspaceWithdrawModalOpen, setWorkspaceWithdrawModalOpen] =
    React.useState(false)

  if (!(workspace && myProfile)) {
    return <Box />
  }

  const { workspaceId, title, imageUrl, subject, description } = workspace

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.[0]
    if (file) {
      try {
        const { data: responseBody } = await imageUploadApi({ image: file })
        changeRef(responseBody.imageUrl)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const updateWorkspace = async (data: ModifyWorkspaceRequestBody) => {
    await modifyWorkspaceApi(workspaceId, { ...data })
    addSuccess("워크스페이스 정보 수정 완료")
    const { data: workspaceDetail } = await workspaceDetailApi(
      workspace.workspaceId,
    )
    setWorkspace(workspaceDetail)
  }

  const removeWorkspace = async () => {
    await removeWorkspaceApi(workspaceId)
    addSuccess("워크스페이스가 삭제되었습니다")
    navigate("/")
  }

  const withdrawWorkspace = async () => {
    await withdrawWorkspaceApi(workspaceId)
    addSuccess("워크스페이스를 탈퇴하였습니다")
    // 워크스페이스 메인 페이지로 이동
    navigate("/")
  }

  return (
    <Box>
      <Box>
        <Box>
          <Stack spacing={10}>
            <Box>
              <Typography variant="h6">워크스페이스 정보</Typography>
              <Box display="flex" alignItems="center">
                <ImageInput
                  width={160}
                  height={160}
                  imageUrl={imageUrl}
                  onImageChange={onImageChange}
                />
                <input
                  hidden
                  type="text"
                  name="imageUrl"
                  ref={ref}
                  onChange={e =>
                    updateWorkspace({ imageUrl: e.currentTarget.value })
                  }
                />
                <Box width="100%">
                  <Stack spacing={2}>
                    <Box>
                      <Typography
                        variant="inherit"
                        p={0.5}
                        fontSize={15}
                        fontWeight={500}
                      >
                        워크스페이스 이름
                      </Typography>
                      <EditableBox
                        autoFocus
                        enterComplete
                        text={title}
                        handleUpdate={value =>
                          value && updateWorkspace({ title: value })
                        }
                        blockEdit={!allowedEdit.includes(myProfile.role)}
                        maxTextLength={20}
                        style={{
                          borderColor: "rgba(200,200,200)",
                          borderWidth: 1,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="inherit"
                        p={0.5}
                        fontSize={15}
                        fontWeight={500}
                      >
                        워크스페이스 목적
                      </Typography>
                      <EditableBox
                        autoFocus
                        enterComplete
                        text={subject}
                        handleUpdate={value =>
                          value && updateWorkspace({ subject: value })
                        }
                        blockEdit={!allowedEdit.includes(myProfile.role)}
                        maxTextLength={10}
                        style={{
                          borderColor: "rgba(200,200,200)",
                          borderWidth: 1,
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="inherit"
                  p={0.5}
                  fontSize={15}
                  fontWeight={500}
                >
                  워크스페이스 설명
                </Typography>
                <Box>
                  <EditableBox
                    multiline
                    autoFocus
                    text={description}
                    handleUpdate={value =>
                      value && updateWorkspace({ description: value })
                    }
                    blockEdit={!allowedEdit.includes(myProfile.role)}
                    maxTextLength={100}
                    style={{
                      borderColor: "rgba(200,200,200)",
                      borderWidth: 1,
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="h5">Danger Zone</Typography>
              </Box>
              {allowedEdit.includes(myProfile.role) ? (
                <Box>
                  <Box mt={3}>
                    <Typography variant="h6">워크스페이스 삭제</Typography>
                  </Box>
                  <Box mt={1}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setWorkspaceRemoveModalOpen(true)}
                    >
                      삭제하기
                    </Button>
                  </Box>
                  <ConfirmDialog
                    open={workspaceRemoveModalOpen}
                    maxWidth="xs"
                    title="주의!!"
                    content={
                      "워크스페이스 내의 모든 정보가 삭제됩니다.\n정말로 이 워크스페이스를 삭제하시겠습니까?"
                    }
                    handleConfirm={removeWorkspace}
                    handleClose={() => {
                      setWorkspaceRemoveModalOpen(false)
                    }}
                  />
                </Box>
              ) : null}
              <Box>
                <Box mt={3}>
                  <Typography variant="h6">워크스페이스 탈퇴</Typography>
                </Box>
                <Box mt={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setWorkspaceWithdrawModalOpen(true)}
                  >
                    탈퇴하기
                  </Button>
                </Box>
                <ConfirmDialog
                  open={workspaceWithdrawModalOpen}
                  maxWidth="xs"
                  title="주의!!"
                  content="정말로 이 워크스페이스를 탈퇴하시겠습니까?"
                  handleConfirm={withdrawWorkspace}
                  handleClose={() => {
                    setWorkspaceWithdrawModalOpen(false)
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkspaceDataManage
