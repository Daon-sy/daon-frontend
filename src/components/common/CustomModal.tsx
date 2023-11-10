import React from "react"
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import Box from "@mui/material/Box"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"

interface CustomModalProps {
  open: boolean
  handleClose: () => void
  cleanUp?: () => void | null
  children: React.ReactNode
  width?: number | null
  minWidth?: number
  maxWidth?: number | null
  height?: number | null
  minHeight?: number | null
  maxHeight?: number | null
  fullHeight?: true | undefined
  px?: number
  py?: number
}

const CustomModal = ({
  open,
  handleClose,
  cleanUp,
  children,
  width = null,
  minWidth = 100,
  maxWidth = null,
  height = null,
  minHeight = null,
  maxHeight = null,
  fullHeight,
  px = 4,
  py = 3,
}: CustomModalProps) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    px,
    py,
    minWidth,
    maxWidth,
    width,
    minHeight,
    maxHeight,
    height,
    display: "flex",
    alignItems: "center",
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      onTransitionExited={cleanUp}
    >
      <Fade in={open}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 32,
              height: 32,
            }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
          <Box
            sx={{
              overflow: "hidden",
              width: "100%",
              height: fullHeight ? "100%" : undefined,
            }}
          >
            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CustomModal
