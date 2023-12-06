import React from "react"
import Avatar from "@mui/material/Avatar"
// eslint-disable-next-line
import { SxProps } from "@mui/system"
import { Theme } from "@mui/material"
import { avatarColors } from "../../_types/style"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stringToColor = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

const getColor = (id: number | string): string => {
  if (typeof id === "number") return avatarColors[id % avatarColors.length]

  let hash = 0
  let i
  /* eslint-disable no-bitwise */
  for (i = 0; i < id.length; i += 1) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[hash % avatarColors.length]
  /* eslint-enable no-bitwise */
}

interface Props {
  src?: string
  id?: number | string
  name?: string
  sx?: SxProps<Theme>
}

const ColorAvatar = ({ id, src, name, sx }: Props) => (
  <Avatar
    src={src}
    sx={{
      width: 28,
      height: 28,
      mr: 0.5,
      fontSize: 14,
      bgcolor: id ? getColor(id) : undefined,
      ...sx,
    }}
  >
    {name ? name[0] : undefined}
  </Avatar>
)

export default ColorAvatar
