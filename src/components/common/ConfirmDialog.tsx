import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

interface Props {
  open: boolean
  title?: string
  content: string
  handleConfirm: () => void
  handleClose: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

const ConfirmDialog = ({
  open,
  title,
  content,
  handleConfirm,
  handleClose,
  confirmButtonText,
  cancelButtonText,
  maxWidth,
}: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>
        <DialogContentText whiteSpace="pre-wrap">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleConfirm()
            handleClose()
          }}
        >
          {confirmButtonText || "확인"}
        </Button>
        <Button onClick={handleClose}>{cancelButtonText || "취소"}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
