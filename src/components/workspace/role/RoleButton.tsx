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
      variant="outlined"
      disableElevation
      // color={colorRole.color}
      color="primary"
      size="small"
      sx={{
        width: 160,
        borderWidth: 1,
      }}
    >
      <Typography pl={0} sx={{ fontSize: 12, fontWeight: 500 }} flexGrow={1}>
        {colorRole.description}
      </Typography>
    </Button>
  )
}

export default RoleButton
