import React from "react"
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material"
import { imageUploadApi } from "api/image"
import { myEmailsApi } from "api/member"
import { WsProfileInfo } from "api/workspace"
import { MemberEmail } from "_types/member"
import useImageUrlInputRef from "hooks/useImageUrlInputRef"
import ImageInput from "components/image/ImageInput"

interface Props {
  wsProfileInfo: WsProfileInfo
  handleDataChange: (data: WsProfileInfo) => void
}

const InputWsProfileInfo: React.FC<Props> = ({
  wsProfileInfo,
  handleDataChange,
}: Props) => {
  const { name, imageUrl, email } = wsProfileInfo
  const [ref, changeRef] = useImageUrlInputRef()
  const [memberEmails, setMemberEmails] = React.useState<Array<MemberEmail>>([])

  const fetchMemberEmails = async () => {
    const { data: myEmailsResponse } = await myEmailsApi()
    setMemberEmails(myEmailsResponse.memberEmails)
  }

  React.useEffect(() => {
    fetchMemberEmails()
  }, [])

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

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h6">워크스페이스 프로필 입력</Typography>
        <Box display="flex" justifyContent="center">
          <Box>
            <ImageInput
              width={150}
              height={150}
              borderRadius={20}
              imageUrl={imageUrl}
              onImageChange={onImageChange}
            />
            <input
              hidden
              type="text"
              name="imageUrl"
              ref={ref}
              onChange={e =>
                handleDataChange({ ...wsProfileInfo, imageUrl: e.target.value })
              }
            />
          </Box>
          <Box display="flex" sx={{ width: "100%" }}>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Box>
                <TextField
                  required
                  fullWidth
                  label="프로필 이름"
                  variant="outlined"
                  value={name}
                  onChange={e =>
                    handleDataChange({ ...wsProfileInfo, name: e.target.value })
                  }
                  inputProps={{ maxLength: 20 }}
                />
                <FormHelperText
                  sx={{ textAlign: "end" }}
                >{`${name.length}/20자`}</FormHelperText>
              </Box>
              <Box>
                <FormControl
                  fullWidth
                  sx={{
                    minWidth: 80,
                  }}
                >
                  <InputLabel id="email-select-label" required>
                    이메일
                  </InputLabel>
                  <Select
                    required
                    labelId="email-select-label"
                    label="이메일"
                    autoWidth
                    value={email}
                    onChange={e =>
                      handleDataChange({
                        ...wsProfileInfo,
                        email: e.target.value,
                      })
                    }
                  >
                    {memberEmails &&
                      memberEmails.map(memberEmail => (
                        <MenuItem value={memberEmail.email}>
                          {memberEmail.email}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default InputWsProfileInfo
