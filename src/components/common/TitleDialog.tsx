import React from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface Props {
  open: boolean
  handleClose: () => void
  title?: React.ReactNode
  titleFontSize?: number
  children?: React.ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false | number
  height?: number | string
  padding?: number
  disableCloseButton?: boolean
  minWidth?: number | string
  color?: string
  right?: number
}

export const TitleDialog = ({
  open = false,
  handleClose,
  title,
  titleFontSize = 20,
  children,
  maxWidth = "md",
  height,
  padding,
  disableCloseButton = false,
  minWidth,
  color = "#000000",
  right = 8,
}: Props) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={typeof maxWidth !== "number" ? maxWidth : false}
      sx={{
        maxWidth: typeof maxWidth !== "number" ? undefined : maxWidth,
        marginX: typeof maxWidth !== "number" ? undefined : "auto",
        minWidth,
      }}
      disableEscapeKeyDown
      onKeyUp={e => e.key === "Escape" && handleClose()}
    >
      {title ? (
        <DialogTitle sx={{ px: 3, py: 1.5 }}>
          <Box display="flex" alignItems="center" pr={7}>
            <Box flexGrow={1}>
              <Typography
                variant="inherit"
                fontSize={titleFontSize}
                color={color}
                fontWeight={700}
              >
                {title || "\u00A0"}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
      ) : null}

      {disableCloseButton ? null : (
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: { right },
            top: 8,
            color: { color },
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent
        sx={{
          padding,
          height,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

interface useTitleDialogProps {
  title?: React.ReactNode
  titleFontSize?: number
  children?: React.ReactNode
  minWidth?: number | string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false | number
  height?: number
  padding?: number
  disableCloseButton?: boolean
}

/**
 * TitleDialog 사용 hook
 */
export const useTitleDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    TitleDialog: isOpen
      ? ({
          title,
          titleFontSize = 20,
          children,
          minWidth,
          maxWidth = "md",
          height,
          padding,
          disableCloseButton = false,
        }: useTitleDialogProps) => (
          <TitleDialog
            open={isOpen}
            handleClose={close}
            title={title}
            titleFontSize={titleFontSize}
            minWidth={minWidth}
            maxWidth={maxWidth}
            height={height}
            padding={padding}
            disableCloseButton={disableCloseButton}
          >
            {children}
          </TitleDialog>
        )
      : () => null,
    open,
    close,
    isOpen,
  }
}

export default TitleDialog
