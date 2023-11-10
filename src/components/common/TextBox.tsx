import React from "react"
import Box from "@mui/material/Box"

interface Props {
  text: string | undefined
}

const TextBox: React.FC<Props> = ({ text }: Props) => {
  return (
    <Box
      flexGrow={1}
      sx={{
        border: "solid",
        // borderColor: "rgb(196,196,196)",
        borderRadius: 1,
        borderWidth: 2,
        display: "flex",
        alignItems: "center",
        paddingX: 1.5,
        "&:hover": {
          // borderColor: "rgb(56, 116, 203)",
          backgroundColor: "rgb(242,242,242)",
        },
      }}
    >
      {text}
    </Box>
  )
}

export default TextBox
