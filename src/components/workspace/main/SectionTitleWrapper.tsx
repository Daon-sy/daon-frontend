import React, { ReactNode } from "react"
import { Box } from "@mui/material"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"

interface SectionTitleWrapperProp {
  width: number | string
  maxWidth?: string
  height?: number | string
  color: string
  icon: FontAwesomeIconProps["icon"]
  children: ReactNode
  title: string
  pl?: number
}
const SectionTitleWrapper: React.FC<SectionTitleWrapperProp> = ({
  width,
  maxWidth,
  color,
  icon,
  children,
  title,
  pl,
  height,
}: SectionTitleWrapperProp) => {
  return (
    <Box
      component="section"
      sx={{
        maxWidth,
        width,
        pl,
        height: "100%",
      }}
    >
      {/* title */}
      <Box
        component="h3"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "16px",
          color,
          fontSize: "20px",
          fontWeight: "800",
          height,
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center",
            mr: "4px",
          }}
        >
          <FontAwesomeIcon icon={icon} color="#ffffff" />
        </Box>
        {title}
      </Box>
      {children}
    </Box>
  )
}

export default SectionTitleWrapper
