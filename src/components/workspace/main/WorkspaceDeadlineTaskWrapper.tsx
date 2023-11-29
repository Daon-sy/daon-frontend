import React from "react"
import { Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { getWorkspaceStore } from "store/userStore"
import useFetchTaskList from "hooks/task/useFetchTaskList"

const WorkspaceDeadlineTaskWrapper: React.FC = () => {
  const { workspace } = getWorkspaceStore()
  const { tasks } = useFetchTaskList({
    workspaceId: workspace?.workspaceId || 0,
    params: { my: true },
  })

  return (
    <Box
      component="section"
      sx={{ maxWidth: "265px", width: "20%", height: "100%", pl: 4 }}
    >
      {/* title */}
      <Box
        component="h3"
        sx={{
          height: "5%",
          display: "flex",
          alignItems: "center",
          mb: "16px",
          color: "#7DB249",
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
            bgcolor: "#7DB249",
            alignItems: "center",
            justifyContent: "center",
            mr: "4px",
          }}
        >
          <FontAwesomeIcon icon={faFileCircleExclamation} color="#ffffff" />
        </Box>
        할일 D-3
      </Box>

      {/* 할일 Wrapper */}
      <Box
        component="ul"
        sx={{
          pt: "10px",
          borderRadius: "6px",
          width: "100%",
          height: "82%",
          bgcolor: "#ffffff",
          scrollbarWidth: "0.5em",
          WebkitScrollSnapType: "none",
          overflowX: "hidden",
          overflowY: "scroll",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#495e57",
            borderRadius: "15px",
          },
          "&::-webkit-scrollbar-button": {
            height: "16px",
          },
        }}
      >
        {/* 할일 item */}
        {tasks.map(task => (
          <Box
            component="li"
            sx={{
              mb: "4px",
              width: "90%",
              height: "40px",
              marginX: "16px",
              paddingY: "8px",
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #cecece",
              borderRadius: "15px",
            }}
          >
            {/* 날짜 */}
            <Box
              component="div"
              sx={{
                lineHeight: "40px",
                color: "white",
                bgcolor: "#568a35",
                height: "100%",
                paddingY: "8px",
                width: "25%",
                textAlign: "center",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
              }}
            >
              D-2
            </Box>
            {/* 내용 */}
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "12px",
              }}
            >
              <Box
                component="span"
                sx={{
                  color: "#3c5f52",
                  fontSize: "16px",
                  fontWeight: "bold",
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                  mb: 1,
                }}
              >
                {task.title}
              </Box>

              <Box
                component="span"
                sx={{
                  color: "#858585",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {task.endDate}
              </Box>
            </Box>
          </Box>
        ))}

        <Box
          component="li"
          sx={{
            width: "90%",
            height: "40px",
            mb: "4px",
            marginX: "16px",
            paddingY: "8px",
            display: "inline-flex",
            alignItems: "center",
            // justifyContent: "space-between",
            border: "1px solid #cecece",
            borderRadius: "15px",
          }}
        >
          {/* 날짜 */}
          <Box
            component="div"
            sx={{
              lineHeight: "40px",
              color: "white",
              bgcolor: "#FFB83B",
              height: "100%",
              paddingY: "8px",
              width: "25%",
              textAlign: "center",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
            }}
          >
            D-1
          </Box>
          {/* 내용 */}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "12px",
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#3c5f52",
                fontSize: "16px",
                fontWeight: "bold",
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
                mb: 1,
              }}
            >
              할일 title
            </Box>
            <Box
              component="span"
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              마감일 날짜
            </Box>
          </Box>
        </Box>
        <Box
          component="li"
          sx={{
            width: "90%",
            height: "40px",
            mb: "4px",
            marginX: "16px",
            paddingY: "8px",
            display: "inline-flex",
            alignItems: "center",
            // justifyContent: "space-between",
            border: "1px solid #cecece",
            borderRadius: "15px",
          }}
        >
          {/* 날짜 */}
          <Box
            component="div"
            sx={{
              lineHeight: "40px",
              color: "white",
              bgcolor: "#AE3A1E",
              height: "100%",
              paddingY: "8px",
              width: "25%",
              textAlign: "center",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
            }}
          >
            today
          </Box>
          {/* 내용 */}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "12px",
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#3c5f52",
                fontSize: "16px",
                fontWeight: "bold",
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
                mb: 1,
              }}
            >
              할일 title
            </Box>
            <Box
              component="span"
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              마감일 날짜
            </Box>
          </Box>
        </Box>
        <Box
          component="li"
          sx={{
            mb: "4px",
            width: "90%",
            height: "40px",
            marginX: "16px",
            paddingY: "8px",
            display: "inline-flex",
            alignItems: "center",
            // justifyContent: "space-between",
            border: "1px solid #cecece",
            borderRadius: "15px",
          }}
        >
          {/* 날짜 */}
          <Box
            component="div"
            sx={{
              lineHeight: "40px",
              color: "white",
              bgcolor: "#346B8A",
              height: "100%",
              paddingY: "8px",
              width: "25%",
              textAlign: "center",
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
            }}
          >
            D-3
          </Box>
          {/* 내용 */}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "12px",
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#3c5f52",
                fontSize: "16px",
                fontWeight: "bold",
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
                mb: 1,
              }}
            >
              할일 title
            </Box>
            <Box
              component="span"
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              마감일 날짜
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkspaceDeadlineTaskWrapper
