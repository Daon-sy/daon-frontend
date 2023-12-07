import React, { useState } from "react"
import { Box, FormHelperText, TextField } from "@mui/material"
import { TaskReplyDetail } from "_types/task"
import { removeTaskReply } from "api/task"

import ColorAvatar from "components/common/ColorAvatar"
import ReplyBtn from "./ReplyBtn"

interface TaskReplyItemProps {
  workspaceId: number | undefined
  projectId: number
  taskId: number
  reply: TaskReplyDetail
  onReplyModified: (replyId: number, modifiedContent: string) => void
  onReplyDeleted: () => void
}

const TaskReplyItem: React.FC<TaskReplyItemProps> = ({
  workspaceId,
  projectId,
  taskId,
  reply,
  onReplyModified,
  onReplyDeleted,
}: TaskReplyItemProps): React.ReactNode => {
  const [isModify, setIsModify] = useState<boolean>(false)
  const [content, setContent] = useState<string>(reply.content)

  const handleToggle = () => {
    setIsModify(prevIsModify => !prevIsModify)
  }

  const handleRemoveClick = async (replyId: number) => {
    try {
      if (workspaceId) {
        await removeTaskReply(workspaceId, projectId, taskId, replyId)
        onReplyDeleted()
      }
    } catch (error) {
      console.error("Error removing reply:", error)
    }
  }

  const handleModifyClick = async (replyId: number) => {
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
        width: "495px",
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
                  <ReplyBtn bgcolor="#AE3A1E" handleClick={handleToggle}>
                    취소
                  </ReplyBtn>
                </>
              ) : (
                <ReplyBtn bgcolor="#ffb83b" handleClick={handleToggle}>
                  수정
                </ReplyBtn>
              )}
              <ReplyBtn
                bgcolor="#747474"
                handleClick={() => handleRemoveClick(reply.replyId)}
              >
                삭제
              </ReplyBtn>
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
            placeholder="댓글을 수정해주세요"
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            inputProps={{ maxLength: 500 }}
            sx={{
              boxSizing: "border-box",
              width: "480px",
              paddingLeft: "24px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          />
          <FormHelperText sx={{ textAlign: "end" }}>
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
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordWrap: "break-word",
            fontSize: "14px",
            lineHeight: "16px",
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
