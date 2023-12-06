import React from "react"
import Button from "@mui/material/Button"
import { ColorRole } from "_types/workspace"
import { Typography } from "@mui/material"

interface Props {
  colorRole: ColorRole
}

const RoleButton: React.FC<Props> = ({ colorRole }) => {
  return (
    <Button
      variant="contained"
      disableElevation
      color={colorRole.color}
      size="small"
      sx={{
        width: 160,
        "&:hover": {
          backgroundColor: `${colorRole.color}.main`,
        },
      }}
    >
      <Typography pl={0} sx={{ fontSize: 14, fontWeight: 500 }} flexGrow={1}>
        {colorRole.description}
      </Typography>
    </Button>
  )
}

export default RoleButton
