import { Box, Stack } from "@mui/material"
import React from "react"
import Typography from "@mui/material/Typography"
import ImageInput from "components/image/ImageInput"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import {
  modifyWorkspaceApi,
  ModifyWorkspaceRequestBody,
  workspaceDetailApi,
} from "api/workspace"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import { imageUploadApi } from "api/image"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import EditableTextBox from "components/common/EditableTextBox"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = ["WORKSPACE_ADMIN"]

const WorkspaceDataManage = () => {
  const { workspace, myProfile, setWorkspace } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [ref, changeRef] = useImageUrlInputRef()

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

  return (
    <Box>
      <Box>
        <Box>
          <Stack>
            <Box>
              <Box display="flex" alignItems="center">
                <ImageInput
                  width={200}
                  height={200}
                  borderRadius={50}
                  border="none"
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
                        pb={1}
                        fontSize={15}
                        fontWeight={700}
                        color="primary.main"
                      >
                        워크스페이스 명
                      </Typography>
                      <EditableTextBox
                        enterComplete
                        text={title}
                        handleUpdate={value =>
                          value && updateWorkspace({ title: value })
                        }
                        fontSize={14}
                        maxTextLength={20}
                        blockEdit={!allowedEdit.includes(myProfile.role)}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="inherit"
                        pb={1}
                        fontSize={15}
                        fontWeight={700}
                        color="primary.main"
                      >
                        워크스페이스 목적
                      </Typography>
                      <EditableTextBox
                        enterComplete
                        text={subject}
                        handleUpdate={value =>
                          value && updateWorkspace({ subject: value })
                        }
                        fontSize={14}
                        maxTextLength={10}
                        blockEdit={!allowedEdit.includes(myProfile.role)}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="inherit"
                  p={0.5}
                  fontSize={15}
                  fontWeight={700}
                  color="#1f4838"
                >
                  워크스페이스 설명
                </Typography>
                <Box>
                  <EditableTextBox
                    multiline
                    rows={8}
                    text={description}
                    handleUpdate={value =>
                      value && updateWorkspace({ description: value })
                    }
                    fontSize={14}
                    maxTextLength={100}
                    inputProps={{
                      style: {},
                    }}
                    blockEdit={!allowedEdit.includes(myProfile.role)}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkspaceDataManage
