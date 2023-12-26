import React from "react"
import { Box } from "@mui/material"

interface Props {
  title: string
  content: string
  name: string
  createdAt: string
  onClick?: () => void
}

const NoticeCard: React.FC<Props> = ({
  title,
  content,
  name,
  createdAt,
  onClick,
}: Props) => {
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        borderRadius: "15px",
        height: "calc(30vh - 104px)",
        minHeight: "130px",
        maxHeight: "165px",
        width: "22%",
        border: "2px solid #e3e3e3",
        marginX: "6px",
        paddingY: "1vh",
        paddingX: "12px",
        cursor: "pointer",
      }}
      onClick={onClick}
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
        {title}
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
          WebkitBoxOrient: "vertical",
        }}
      >
        {content}
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
        <Box
          component="div"
          sx={{
            color: "#3b5e51",
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100px",
          }}
        >
          {name}
        </Box>
        <Box
          component="div"
          sx={{ color: "#888888", textAlign: "center", width: "88px" }}
        >
          {createdAt}
        </Box>
      </Box>
    </Box>
  )
}

export default NoticeCard
