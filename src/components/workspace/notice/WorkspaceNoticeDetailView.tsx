import React, { useEffect } from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import useRemoveWorkspaceNotice from "hooks/workspace/useRemoveWorkspaceNotice"
import { getWorkspaceStore } from "store/userStore"
import useFetchWorkspaceNoticeDetail from "hooks/workspace/useFetchWorkspaceNoticeDetail"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ConfirmDialog from "components/common/ConfirmDialog"
import { ConfirmDeleteComponent } from "components/common/confirm/ConfirmDelete"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"
import ModifyWorkspaceNotice from "./ModifyWorkspaceNotice"

interface Props {
  workspaceId: number
  noticeId: number
  onCancel: () => void
}

const WorkspaceNoticeDetailView: React.FC<Props> = ({
  workspaceId,
  noticeId,
  onCancel,
}: Props) => {
  const { myProfile } = getWorkspaceStore()
  const { workspaceNotice, fetchWorkspaceNoticeDetail } =
    useFetchWorkspaceNoticeDetail(workspaceId, noticeId)
  const { removeNotice } = useRemoveWorkspaceNotice(workspaceId, noticeId)
  const [noData, setIsNoData] = React.useState(false)
  const [isModifyMode, setIsModifyMode] = React.useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true)
  }
  const handleRemoveNotice = () => {
    removeNotice()
    setIsNoData(true)
  }

  const handleModifyNotice = () => {
    setIsModifyMode(true)
  }

  useEffect(() => {
    setIsNoData(false)
    setIsModifyMode(false)
  }, [noticeId])

  useEffect(() => {
    fetchWorkspaceNoticeDetail()
  }, [isModifyMode])

  return (
    <Box
      sx={{
        border: "2px solid #dcdcdc",
        height: "94%",
        borderRadius: 1,
        paddingY: "2%",
        paddingX: "4%",
        fontSize: 14,
      }}
    >
      {noData ? (
        <Box
          flexGrow={1}
          mb={1}
          width="100%"
          height="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              width: "58px",
              height: "58px",
              fontSize: "24px",
              borderRadius: "50%",
              backgroundColor: "rgba(226,88,96,0.6)",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <FontAwesomeIcon icon={faBullhorn} color="#ffffff" />
          </Box>
          공지사항이 삭제되었습니다.
        </Box>
      ) : (
        <Box height="100%">
          {isModifyMode && workspaceNotice ? (
            <ModifyWorkspaceNotice
              workspaceId={workspaceId}
              noticeId={noticeId}
              notice={workspaceNotice}
              onCancel={() => setIsModifyMode(false)}
            />
          ) : (
            workspaceNotice && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <Box
                    component="button"
                    onClick={onCancel}
                    sx={{
                      bgcolor: "white",
                      border: "none",
                      color: "#9e9e9e",
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mr: 1,
                      "&:hover": {
                        bgcolor: "#e2e2e4",
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon sx={{ width: 24, height: 24 }} />
                  </Box>
                  <Box
                    sx={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: "#595959",
                      lineHeight: "28px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      wordBreak: "break-word",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {workspaceNotice.title}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Box sx={{ color: "#bababa" }}>
                    {workspaceNotice.createdAt}
                  </Box>
                  <Typography sx={{ color: "#1f4838", fontSize: 12 }}>
                    {workspaceNotice.writer?.name}
                  </Typography>
                </Box>
                <Divider sx={{ mt: 0.5, mb: 1 }} />
                <Box
                  sx={{
                    height: 348,
                    lineHeight: "20px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                    backgroundColor: "#f6f7f9",
                    borderRadius: 1,
                    p: 2,
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#495e57",
                      borderRadius: "15px",
                    },
                  }}
                >
                  {workspaceNotice.content}
                </Box>
              </Box>
            )
          )}
          {myProfile?.role === "WORKSPACE_ADMIN" && !isModifyMode ? (
            <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
              <Button
                variant="contained"
                onClick={handleModifyNotice}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={openConfirmDialog}
                sx={{ mr: 1 }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ) : null}
        </Box>
      )}
      <ConfirmDialog
        open={confirmDialogOpen}
        handleConfirm={handleRemoveNotice}
        handleClose={() => setConfirmDialogOpen(false)}
      >
        <ConfirmDeleteComponent
          title="해당 공지사항을 삭제하시겠습니까"
          contents="한번 삭제된 공지사항은 복구가 불가능합니다"
        />
      </ConfirmDialog>
    </Box>
  )
}

export default WorkspaceNoticeDetailView
