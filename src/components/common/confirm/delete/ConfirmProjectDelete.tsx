import React from "react"
import { Box } from "@mui/material"
import ConfirmDelete from "../confirmImg/delete.png"

/* interface Props {} */

export const ConfirmProjectDeleteComponent = () => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "230px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "120px",
            height: "120px",
            pb: "20px",
          }}
          src={ConfirmDelete}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "10%",
          fontSize: "15px",
          fontWeight: "700",
          textAlign: "center",
          alignItems: "center",
          color: "#d29e05",
          pt: "8px",
        }}
      >
        프로젝트 삭제를 하시겠습니까
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "40%",
          mt: "20px",
          p: "10px",
          border: 1,
          borderRadius: 1,
          color: "lightGray",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "20%",
            fontSize: "12px",
            fontWeight: "300",
            textAlign: "center",
            alignItems: "center",
            color: "#858585",
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          프로젝트 내 모든 할일 및 정보가 삭제되며, <br /> 한번 삭제된
          프로젝트는 복구가 불가능합니다.
        </Box>
      </Box>
    </Box>
  )
}

export default ConfirmProjectDeleteComponent
