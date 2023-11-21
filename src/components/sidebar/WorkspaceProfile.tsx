import * as React from "react"
import { Box } from "@mui/material"
import { TEST_IMAGE_URL } from "env"

const WorkSpaceProfile: React.FC = () => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "30%",
        bgcolor: "#82b89b",
        paddingY: "16px",
        position: "relative",
        cursor: " pointer",
        display: "flex",
        justifyContent: "center",
        mb: "4px",
        border: "none",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            component="div"
            sx={{
              borderRadius: 1,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 20,
              mb: "4px",
              textAlign: "center",
              color: "#476354",
              fontWeight: "bold",
            }}
          >
            워크스페이스 이름
          </Box>
          <Box
            component="div"
            sx={{
              width: 140,
              height: 140,
              background: "linear-gradient( #ffffff, #faa788)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <Box
              component="img"
              src={`${TEST_IMAGE_URL}`}
              sx={{
                objectFit: "cover",
                width: 120,
                height: 120,
                borderRadius: 50,
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: "2px",
              textAlign: "center",
              color: "white",
            }}
          >
            <Box
              sx={{
                borderRadius: 1,
                width: "100%",
                fontSize: 20,
                fontWeight: "bold",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              닉네임
            </Box>
            <Box
              sx={{
                borderRadius: 1,
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "#b6d1c2",
                marginY: 1,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              workspace@gmail.com
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkSpaceProfile
