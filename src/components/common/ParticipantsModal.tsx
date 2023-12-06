import React from "react"
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {
  roles,
  WORKSPACE_PARTICIPANT_ROLE,
  WorkspaceParticipant,
  WorkspaceParticipantRoleDetail,
} from "_types/workspace"
import { getWorkspaceStore } from "store/userStore"
import { workspaceParticipantListApi } from "api/workspace"
import ParticipantCard from "./ParticipantCard"
import TitleDialog from "./TitleDialog"

interface Props {
  open: boolean
  handleClose: () => void
}

const ParticipantsModal = ({ open, handleClose }: Props) => {
  const { workspace, myProfile } = getWorkspaceStore()
  const [participants, setParticipants] = React.useState<
    Array<WorkspaceParticipant>
  >([])
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
  }, [myProfile])

  const selectRoleClick = (role: string | WORKSPACE_PARTICIPANT_ROLE) => () => {
    setSelectedRole(role)
  }

  const getFilteredParticipants = () => {
    let filteredParticipants = participants
    const searchKeywordToLowerCase = searchKeyword.trim().toLowerCase()

    if (selectedRole !== "전체") {
      filteredParticipants = filteredParticipants.filter(
        participant => participant.role === selectedRole,
      )
    }

    if (searchKeywordToLowerCase !== "") {
      filteredParticipants = filteredParticipants.filter(participant =>
        participant.name.toLowerCase().includes(searchKeywordToLowerCase),
      )
    }

    return filteredParticipants
  }

  return (
    <TitleDialog
      title="구성원 목록"
      open={open}
      handleClose={handleClose}
      maxWidth="sm"
      height="65vh"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
        }}
      >
        <Box>
          <TextField
            autoComplete="off"
            size="small"
            sx={{
              fontSize: 14,
            }}
            placeholder="구성원 이름으로 검색"
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
        <Box>
          <FormControl>
            <Select sx={{ width: 180 }} size="small" value={selectedRole}>
              <MenuItem value="전체" onClick={selectRoleClick("전체")}>
                전체 보기
              </MenuItem>
              {roles.map((roleDetail: WorkspaceParticipantRoleDetail) => (
                <MenuItem
                  key={roleDetail.role}
                  value={roleDetail.role}
                  onClick={selectRoleClick(roleDetail.role)}
                >
                  {roleDetail.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {getFilteredParticipants().map(participant => (
          <ParticipantCard
            key={participant.workspaceParticipantId}
            participant={participant}
          />
        ))}
      </Box>
    </TitleDialog>
  )
}

export default ParticipantsModal
