import React from "react"
import CustomModal from "components/common/CustomModal"
import {
  Box,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material"
import { ProjectParticipant } from "_types/project"
import { projectParticipantListApi } from "api/project"

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
  workspaceId: number
  projectId: number
  open: boolean
  handleClose: () => void
  handleItemClick: (participant?: ProjectParticipant | undefined) => void
}

const ProjectParticipantsModal = ({
  workspaceId,
  projectId,
  open,
  handleClose,
  handleItemClick,
}: Props) => {
  const [filter, setFilter] = React.useState<Filter>("name")
  const [filterText, setFilterText] = React.useState("")
  const [projectParticipants, setProjectParticipants] = React.useState<
    Array<ProjectParticipant> | undefined
  >()

  React.useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const { data } = await projectParticipantListApi(workspaceId, projectId)
        const { projectParticipants: participants } = data
        setProjectParticipants(participants)
      }
      fetchData()
    }
  }, [open])

  const cleanUp = () => {
    setFilter("name")
    setFilterText("")
    setProjectParticipants(undefined)
  }

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      width={400}
      height={450}
      fullHeight
      px={4}
      py={4}
      cleanUp={cleanUp}
    >
      <Box
        sx={{
          margin: 1,
          height: "100%",
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
                sx={{ fontSize: 14, height: 40 }}
              >
                {filters.map(item => (
                  <MenuItem
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
              size="small"
              sx={{
                fontSize: 14,
                height: 40,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
            />
          </Stack>
        </Box>
        <Box
          sx={{
            marginTop: 1,
            overflowY: "auto",
            height: 390,
            scrollbarWidth: "thin",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 1,
              padding: 1,
              "&:hover": {
                backgroundColor: "rgb(242,242,242)",
              },
            }}
            onClick={() => {
              handleItemClick()
              handleClose()
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box>
                <Avatar sx={{ width: 36, height: 36 }} />
              </Box>
              <Stack spacing={0.5}>
                <Box sx={{ marginLeft: 1, fontSize: 16, fontWeight: 900 }}>
                  없음
                </Box>
              </Stack>
            </Stack>
          </Box>
          {projectParticipants
            ?.filter(item =>
              item[filter].toUpperCase().includes(filterText.toUpperCase()),
            )
            .map(participant => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 1,
                  padding: 1,
                  "&:hover": {
                    backgroundColor: "rgb(242,242,242)",
                  },
                }}
                onClick={() => {
                  handleItemClick(participant)
                  handleClose()
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box>
                    <Avatar sx={{ width: 36, height: 36 }} />
                  </Box>
                  <Stack spacing={0.5}>
                    <Box sx={{ marginLeft: 1, fontSize: 15 }}>
                      {participant.name}
                    </Box>
                    <Box
                      sx={{
                        marginLeft: 1,
                        fontSize: 12,
                        color: "rgb(100,100,100)",
                      }}
                    >
                      {participant.email}
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            ))}
        </Box>
      </Box>
    </CustomModal>
  )
}

export default ProjectParticipantsModal
