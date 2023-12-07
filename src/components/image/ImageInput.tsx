import React from "react"
import Box from "@mui/material/Box"
import { TEST_IMAGE_URL } from "env"

interface ImageInputProps {
  width: number
  height: number
  borderRadius?: number
  border: string
  imageUrl: string | null | undefined
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({
  width,
  height,
  borderRadius = 5,
  border = "solid 1px",
  imageUrl,
  onImageChange,
}: ImageInputProps) => {
  const fileInput = React.useRef<HTMLInputElement>(null)
  const onImageBoxClick = () => fileInput.current?.click()

  return (
    <Box onClick={onImageBoxClick}>
      <Box
        height={height}
        width={width}
        sx={{
          overflow: "hidden",
          marginRight: 2,
          border,
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderRadius,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={onImageChange}
        />
        <Box
          component="img"
          src={!imageUrl ? `${TEST_IMAGE_URL}` : imageUrl}
          sx={{
            objectFit: "cover",
          }}
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  )
}

export default ImageInput
