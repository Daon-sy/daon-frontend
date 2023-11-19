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
import EditableBox from "components/common/EditableBox"
import { useAlert } from "hooks/useAlert"
import { imageUploadApi } from "api/image"

const WorkspaceDataManage = () => {
  const { workspace, myProfile, setWorkspace } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [ref, changeRef] = useImageUrlInputRef()

  if (!workspace) {
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
          <Stack spacing={2}>
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
                      updateText={value =>
                        value && updateWorkspace({ title: value })
                      }
                      blockEdit={myProfile?.role !== "WORKSPACE_ADMIN"}
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
                      updateText={value =>
                        value && updateWorkspace({ subject: value })
                      }
                      blockEdit={myProfile?.role !== "WORKSPACE_ADMIN"}
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
                  updateText={value =>
                    value && updateWorkspace({ description: value })
                  }
                  blockEdit={myProfile?.role !== "WORKSPACE_ADMIN"}
                  maxTextLength={100}
                  style={{
                    borderColor: "rgba(200,200,200)",
                    borderWidth: 1,
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
