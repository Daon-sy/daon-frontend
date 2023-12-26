import React from "react"
import {
  FormHelperText,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import { WorkspaceInfo } from "api/workspace"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import useImageUpload from "hooks/image/useImageUpload"
import ColorAvatar from "components/common/ColorAvatar"
import MenuBox from "components/common/MenuBox"

interface Props {
  workspaceInfo: WorkspaceInfo
  handleDataChange: (data: WorkspaceInfo) => void
}

const InputWorkspaceInfo: React.FC<Props> = ({
  workspaceInfo,
  handleDataChange,
}: Props) => {
  const { title, subject, description, imageUrl } = workspaceInfo
  const [ref, changeRef] = useImageUrlInputRef()

  const { ImageInput, selectFile } = useImageUpload()

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">워크스페이스 정보 입력</Typography>
        <Box display="flex" justifyContent="center">
          <MenuBox
            menus={[
              {
                disabled: !workspaceInfo.imageUrl,
                children: "기본이미지",
                onClick: () =>
                  handleDataChange({ ...workspaceInfo, imageUrl: "" }),
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
                icon={<InsertPhotoIcon sx={{ width: 2 / 4, height: 2 / 4 }} />}
                src={imageUrl}
                sx={{
                  width: 140,
                  height: 140,
                }}
              />
            </ImageInput>
          </MenuBox>
          <input
            hidden
            type="text"
            ref={ref}
            onChange={e =>
              handleDataChange({ ...workspaceInfo, imageUrl: e.target.value })
            }
          />
          <Box ml={3} width="100%">
            <Stack spacing={1}>
              <Box>
                <TextField
                  fullWidth
                  required
                  label="워크스페이스 이름"
                  variant="outlined"
                  value={title}
                  onChange={e =>
                    handleDataChange({
                      ...workspaceInfo,
                      title: e.target.value,
                    })
                  }
                  inputProps={{ maxLength: 20 }}
                />
                <FormHelperText
                  sx={{ textAlign: "end" }}
                >{`${title?.length}/20자`}</FormHelperText>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="워크스페이스 목적"
                  variant="outlined"
                  value={subject}
                  onChange={e =>
                    handleDataChange({
                      ...workspaceInfo,
                      subject: e.target.value,
                    })
                  }
                  inputProps={{ maxLength: 10 }}
                />
                <FormHelperText
                  sx={{ textAlign: "end" }}
                >{`${subject?.length}/10자`}</FormHelperText>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box>
          <TextField
            fullWidth
            multiline
            rows={5}
            label="워크스페이스 설명"
            variant="outlined"
            value={description}
            onChange={e =>
              handleDataChange({
                ...workspaceInfo,
                description: e.target.value,
              })
            }
            inputProps={{ maxLength: 100 }}
          />
          <FormHelperText sx={{ textAlign: "end" }}>
            {`${description?.length}/100자`}
          </FormHelperText>
        </Box>
      </Stack>
    </Box>
  )
}

export default InputWorkspaceInfo
