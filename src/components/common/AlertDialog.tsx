import React from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material"

interface Props {
  open?: boolean
  children?: React.ReactNode
  handleConfirm: () => void
  handleClose: () => void
  confirmButtonText?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

export const AlertDialog = ({
  open = false,
  children,
  handleConfirm,
  handleClose,
  confirmButtonText,
  maxWidth = "xs",
}: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Box
          width="100%"
          mx={3}
          mb={2.5}
          display="flex"
          justifyContent="center"
        >
          <Button
            autoFocus
            color="primary"
            variant="contained"
            onClick={() => {
              handleConfirm()
              handleClose()
            }}
            sx={{
              width: 1 / 2,
            }}
          >
            {confirmButtonText || "확인"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

interface useAlertDialogProps {
  children?: React.ReactNode
  handleConfirm: () => void
  confirmButtonText?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

/**
 * AlertDialog 사용 hook
 */
export const useAlertDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    AlertDialog: isOpen
      ? ({
          children,
          handleConfirm,
          confirmButtonText,
          maxWidth = "xs",
        }: useAlertDialogProps) => (
          <AlertDialog
            open={isOpen}
            handleConfirm={handleConfirm}
            handleClose={close}
            confirmButtonText={confirmButtonText}
            maxWidth={maxWidth}
          >
            {children}
          </AlertDialog>
        )
      : () => null,
    open,
    close,
    isOpen,
  }
}

export default AlertDialog
