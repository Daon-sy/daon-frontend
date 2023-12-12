import React from "react"
import { Box } from "@mui/material"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"

interface IconBtnProps {
  text: string
  icon: React.ReactNode | FontAwesomeIconProps["icon"]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  to?: string
  component: React.ElementType
}

const IconBtn = ({ text, icon, onClick, to, component }: IconBtnProps) => {
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon
    }
    return <FontAwesomeIcon icon={icon as FontAwesomeIconProps["icon"]} />
  }

  return (
    <Box
      component={component}
      onClick={onClick}
      to={to}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        bgcolor: "transparent",
        border: "none",
        color: "#303633",
        borderRadius: "10px",
        textDecoration: "none",
        cursor: "pointer",
        paddingY: 0.4,
        "&:hover": {
          bgcolor: "rgba(146, 146, 146, 0.1)",
        },
      }}
    >
      <Box
        component="div"
        sx={{
          color: "#1f4838",
          fontSize: "20px",
          display: "flex",
          height: "24px",
          alignItems: "center",
        }}
      >
        {renderIcon()}
      </Box>
      <Box
        component="span"
        sx={{ lineHeight: "14px", fontSize: "10px", fontWeight: "bold" }}
      >
        {text}
      </Box>
    </Box>
  )
}

export default IconBtn
