import { Box, Stack } from "@mui/material"
import React from "react"
import Typography from "@mui/material/Typography"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import {
  modifyWorkspaceApi,
  ModifyWorkspaceRequestBody,
  workspaceDetailApi,
} from "api/workspace"
import { getWorkspaceStore } from "store/userStore"
import { useAlert } from "hooks/useAlert"
import { WORKSPACE_PARTICIPANT_ROLE } from "_types/workspace"
import EditableTextBox from "components/common/EditableTextBox"
import MenuBox from "components/common/MenuBox"
import ColorAvatar from "components/common/ColorAvatar"
import useImageUpload from "hooks/image/useImageUpload"

const allowedEdit: Array<WORKSPACE_PARTICIPANT_ROLE> = ["WORKSPACE_ADMIN"]

const WorkspaceDataManage = () => {
  const { workspace, myProfile, setWorkspace } = getWorkspaceStore()
  const { addSuccess } = useAlert()
  const [ref, changeRef] = useImageUrlInputRef()

  const { ImageInput, selectFile } = useImageUpload()

  if (!(workspace && myProfile)) {
    return <Box />
  }

  const { workspaceId, title, imageUrl, subject, description } = workspace

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
                {allowedEdit.includes(myProfile.role) ? (
                  <>
                    <MenuBox
                      menus={[
                        {
                          disabled: !imageUrl,
                          children: "기본이미지",
                          onClick: () => updateWorkspace({ imageUrl: "" }),
                        },
                        {
                          children: "이미지 선택",
                          onClick: () =>
                            selectFile({
                              autoFetch: true,
                              fetchCallback: changeRef,
                            }),
                        },
                      ]}
                    >
                      <ImageInput>
                        <ColorAvatar
                          id={workspaceId}
                          src={imageUrl}
                          sx={{
                            width: 120,
                            height: 120,
                            fontSize: 80,
                          }}
                          name={title}
                        />
                      </ImageInput>
                    </MenuBox>
                    <input
                      hidden
                      type="text"
                      name="imageUrl"
                      ref={ref}
                      onChange={e => {
                        updateWorkspace({ imageUrl: e.currentTarget.value })
                      }}
                    />
                  </>
                ) : (
                  <ColorAvatar
                    id={workspaceId}
                    src={imageUrl}
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: 80,
                    }}
                    name={title}
                  />
                )}
                <Box ml={3} width="100%">
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
