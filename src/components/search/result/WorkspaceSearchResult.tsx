/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Badge, BadgeProps, Box, Chip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import PeopleIcon from "@mui/icons-material/People"
import { SearchWorkspaceResult } from "api/search"
import { getWorkspaceStore } from "store/userStore"
import ColorAvatar from "components/common/ColorAvatar"
import ConfirmDialog from "components/common/ConfirmDialog"
import ConfirmMovementComponent from "../../common/confirm/ConfirmMovement"

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))

interface Props {
  workspace: SearchWorkspaceResult
}

const WorkspaceSearchResult: React.FC<Props> = ({ workspace }) => {
  const {
    workspaceId,
    title,
    subject,
    division,
    description,
    imageUrl,
    workspaceParticipantsCount,
    createdAt,
    modifiedAt,
  } = workspace

  const [confirmDialogData, setConfirmDialogData] = React.useState<{
    children: React.ReactNode
    handleConfirm: () => void
  }>()

  const navigate = useNavigate()
  const { workspace: currentWorkspace } = getWorkspaceStore()
  const handleResultClick = () => {
    if (currentWorkspace && currentWorkspace.workspaceId !== workspaceId) {
      setConfirmDialogData({
        children: (
          <ConfirmMovementComponent
            title="워크스페이스"
            contents1={`[${title}] 워크스페이스  >`}
            contents2=""
          />
        ),
        handleConfirm: () => navigate(`/workspace/${workspaceId}`),
      })
    }
  }

  return (
    <Box
      key={`ws${workspaceId}`}
      p={0.5}
      sx={{
        "&:hover": {
          backgroundColor: "background.default",
          cursor: "pointer",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        borderRadius={1}
        onClick={handleResultClick}
      >
        <ColorAvatar
          id={workspaceId}
          src={imageUrl}
          name={title}
          sx={{
            width: 20,
            height: 20,
          }}
        />
        <Typography fontSize={14} color="primary">
          {title}
        </Typography>
        {division === "PERSONAL" ? (
          <Chip
            label="개인"
            size="small"
            variant="outlined"
            sx={{ ml: 0.5, fontSize: 12, height: 20, borderRadius: 1 }}
          />
        ) : null}
        {workspaceParticipantsCount > 1 ? (
          <StyledBadge
            max={999}
            badgeContent={workspaceParticipantsCount}
            color="primary"
            sx={{ ml: 1 }}
          >
            <PeopleIcon sx={{ fontSize: 20 }} />
          </StyledBadge>
        ) : null}
      </Box>
      {confirmDialogData ? (
        <ConfirmDialog
          open={!!confirmDialogData}
          handleConfirm={confirmDialogData.handleConfirm}
          handleClose={() => setConfirmDialogData(undefined)}
        >
          {confirmDialogData?.children}
        </ConfirmDialog>
      ) : null}
    </Box>
  )
}

export default WorkspaceSearchResult
