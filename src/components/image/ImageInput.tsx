import React from "react"
import Box from "@mui/material/Box"
import { TEST_IMAGE_URL } from "env"

interface ImageInputProps {
  width: number
  height: number
  imageUrl: string | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = (props: ImageInputProps) => {
  const { width, height, imageUrl, onImageChange } = props
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
          border: "solid 1px",
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderRadius: "10px",
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
