import React, { useState } from "react"
import { Box, FormHelperText, TextField } from "@mui/material"
import { TaskReplyDetail } from "_types/task"
import { removeTaskReply } from "api/task"

import ColorAvatar from "components/common/ColorAvatar"
import { useAlert } from "hooks/useAlert"
import ConfirmDialog from "components/common/ConfirmDialog"
import ReplyBtn from "./ReplyBtn"

interface TaskReplyItemProps {
  workspaceId: number | undefined
  projectId: number
  boardId: number
  taskId: number
  reply: TaskReplyDetail
  onReplyModified: (replyId: number, modifiedContent: string) => void
  onReplyDeleted: () => void
}

const TaskReplyItem: React.FC<TaskReplyItemProps> = ({
  workspaceId,
  projectId,
  boardId,
  taskId,
  reply,
  onReplyModified,
  onReplyDeleted,
}) => {
  const [isModify, setIsModify] = useState<boolean>(false)
  const prevContent = reply.content
  const [content, setContent] = useState<string>(reply.content)
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
  const { addSuccess, addError } = useAlert()

  const handleToggle = () => {
    setIsModify(prevIsModify => !prevIsModify)
    setContent(prevContent)
  }

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true)
  }

  const handleRemoveClick = async (replyId: number) => {
    try {
      if (workspaceId) {
        await removeTaskReply(workspaceId, projectId, boardId, taskId, replyId)
        onReplyDeleted()
        addSuccess("댓글이 삭제되었습니다.")
      }
    } catch (error) {
      console.error("Error removing reply:", error)
    }
  }

  const handleModifyClick = async (replyId: number) => {
    if (content.length === 0) {
      addError("댓글 내용은 필수입력 값입니다")
      return
    }
    if (content.length >= 500) {
      addError("댓글 내용은 500자 미만으로 입력해주세요")
      return
    }

    setIsModify(false)
    onReplyModified(replyId, content)
  }

  return (
    <Box
      component="li"
      sx={{
        color: "#1f4838",
        display: "flex",
        flexDirection: "column",
        borderRadius: "4px",
        mb: "8px",
        background: "#f6f7f9",
        // width: "495px",
        width: "100%",
      }}
      key={reply.replyId}
    >
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ColorAvatar
            id={reply.writer.projectParticipantId}
            src={reply.writer.imageUrl}
            sx={{ width: 20, height: 20, ml: 12 / 8, mr: 6 / 8, my: 1 }}
          />
          <Box component="span" sx={{ fontSize: "10px" }}>
            {reply.writer.name}
          </Box>
        </Box>
        <Box component="div" sx={{ paddingRight: 1 }}>
          {reply.isWriter && (
            <>
              {isModify ? (
                <>
                  <ReplyBtn
                    bgcolor="#ffb83b"
                    handleClick={() => handleModifyClick(reply.replyId)}
                  >
                    저장
                  </ReplyBtn>
                  <ReplyBtn bgcolor="#747474" handleClick={handleToggle}>
                    취소
                  </ReplyBtn>
                </>
              ) : (
                <ReplyBtn bgcolor="#ffb83b" handleClick={handleToggle}>
                  수정
                </ReplyBtn>
              )}
              <ReplyBtn bgcolor="#AE3A1E" handleClick={openConfirmDialog}>
                삭제
              </ReplyBtn>
              <ConfirmDialog
                open={confirmDialogOpen}
                handleConfirm={() => handleRemoveClick(reply.replyId)}
                handleClose={() => setConfirmDialogOpen(false)}
              >
                댓글을 삭제하시겠습니까?
              </ConfirmDialog>
            </>
          )}
        </Box>
      </Box>

      {isModify ? (
        <Box
          sx={{
            height: "100%",
            width: "90%",
            position: "relative",
          }}
        >
          <TextField
            multiline
            rows={2}
            placeholder="댓글을 수정해주세요"
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 500, style: { whiteSpace: "pre-wrap" } }}
            sx={{
              boxSizing: "border-box",
              width: "472px",
              paddingLeft: "24px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "pre-wrap",
              py: 0.1,
            }}
          />
          <FormHelperText sx={{ textAlign: "end", width: "472px" }}>
            {`${content.length}/500자`}
          </FormHelperText>
        </Box>
      ) : (
        <Box
          component="div"
          sx={{
            boxSizing: "border-box",
            width: "480px",
            paddingLeft: "24px",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            fontSize: "14px",
            lineHeight: "16px",
            whiteSpace: "pre-wrap",
          }}
        >
          {reply.content}
        </Box>
      )}

      <Box
        component="div"
        sx={{
          color: "grey",
          fontSize: "10px",
          textAlign: "right",
          paddingRight: "12px",
          my: "8px",
        }}
      >
        {reply.createdAt}
      </Box>
    </Box>
  )
}

export default TaskReplyItem
