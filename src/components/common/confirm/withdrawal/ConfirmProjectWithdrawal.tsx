import React from "react"
import { Box } from "@mui/material"
import ConfirmWithdrawal from "../confirmImg/withdrawal.png"

/* interface Props {} */

export const ConfirmProjectWithdrawalComponent = () => {
  return (
    <Box
      sx={{
        pt: 2,
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
          src={ConfirmWithdrawal}
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
          color: "#e43f3d",
          pt: "8px",
        }}
      >
        프로젝트 탈퇴를 하시겠습니까
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
          탈퇴가 진행되면 복구가 불가능합니다. <br /> 동의하시면 아래 체크버튼을
          클릭해 주세요.
        </Box>
      </Box>
    </Box>
  )
}

export default ConfirmProjectWithdrawalComponent
