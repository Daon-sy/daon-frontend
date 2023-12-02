import React from "react"
import Box from "@mui/material/Box"
import { Button, ButtonGroup, TextField } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"
import { styled } from "@mui/material/styles"

const StyledTextField = styled(TextField)({
  width: "100%",
})

interface Props {
  text?: string
  handleUpdate?: (value?: string) => void
  enterComplete?: boolean
  multiline?: boolean
  rows?: number
  blockEdit?: boolean
  maxTextLength?: number | false
  fontSize?: number | string
  fontWeight?: number | string
  borderStyle?: "none" | "solid"
}

const EditableTextBox = ({
  text,
  handleUpdate,
  enterComplete = false,
  multiline = false,
  rows,
  blockEdit = false,
  maxTextLength = false,
  fontSize = 14,
  fontWeight = 500,
  borderStyle = "solid",
}: Props) => {
  const [inputValue, setInputValue] = React.useState("")
  const [editable, setEditable] = React.useState(false)

  const enableEdit = () => !blockEdit && setEditable(true)
  const disableEdit = (goback = true) => {
    if (goback) setInputValue(text || "")
    setEditable(false)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation()
      disableEdit()
    }
  }

  React.useLayoutEffect(() => {
    setInputValue(text || "")
  }, [text])

  return !editable ? (
    <StyledTextField
      value={inputValue}
      size="small"
      multiline={multiline}
      rows={rows}
      inputProps={{
        readOnly: !editable,
        maxLength: maxTextLength,
        style: {
          fontSize,
          fontWeight,
          lineHeight: !multiline ? 2 : undefined,
          paddingTop: !multiline ? 4 : undefined,
          paddingBottom: !multiline ? 4 : undefined,
          paddingLeft: !multiline ? 8 : undefined,
          paddingRight: !multiline ? 8 : undefined,
        },
      }}
      onClick={enableEdit}
      sx={{
        "&:hover": { backgroundColor: "#F6F7F9", borderRadius: 1 },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderStyle,
            borderColor: "#E0E3E7",
          },
        },
      }}
    />
  ) : (
    <>
      <StyledTextField
        value={inputValue}
        size="small"
        multiline={multiline}
        rows={rows}
        inputProps={{
          maxLength: maxTextLength,
          style: {
            fontSize,
            fontWeight,
            lineHeight: !multiline ? 2 : undefined,
            paddingTop: !multiline ? 4 : undefined,
            paddingBottom: !multiline ? 4 : undefined,
            paddingLeft: !multiline ? 8 : undefined,
            paddingRight: !multiline ? 8 : undefined,
          },
        }}
        onBlur={() => disableEdit()}
        onChange={e => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (enterComplete && handleUpdate && e.key === "Enter") {
            handleUpdate(inputValue)
            disableEdit(false)
          }
        }}
      />
      <Box display="flex" justifyContent="end" position="relative" zIndex={1}>
        <Box mt={0.5} bgcolor="white" alignItems="center" position="absolute">
          <ButtonGroup
            disableElevation
            variant="contained"
            sx={{
              border: 1,
              borderColor: "primary.main",
            }}
          >
            <Button
              disabled
              size="small"
              sx={{
                "&.Mui-disabled": {
                  color: "primary.main",
                  backgroundColor: "white",
                  borderStyle: "none",
                },
              }}
            >
              {maxTextLength ? `${inputValue.length}/${maxTextLength}` : null}
            </Button>
            {/* 저장 버튼 */}
            <Button
              variant="contained"
              size="small"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
              }}
              onClick={() => {
                if (!handleUpdate) {
                  disableEdit()
                  return
                }
                handleUpdate(inputValue)
                disableEdit(false)
              }}
              sx={{ borderStyle: "none" }}
            >
              <CheckIcon fontSize="small" />
            </Button>
            {/* 닫기 버튼 */}
            <Button
              variant="outlined"
              size="small"
              sx={{ borderStyle: "none", "&:hover": { borderStyle: "none" } }}
              onClick={() => disableEdit()}
            >
              <ClearIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  )
}

export default EditableTextBox
