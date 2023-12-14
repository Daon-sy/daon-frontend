import React from "react"
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
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
import ParticipantCard from "components/workspace/participant/ParticipantCard"
import TitleDialog from "components/common/TitleDialog"
import NoData from "components/common/NoData"

type Filter = "name" | "email"

const filters = [
  {
    text: "이름",
    filter: "name" as Filter,
  },
  {
    text: "이메일",
    filter: "email" as Filter,
  },
]

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
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")

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

    if (selectedRole !== "전체") {
      filteredParticipants = filteredParticipants.filter(
        participant => participant.role === selectedRole,
      )
    }

    if (filterText.trim() !== "") {
      filteredParticipants = filteredParticipants.filter(participant =>
        participant[filter].toUpperCase().includes(filterText.toUpperCase()),
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
          <Stack direction="row" spacing={0.5}>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={filter}
                onChange={(e: SelectChangeEvent) =>
                  setFilter(e.target.value as Filter)
                }
                size="small"
                sx={{ fontSize: 14 }}
              >
                {filters.map((item, index) => (
                  <MenuItem
                    key={item.filter}
                    value={item.filter}
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              autoComplete="off"
              size="small"
              placeholder="참여자 검색"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                style: { fontSize: 14 },
              }}
            />
          </Stack>
        </Box>
        <Box>
          <FormControl>
            <Select
              sx={{ width: 180, fontSize: 14 }}
              size="small"
              value={selectedRole}
            >
              <MenuItem
                value="전체"
                onClick={selectRoleClick("전체")}
                sx={{ fontSize: 14 }}
              >
                전체 보기
              </MenuItem>
              {roles.map((roleDetail: WorkspaceParticipantRoleDetail) => (
                <MenuItem
                  key={roleDetail.role}
                  value={roleDetail.role}
                  onClick={selectRoleClick(roleDetail.role)}
                  sx={{ fontSize: 14 }}
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
          justifyContent: "center",
        }}
      >
        {getFilteredParticipants().length > 0 ? (
          getFilteredParticipants().map(participant => (
            <ParticipantCard
              key={participant.workspaceParticipantId}
              participant={participant}
            />
          ))
        ) : (
          <NoData content="검색 결과가 없어요" width="280px" height="140px" />
        )}
      </Box>
    </TitleDialog>
  )
}

export default ParticipantsModal
