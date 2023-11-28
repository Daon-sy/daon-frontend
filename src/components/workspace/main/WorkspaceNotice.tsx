import React from "react"
import { Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"

const WorkspaceNotice: React.FC = () => {
  return (
    <Box component="section" sx={{ width: "80%", height: "100%" }}>
      <Box
        component="h3"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "16px",
          color: "#E25860",
          fontSize: "20px",
          fontWeight: "800",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            bgcolor: "#E25860",
            alignItems: "center",
            justifyContent: "center",
            mr: "4px",
          }}
        >
          <FontAwesomeIcon icon={faBullhorn} color="#ffffff" />
        </Box>
        공지사항
      </Box>
      {/* 공지사항 Wrapper */}
      <Box
        component="div"
        sx={{
          borderRadius: "15px",
          width: "100%",
          height: "200px",
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
          component="div"
          sx={{
            borderRadius: "15px",
            height: "130px",
            width: "23%",
            maxWidth: "204px",
            border: "2px solid #e3e3e3",
            margin: "20px",
            paddingY: "16px",
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
              maxWidth: "204px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              mb: "12px",
            }}
          >
            📌 공지사항 제목입니다.
          </Box>
          <Box
            component="div"
            sx={{
              color: "#888888",
              height: "64px",
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
              mt: "20px",
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

        {/* 지워도 됌  공지사항 Card 여러개 넣었을 때 Test */}
        <Box
          component="div"
          sx={{
            borderRadius: "15px",
            height: "130px",
            width: "23%",
            maxWidth: "204px",
            border: "2px solid #e3e3e3",
            margin: "20px",
            paddingY: "16px",
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
              maxWidth: "204px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              mb: "12px",
            }}
          >
            📌 공지사항 제목입니다.
          </Box>
          <Box
            component="div"
            sx={{
              color: "#888888",
              height: "64px",
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
              mt: "20px",
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
        <Box
          component="div"
          sx={{
            borderRadius: "15px",
            height: "130px",
            width: "23%",
            maxWidth: "204px",
            border: "2px solid #e3e3e3",
            margin: "20px",
            paddingY: "16px",
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
              maxWidth: "204px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              mb: "12px",
            }}
          >
            📌 공지사항 제목입니다.
          </Box>
          <Box
            component="div"
            sx={{
              color: "#888888",
              height: "64px",
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
              mt: "20px",
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
        <Box
          component="div"
          sx={{
            borderRadius: "15px",
            height: "130px",
            width: "23%",
            maxWidth: "204px",
            border: "2px solid #e3e3e3",
            margin: "20px",
            paddingY: "16px",
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
              maxWidth: "204px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              mb: "12px",
            }}
          >
            📌 공지사항 제목입니다.
          </Box>
          <Box
            component="div"
            sx={{
              color: "#888888",
              height: "64px",
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
              mt: "20px",
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
        <Box
          component="div"
          sx={{
            borderRadius: "15px",
            height: "130px",
            width: "23%",
            maxWidth: "204px",
            border: "2px solid #e3e3e3",
            margin: "20px",
            paddingY: "16px",
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
              maxWidth: "204px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              mb: "12px",
            }}
          >
            📌 공지사항 제목입니다.
          </Box>
          <Box
            component="div"
            sx={{
              color: "#888888",
              height: "64px",
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
              mt: "20px",
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
    </Box>
  )
}

export default WorkspaceNotice