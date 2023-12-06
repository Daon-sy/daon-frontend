import React from "react"
import { Box } from "@mui/material"

const WorkspaceNotice: React.FC = () => {
  return (
    <Box
      component="ul"
      sx={{
        height: "calc(30vh - 44px)",
        borderRadius: "6px",
        width: "100%",
        bgcolor: "#ffffff",
        display: "flex",
        alignItems: "center",
        scrollbarWidth: "0.5em",
        WebkitScrollSnapType: "none",
        overflowX: "scroll",
        overflowY: "hidden",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          cursor: "",
          backgroundColor: "#495e57",
          borderRadius: "15px",
        },
        "&::-webkit-scrollbar-button": {
          width: "8px",
        },
      }}
    >
      {/* 공지사항 Card */}
      <Box
        component="li"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          borderRadius: "15px",
          height: "calc(30vh - 104px)",
          maxHeight: "165px",
          width: "200px",
          border: "2px solid #e3e3e3",
          marginX: "2vh",
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
          📌 공지사항 제목입니다.
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
            "-webkit-box-orient": "vertical",
          }}
        >
          이건 내용이예요 이건 내용이예요 이건 내용이예요 이건 내용이예요이건
          내용이예요 이건 내용이예요 내용이예요 내용이예요 내용이예요
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
            사용자이름
          </Box>
          <Box component="span" sx={{ color: "#888888" }}>
            공지-올린-날짜
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkspaceNotice
