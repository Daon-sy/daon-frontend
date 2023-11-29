import React from "react"
import {
  Box,
  InputAdornment,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import {
  roles,
  WORKSPACE_PARTICIPANT_ROLE,
  WorkspaceParticipant,
  WorkspaceParticipantRoleDetail,
} from "_types/workspace"
import { getWorkspaceStore } from "store/userStore"
import { workspaceParticipantListApi } from "api/workspace"
import TitleModal from "./TitleModal"
import ParticipantCard from "./ParticipantCard"

interface Props {
  open: boolean
  handleClose: () => void
}

const ParticipantsModal = ({ open, handleClose }: Props) => {
  const { workspace } = getWorkspaceStore()
  const [participants, setParticipants] = React.useState<
    Array<WorkspaceParticipant>
  >([])
  const [roleListOpen, setRoleListOpen] = React.useState<boolean>(true)
  const [selectedRole, setSelectedRole] = React.useState<
    string | WORKSPACE_PARTICIPANT_ROLE
  >("전체")
  const [searchKeyword, setSearchKeyworkd] = React.useState<string>("")

  const fetchParticipants = async () => {
    if (workspace) {
      const { data } = await workspaceParticipantListApi(workspace.workspaceId)
      setParticipants(data.workspaceParticipants)
    }
  }

  React.useEffect(() => {
    fetchParticipants()
  }, [])

  const roleListOpenClick = () => {
    setRoleListOpen(!roleListOpen)
  }

  const selectRoleClick = (role: string | WORKSPACE_PARTICIPANT_ROLE) => () => {
    setSelectedRole(role)
    setRoleListOpen(false)
  }

  const getFilteredParticipants = () => {
    let filteredParticipants = participants

    if (selectedRole !== "전체") {
      filteredParticipants = filteredParticipants.filter(
        participant => participant.role === selectedRole,
      )
    }

    if (searchKeyword.trim() !== "") {
      filteredParticipants = filteredParticipants.filter(participant =>
        participant.name.includes(searchKeyword),
      )
    }

    return filteredParticipants
  }

  return (
    <TitleModal
      title="구성원 목록"
      open={open}
      handleClose={handleClose}
      maxWidth={700}
      height={550}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "45%",
            m: 1,
            mr: 17,
            flexDirection: "row",
          }}
        >
          <TextField
            autoComplete="off"
            size="small"
            sx={{
              fontSize: 14,
              backgroundColor: "#F6F7F9",
            }}
            placeholder="구성원 검색"
            value={searchKeyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchKeyworkd(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            width: "40%",
            flexDirection: "row-reverse",
            position: "relative",
          }}
        >
          <ListItemButton
            onClick={roleListOpenClick}
            sx={{
              backgroundColor: "#F6F7F9",
              height: 40,
              m: 1,
              width: 202,
              border: 1,
              borderColor: "lightgray",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <ListItemText primary="전체 보기" />
            {roleListOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {roleListOpen && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                top: 47,
                left: 8,
                backgroundColor: "white",
                width: 200,
                border: 1,
                borderColor: "lightgray",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <ListItemText
                sx={{ m: 1, ml: 2 }}
                primary="전체"
                onClick={selectRoleClick("전체")}
              />
              {roles.map((roleDetail: WorkspaceParticipantRoleDetail) => (
                <ListItemText
                  sx={{ m: 1, ml: 2 }}
                  key={roleDetail.role}
                  primary={roleDetail.description}
                  onClick={selectRoleClick(roleDetail.role)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        {getFilteredParticipants().map(participant => (
          <ParticipantCard
            key={participant.workspaceParticipantId}
            participant={participant}
          />
        ))}
      </Box>
    </TitleModal>
  )
}

export default ParticipantsModal
