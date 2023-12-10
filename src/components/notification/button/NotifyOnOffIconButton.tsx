import React from "react"
import { IconButton } from "@mui/material"
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import { SxProps } from "@mui/system/styleFunctionSx"
import { getMyMemberDetailStore } from "store/userStore"
import useModifyMySettings from "hooks/member/useModifyMySettings"

interface Props {
  buttonProps?: SxProps
  activeIconProps?: SxProps
  offIconProps?: SxProps
}

const NotifyOnOffIconButton = ({
  buttonProps,
  activeIconProps,
  offIconProps,
}: Props) => {
  const { mySettings } = getMyMemberDetailStore()
  const { fetch: modifySettings } = useModifyMySettings()

  if (!mySettings) return null

  const { notified } = mySettings

  return (
    <IconButton
      size="small"
      sx={{ mr: 1, ...buttonProps }}
      onClick={() => modifySettings({ notified: !mySettings?.notified })}
    >
      {notified ? (
        <NotificationsActiveIcon sx={{ fontSize: 20, ...activeIconProps }} />
      ) : (
        <NotificationsOffIcon sx={{ fontSize: 20, ...offIconProps }} />
      )}
    </IconButton>
  )
}

export default NotifyOnOffIconButton
