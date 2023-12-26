/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Badge, BadgeProps, Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import PeopleIcon from "@mui/icons-material/People"
import { SearchProjectResult } from "api/search"
import { getWorkspaceStore } from "store/userStore"
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
  project: SearchProjectResult
}

const ProjectSearchResult: React.FC<Props> = ({ project }) => {
  const {
    workspace,
    projectId,
    title: projectTitle,
    description: projectDescription,
    projectParticipantsCount,
    createdAt: projectCreatedAt,
    modifiedAt: projectModifiedAt,
  } = project

  const {
    workspaceId,
    title: workspaceTitle,
    description: workspaceDescription,
    imageUrl: workspaceImageUrl,
    division: workspaceDivision,
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
            title="프로젝트"
            contents1={`[${workspaceTitle}] 워크스페이스  >`}
            contents2={`[${projectTitle}] 프로젝트`}
          />
        ),
        handleConfirm: () =>
          navigate(`/workspace/${workspaceId}/project/${projectId}`),
      })
    } else {
      navigate(`/workspace/${workspaceId}/project/${projectId}`)
    }
  }

  return (
    <Box
      key={`pj${projectId}`}
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
        <Typography fontSize={14} color="primary">
          {projectTitle}
        </Typography>
        {workspaceDivision !== "PERSONAL" && projectParticipantsCount > 0 ? (
          <StyledBadge
            max={999}
            badgeContent={projectParticipantsCount}
            color="secondary"
            sx={{ mx: 1 }}
          >
            <PeopleIcon sx={{ fontSize: 20 }} />
          </StyledBadge>
        ) : null}
      </Box>
      <Box>
        <Typography
          // ml={2}
          fontSize={12}
        >{`(${workspaceTitle}에서 생성됨)`}</Typography>
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

export default ProjectSearchResult
