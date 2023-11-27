import React from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface Props {
  open: boolean
  handleClose: () => void
  title?: string | React.ReactNode
  titleFontSize?: number
  subTitle?: string | React.ReactNode
  children: React.ReactNode
  actionButtons?: React.ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false | number
  height?: number
  padding?: number
  disableCloseButton?: boolean
  minWidth?: number
}

const TitleModal = ({
  open = false,
  handleClose,
  title,
  titleFontSize = 20,
  subTitle,
  children,
  actionButtons,
  maxWidth = "md",
  height,
  padding,
  disableCloseButton = false,
  minWidth,
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
        <DialogTitle sx={{ m: 0, p: 1.5 }}>
          <Box display="flex" alignItems="center" pr={7}>
            <Box flexGrow={1}>
              <Typography variant="inherit" fontSize={titleFontSize}>
                {title}
              </Typography>
            </Box>
            {subTitle ? <Box>{subTitle}</Box> : null}
          </Box>
        </DialogTitle>
      ) : null}
      {disableCloseButton ? null : (
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent
        dividers
        sx={{
          padding,
          height,
        }}
      >
        {children}
      </DialogContent>
      {actionButtons ? (
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  )
}

export default TitleModal
