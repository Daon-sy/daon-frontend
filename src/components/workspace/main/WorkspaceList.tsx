import React from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material"
import { faObjectGroup } from "@fortawesome/free-solid-svg-icons"
import { getWorkspaceListStore } from "store/userStore"
import MainEmpty from "components/common/MainEmpty"
import { Link } from "react-router-dom"

const WorkspaceList: React.FC = () => {
  const { workspaceList } = getWorkspaceListStore()

  const groupWorkspaceList = workspaceList.filter(
    workspace => workspace.division === "GROUP",
  )

  return (
    <Box
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
      {groupWorkspaceList.length === 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MainEmpty
            icon={faObjectGroup}
            content="좌측 그룹 워크스페이스 생성 버튼으로 그룹 워크스페이스를 생성해보세요"
            bgcolor="rgba(236,159,93,0.6)"
          />
        </Box>
      )}
      {groupWorkspaceList.map(ws => (
        <Link
          key={ws.workspaceId}
          to={`/workspace/${ws.workspaceId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card
            sx={{
              height: "calc(30vh - 72px)",
              width: "200px",
              position: "relative",
              mr: 2,
              boxShadow: "1px 1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            <CardActionArea sx={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  backgroundImage: ws.imageUrl ? `url(${ws.imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.2,
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
              {/* 나머지 카드 내용 */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "28px",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                  }}
                >
                  {ws.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    width: "100%",
                    display: "inline-block",
                    maxHeight: "calc(30vh - 128px)",
                    overflowY: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    wordBreak: "break-all",
                  }}
                >
                  {ws.description
                    ? ws.description
                    : "입력된 워크스페이스 설명이 없어요"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </Box>
  )
}

export default WorkspaceList
