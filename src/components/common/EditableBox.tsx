import React from "react"
import Box from "@mui/material/Box"
import { Button, ButtonGroup } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"
import { useAlert } from "hooks/useAlert"

interface BoxStyle {
  fontSize?: number
  fontWeight?: number

  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string

  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string

  padding?: number
  paddingX?: number
  paddingY?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number

  margin?: number
  marginX?: number
  marginY?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number

  borderStyle?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  letterSpacing?: number
  lineHeight?: number
  display?: string
  alignItems?: string
}

const defaultBoxStyle: BoxStyle = {
  fontSize: 16,
  fontWeight: 500,

  // minHeight: "1.4375em",

  padding: 1,
  margin: 0,

  borderStyle: "solid",
  borderWidth: 2,
  borderRadius: 1,
  letterSpacing: 1,
  lineHeight: 1.3,
  display: "block",
}

interface TextBoxProps {
  text?: string | null
  handleEditEnable: () => void

  style?: BoxStyle
}

const TextBox = ({
  text,
  handleEditEnable,
  style = defaultBoxStyle,
}: TextBoxProps) => {
  return (
    <Box
      onClick={handleEditEnable}
      sx={{
        ...style,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        "&:hover": {
          backgroundColor: "rgb(242,242,242)",
          borderColor: "black",
        },
      }}
    >
      {text}
    </Box>
  )
}

interface MultilineTextBoxProps {
  text?: string | Array<string>
  handleEditEnable: () => void

  style?: BoxStyle
}

const MultilineTextBox = ({
  text,
  handleEditEnable,
  style = defaultBoxStyle,
}: MultilineTextBoxProps) => {
  return (
    <Box
      onClick={handleEditEnable}
      sx={{
        ...style,
        wordBreak: "break-all",
        whiteSpace: "pre-wrap",
        "&:hover": {
          backgroundColor: "rgb(242,242,242)",
          borderColor: "black",
        },
        "&:focus": {
          borderWidth: style?.borderWidth,
        },
      }}
    >
      {typeof text === "string"
        ? text
            .split("\n")
            .map(t => (
              <Box sx={{ whiteSpace: "pre-wrap" }}>
                {t === "" ? "\u00A0" : t}
              </Box>
            ))
        : text?.map(t => (
            <Box sx={{ whiteSpace: "pre-wrap" }}>{t === "" ? "\u00A0" : t}</Box>
          ))}
    </Box>
  )
}

interface EditBoxProps {
  text?: string | null
  handleTextChange?: (value?: string | null) => void
  handleEditDisable: () => void
  enterComplete?: boolean
  maxTextLength?: number | false

  style?: BoxStyle
}

const EditBox = React.forwardRef(
  (
    {
      text,
      handleTextChange,
      handleEditDisable,
      enterComplete = false,
      maxTextLength = false,
      style = defaultBoxStyle,
    }: EditBoxProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { addError } = useAlert()
    const [inputText, setInputText] = React.useState<string | null | undefined>(
      text,
    )

    const focusContentEditableTextToEnd = (element: HTMLElement) => {
      if (element.innerText.length === 0) {
        element.focus()

        return
      }

      const selection = window.getSelection()
      const newRange = document.createRange()
      newRange.selectNodeContents(element)
      newRange.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(newRange)
    }

    const handleUpdateText = (value?: string | null) => {
      if (handleTextChange) {
        handleTextChange(value || inputText)
      }
      handleEditDisable()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        handleEditDisable()
        e.stopPropagation()
      }

      const { innerText } = e.currentTarget

      if (maxTextLength) {
        if (e.key !== "Backspace" && innerText.length > maxTextLength) {
          if (inputText) e.currentTarget.innerText = inputText
          focusContentEditableTextToEnd(e.currentTarget)
          addError(`글자수 제한 ${maxTextLength}자 이내입니다.`)
          e.preventDefault()

          return
        }
      }

      setInputText(e.currentTarget.textContent)

      if (enterComplete && e.key === "Enter") {
        handleUpdateText(e.currentTarget.textContent)
      }
    }

    return (
      <>
        <Box
          contentEditable
          suppressContentEditableWarning
          ref={ref}
          onFocus={e => {
            focusContentEditableTextToEnd(e.currentTarget)
            e.target.scrollLeft = e.target.scrollWidth - e.target.clientWidth
          }}
          onBlur={handleEditDisable}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            e.key === "Enter" && e.preventDefault()
          }
          onKeyUp={handleKeyPress}
          sx={{
            ...style,
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            whiteSpace: "nowrap",
            "&:focus": {
              borderWidth: style?.borderWidth,
            },
          }}
        >
          {text}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              position: "absolute",
              marginTop: 0.5,
              bgcolor: "white",
            }}
          >
            <ButtonGroup disableElevation variant="contained">
              <Button
                disabled
                size="small"
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "white",
                    color: "black",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgb(155,185,229)",
                  },
                }}
              >
                {maxTextLength ? `${inputText?.length}/${maxTextLength}` : null}
              </Button>
              <Button
                variant="contained"
                size="small"
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                }}
                onClick={() => {
                  const contentRef =
                    ref as React.MutableRefObject<HTMLDivElement>
                  handleUpdateText(contentRef.current.textContent)
                }}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <Button variant="outlined" size="small">
                <ClearIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </>
    )
  },
)

interface MultilineEditBoxProps {
  text?: string | Array<string>
  handleTextChange?: (value?: string | null) => void
  handleEditDisable: () => void
  maxTextLength?: number | false

  style?: BoxStyle
}

const MultilineEditBox = React.forwardRef(
  (
    {
      text,
      handleTextChange,
      handleEditDisable,
      maxTextLength = false,
      style = defaultBoxStyle,
    }: MultilineEditBoxProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { addError } = useAlert()
    const bottomRef = React.useRef<HTMLElement>(null)
    const [inputedText, setInputedText] = React.useState<string | undefined>(
      Array.isArray(text) ? text.join("\n") : text,
    )

    const convertToText = (innerHTML: string) =>
      innerHTML.startsWith("<div>")
        ? innerHTML
            .replaceAll("<div>", "")
            .replaceAll("</div>", "\n")
            .replaceAll("<br>", "")
            .replaceAll("&nbsp;", " ")
        : innerHTML
            .replaceAll("<div>", "\n")
            .replaceAll("</div>", "")
            .replaceAll("<br>", "")
            .replaceAll("&nbsp;", " ")

    const focusContentEditableTextToEnd = (element: HTMLElement) => {
      if (element.innerText.length === 0) {
        element.focus({ preventScroll: true })

        return
      }

      const selection = window.getSelection()
      const newRange = document.createRange()
      newRange.selectNodeContents(element)
      newRange.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(newRange)
    }

    const handleUpdateText = (value?: string | null) => {
      if (handleTextChange) {
        handleTextChange(value?.trimEnd())
      }
      handleEditDisable()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        handleEditDisable()
        e.stopPropagation()
      }

      if (maxTextLength) {
        const convertedText = convertToText(e.currentTarget.innerHTML)
        if (e.key !== "Backspace" && convertedText.length >= maxTextLength) {
          if (inputedText) e.currentTarget.textContent = inputedText
          addError(`글자수 제한 ${maxTextLength}자 이내입니다.`)
          focusContentEditableTextToEnd(e.currentTarget)
          e.preventDefault()

          bottomRef.current?.scrollIntoView()

          return
        }

        setInputedText(convertedText)
      }
    }

    return (
      <>
        <Box
          contentEditable
          suppressContentEditableWarning
          ref={ref}
          onBlur={handleEditDisable}
          onPaste={e => {
            e.preventDefault()
            const pastedData = e.clipboardData
            const textData = pastedData.getData("text")
            const selection = window.getSelection()
            if (!selection) return
            if (selection && !selection.rangeCount) return
            selection?.deleteFromDocument()
            selection
              ?.getRangeAt(0)
              .insertNode(document.createTextNode(textData))
          }}
          onFocus={e => {
            e.currentTarget.textContent = convertToText(
              e.currentTarget.innerHTML,
            )
            focusContentEditableTextToEnd(e.currentTarget)
          }}
          onKeyUp={handleKeyPress}
          sx={{
            ...style,
            wordBreak: "break-all",
            whiteSpace: "pre-line",
          }}
        >
          {typeof text === "string"
            ? text.split("\n").map(value => <div>{value || <br />}</div>)
            : text?.map(value => <div>{value || <br />}</div>)}
        </Box>
        <Box
          ref={bottomRef}
          sx={{
            display: "flex",
            justifyContent: "end",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              position: "absolute",
              marginTop: 0.5,
            }}
          >
            <ButtonGroup disableElevation variant="contained">
              <Button
                disabled
                size="small"
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "white",
                    color: "black",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgb(155,185,229)",
                  },
                }}
              >
                {maxTextLength
                  ? `${inputedText?.length}/${maxTextLength}`
                  : null}
              </Button>
              <Button
                variant="contained"
                size="small"
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                }}
                onClick={() => {
                  const contentRef =
                    ref as React.MutableRefObject<HTMLDivElement>
                  const { innerHTML } = contentRef.current
                  handleUpdateText(convertToText(innerHTML))
                }}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleEditDisable()}
              >
                <ClearIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </>
    )
  },
)

interface EditableBoxStyle extends BoxStyle {
  backgroundColor?: {
    viewBox?: string
    editBox?: string
  }
}

interface Props {
  text?: string | Array<string> | null
  handleUpdate?: (value?: string | null) => void
  enterComplete?: boolean
  autoFocus?: boolean
  multiline?: boolean
  blockEdit?: boolean
  maxTextLength?: number | false

  style?: EditableBoxStyle
}

const EditableBox = ({
  text,
  handleUpdate,
  enterComplete = false,
  autoFocus = false,
  multiline = false,
  blockEdit = false,
  maxTextLength = false,
  style,
}: Props) => {
  const editBoxRef = React.useRef<HTMLDivElement>(null)
  const [editable, setEditable] = React.useState(false)

  const enableEdit = () => {
    if (!blockEdit) setEditable(true)
  }

  const disableEdit = () => setEditable(false)

  const focusEditBox = () => {
    if (editBoxRef && editBoxRef.current) {
      editBoxRef.current.focus({ preventScroll: true })
    }
  }

  React.useEffect(() => {
    if (autoFocus && editable) {
      focusEditBox()
    }
  }, [editable, editBoxRef])

  // return
  if (editable) {
    return multiline ? (
      <MultilineEditBox
        ref={editBoxRef}
        text={(text as string | Array<string> | undefined) || ""}
        handleTextChange={handleUpdate}
        handleEditDisable={disableEdit}
        maxTextLength={maxTextLength}
        style={{
          ...defaultBoxStyle,
          ...style,
        }}
      />
    ) : (
      <EditBox
        enterComplete={enterComplete}
        ref={editBoxRef}
        text={text as string | null | undefined}
        handleTextChange={handleUpdate}
        handleEditDisable={disableEdit}
        maxTextLength={maxTextLength}
        style={{
          ...defaultBoxStyle,
          ...style,
        }}
      />
    )
  }

  return multiline ? (
    <MultilineTextBox
      text={(text as Array<string> | undefined) || ""}
      handleEditEnable={enableEdit}
      style={{
        ...defaultBoxStyle,
        ...style,
      }}
    />
  ) : (
    <TextBox
      text={text as string | null | undefined}
      handleEditEnable={enableEdit}
      style={{
        ...defaultBoxStyle,
        ...style,
      }}
    />
  )
}

export default EditableBox
