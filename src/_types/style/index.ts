import { ButtonPropsColorOverrides } from "@mui/material/Button/Button"
import { OverridableStringUnion } from "@mui/types"
import { ChipPropsColorOverrides } from "@mui/material/Chip"

export type ColorOptions = OverridableStringUnion<
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning",
  ButtonPropsColorOverrides | ChipPropsColorOverrides
>
export const avatarColors = [
  "#fedc7a",
  "#eceb5f",
  "#8dcfb0",
  "#9bd9e5",
  "#8e82bd",
  "#76bc61",
]
