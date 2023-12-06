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
