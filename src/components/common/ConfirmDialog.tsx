import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material"

interface Props {
  open: boolean
  children?: React.ReactNode
  handleConfirm: () => void
  handleClose: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

export const ConfirmDialog = ({
  open,
  children,
  handleConfirm,
  handleClose,
  confirmButtonText,
  cancelButtonText,
  maxWidth = "xs",
}: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={3} sx={{ width: "100%", mx: 1, mb: 1 }}>
          <Button
            fullWidth
            autoFocus
            color="primary"
            variant="contained"
            onClick={() => {
              handleConfirm()
              handleClose()
            }}
          >
            {confirmButtonText || "확인"}
          </Button>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleClose}
          >
            {cancelButtonText || "취소"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

interface useConfirmDialogProps {
  children?: React.ReactNode
  handleConfirm?: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

/**
 * ConfirmDialog 사용 hook
 */
export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    ConfirmDialog: isOpen
      ? ({
          children,
          handleConfirm,
          confirmButtonText,
          cancelButtonText,
          maxWidth = "xs",
        }: useConfirmDialogProps) => (
          <ConfirmDialog
            open={isOpen}
            handleConfirm={() => {
              if (handleConfirm) handleConfirm()
              close()
            }}
            handleClose={close}
            confirmButtonText={confirmButtonText}
            cancelButtonText={cancelButtonText}
            maxWidth={maxWidth}
          >
            {children}
          </ConfirmDialog>
        )
      : () => null,
    open,
    close,
    isOpen,
  }
}

export default ConfirmDialog
