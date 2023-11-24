import React, { useState } from "react"
import { Box, FormHelperText, TextField } from "@mui/material"
import { TEST_IMAGE_URL } from "env"
import { TaskReplyDetail } from "_types/task"
import { removeTaskReply, modifyTaskReply } from "api/task"
import ReplyBtn from "./ReplyBtn"

interface CombinedTaskReplyProps {
  workspaceId: number | undefined
  projectId: number
  taskId: number
  reply: TaskReplyDetail
}

const CombinedTaskReply: React.FC<CombinedTaskReplyProps> = ({
  workspaceId,
  projectId,
  taskId,
  reply,
}: CombinedTaskReplyProps) => {
  const [isModify, setIsModify] = useState<boolean>(false)
  const [content, setContent] = useState<string>(reply.content)

  const handleToggle = () => {
    setIsModify(prevIsModify => !prevIsModify)
  }

  const handleRemoveClick = async (replyId: number) => {
    try {
      if (workspaceId) {
        await removeTaskReply(workspaceId, projectId, taskId, replyId)
      }
    } catch (error) {
      console.error("Error removing reply:", error)
    }
  }

  const handleModifyClick = async () => {
    try {
      if (workspaceId) {
        await modifyTaskReply(workspaceId, projectId, taskId, reply.replyId, {
          content,
        })
        setIsModify(false)
      }
    } catch (error) {
      console.error("Error modifying reply:", error)
    }
  }

  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        border: "1px solid black",
        mb: "4px",
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
          <Box
            component="img"
            alt="댓글 작성자 이미지"
            sx={{
              width: "30px",
              height: "30px",
              bgcolor: "grey",
              fontSize: "10px",
              borderRadius: "50%",
            }}
            src={reply.writer.imageUrl || TEST_IMAGE_URL}
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
                  <ReplyBtn handleClick={handleModifyClick}>저장</ReplyBtn>
                  <ReplyBtn handleClick={handleToggle}>취소</ReplyBtn>
                </>
              ) : (
                <ReplyBtn handleClick={handleToggle}>수정</ReplyBtn>
              )}
              <ReplyBtn handleClick={() => handleRemoveClick(reply.replyId)}>
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
              width: "488px",
              paddingLeft: "28px",
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
            width: "512px",
            paddingLeft: "28px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordWrap: "break-word",
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
        }}
      >
        {reply.createdAt}
      </Box>
    </Box>
  )
}

export default CombinedTaskReply
