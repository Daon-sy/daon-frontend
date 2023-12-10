import React from "react"
import { Box, Typography } from "@mui/material"
import useFetchWorkspaceNoticeList from "hooks/workspace/useFetchWorkspaceNoticeList"
import { useParams } from "react-router-dom"
import nodata from "assets/svg/no_data.png"

const WorkspaceNotice: React.FC = () => {
  const { workspaceId } = useParams()
  const { workspaceNotices } = useFetchWorkspaceNoticeList(Number(workspaceId))
  return (
    <Box
      component="ul"
      sx={{
        boxSizing: "border-box",
        paddingX: "1vw",
        height: "calc(30vh - 44px)",
        borderRadius: "6px",
        width: "100%",
        bgcolor: "#ffffff",
        display: "flex",
        alignItems: "center",
        WebkitScrollSnapType: "none",
        overflowX: "scroll",
        overflowY: "hidden",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#495e57",
          borderRadius: "15px",
        },
        "&::-webkit-scrollbar-button": {
          width: "0px",
        },
      }}
    >
      {workspaceNotices.length === 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            pt: 4,
          }}
        >
          <Box width="320px" height="160px" component="img" src={nodata} />
          <Typography sx={{ position: "absolute" }}>
            입력된 공지사항이 없어요
          </Typography>
        </Box>
      )}
      {workspaceNotices.map(workspaceNotice => (
        <Box
          key={workspaceNotice.noticeId}
          component="li"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            borderRadius: "15px",
            height: "calc(30vh - 104px)",
            minHeight: "130px",
            maxHeight: "165px",
            width: "212px",
            minWidth: "212px",
            border: "2px solid #e3e3e3",
            marginX: "6px",
            paddingY: "1vh",
            paddingX: "12px",
          }}
        >
          <Box
            component="div"
            sx={{
              height: "20px",
              fontSize: "18px",
              color: "#425f54",
              fontWeight: "bold",
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
            }}
          >
            📌 {workspaceNotice.title}
          </Box>
          <Box
            component="div"
            sx={{
              color: "#888888",
              height: "60px",
              lineHeight: "20px",
              fontSize: "12px",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-all",
              "-webkit-box-orient": "vertical",
            }}
          >
            {workspaceNotice.content}
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              fontSize: "12px",
              justifyContent: "space-between",
              paddingX: "8px",
            }}
          >
            <Box component="span" sx={{ color: "#3b5e51", fontWeight: "bold" }}>
              {workspaceNotice.writer.name}
            </Box>
            <Box component="span" sx={{ color: "#888888" }}>
              {workspaceNotice.createdAt}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default WorkspaceNotice
