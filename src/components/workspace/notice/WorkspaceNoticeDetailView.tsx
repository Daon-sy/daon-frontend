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
        <Box>삭제</Box>
      ) : (
        <Box>
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
                    📌 {workspaceNotice.title}
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
                    height: 408,
                    lineHeight: "20px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
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
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={handleModifyNotice}>
                <EditIcon />
              </Button>
              <Button onClick={openConfirmDialog}>
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
