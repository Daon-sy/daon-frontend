import React from "react"
import { Box, Button, ButtonGroup, Input } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"

interface Props {
  text?: string
  fontSize?: number
  fontWeight?: number
  handleTextChange: (value: string | undefined) => void
  multiline?: true | false
  padding?: number
  paddingX?: number
  paddingY?: number
  enterComplete?: true | false
}

const TextFieldBox = ({
  text,
  fontSize = 16,
  fontWeight = 500,
  handleTextChange,
  multiline = false,
  padding = 1,
  paddingX,
  paddingY,
  enterComplete = false,
}: Props) => {
  const [inputText, setInputText] = React.useState<string | undefined>(text)
  const [showInputField, setShowInputField] = React.useState(false)

  React.useEffect(() => {
    setInputText(text)
  }, [text])

  React.useEffect(() => {
    setInputText(text)
  }, [showInputField])

  const commonSx = {
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 1,
    letterSpacing: 1,
    lineHeight: 1.3,
    display: "flex",
    alignItems: "center",
    fontSize,
    fontWeight,
    marginTop: 2,
    padding,
    paddingX,
    paddingY,
  }

  const handleCancel = () => {
    setShowInputField(false)
  }

  const handleUpdate = () => {
    if (inputText !== text) handleTextChange(inputText)
    handleCancel()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate()
    }
  }

  return (
    <Box pb={1}>
      {showInputField ? (
        <>
          <Input
            multiline={multiline}
            autoFocus
            fullWidth
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onBlur={handleCancel}
            disableUnderline
            sx={{
              ...commonSx,
              borderColor: "rgb(56,116,203)",
              ".MuiInput-input": {
                height: "1.4375em",
                padding: 0,
              },
            }}
            onKeyDown={enterComplete ? handleKeyPress : undefined}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <ButtonGroup
              disableElevation
              variant="contained"
              sx={{ position: "absolute", marginTop: 0.5 }}
            >
              <Button
                variant="contained"
                size="small"
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                  e.preventDefault()
                }
                onClick={handleUpdate}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <Button variant="outlined" size="small" onClick={handleCancel}>
                <ClearIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            ...commonSx,
            whiteSpace: "pre-wrap",
            borderColor: "rgba(0,0,0,0)",
            height: multiline ? undefined : "1.4375em",
            "&:hover": {
              backgroundColor: "rgb(242,242,242)",
            },
          }}
          onClick={() => {
            setShowInputField(true)
          }}
        >
          {inputText || text}
        </Box>
      )}
    </Box>
  )
}

export default TextFieldBox
