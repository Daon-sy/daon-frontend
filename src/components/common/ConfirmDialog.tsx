import React from "react"
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const ConfirmButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#1F4838"),
  backgroundColor: "#1F4838",
  "&:hover": {
    backgroundColor: "#295644",
  },
}))

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
        <Stack
          direction="row"
          spacing={3}
          sx={{ width: "100%", mx: 3, mb: 2.5 }}
        >
          <ConfirmButton
            fullWidth
            autoFocus
            variant="contained"
            onClick={() => {
              handleConfirm()
              handleClose()
            }}
          >
            {confirmButtonText || "확인"}
          </ConfirmButton>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
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
