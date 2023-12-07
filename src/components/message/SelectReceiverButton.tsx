import React from "react"
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import { MessageSender, WorkspaceParticipant } from "_types/workspace"
import { workspaceParticipantListApi } from "api/workspace"
import { TEST_IMAGE_URL } from "env"
import SearchIcon from "@mui/icons-material/Search"

interface SelectReceiverButtonProps {
  workspaceId: number | undefined
  messageSender: MessageSender | null
  onReceiverClick: (workspaceParticipantId: number) => void
}

const SelectReceiverButton = ({
  workspaceId,
  messageSender,
  onReceiverClick,
}: SelectReceiverButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [receivers, setReceivers] = React.useState<Array<WorkspaceParticipant>>(
    [],
  )
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [selectedReceiver, setSelectedReceiver] =
    React.useState<WorkspaceParticipant | null>(null)

  const fetchReceivers = async () => {
    if (workspaceId) {
      const { data } = await workspaceParticipantListApi(workspaceId)
      setReceivers(data.workspaceParticipants)
    }
  }

  React.useEffect(() => {
    fetchReceivers()

    if (messageSender) {
      setSelectedReceiver({
        workspaceParticipantId: messageSender.workspaceParticipantId,
        name: messageSender.name,
        email: messageSender.email,
        imageUrl: messageSender.imageUrl,
        role: "BASIC_PARTICIPANT",
      })
    }
  }, [])

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleReceiverClick = (receiver: WorkspaceParticipant) => {
    if (receiver.workspaceParticipantId !== undefined) {
      setSelectedReceiver(receiver)
      onReceiverClick(receiver.workspaceParticipantId)
      setAnchorEl(null)
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Button sx={{ width: "100%", border: 1 }} onClick={handleClick}>
        {selectedReceiver ? (
          <>
            <Avatar src={selectedReceiver?.imageUrl || TEST_IMAGE_URL} />
            <Typography>{selectedReceiver?.name}</Typography>
            <Typography>{selectedReceiver?.email}</Typography>
          </>
        ) : null}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box>
          <TextField
            placeholder="이름으로 검색"
            value={searchValue}
            onChange={handleSearchChange}
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
          {receivers
            .filter(receiver =>
              receiver.name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map(receiver => (
              <MenuItem
                sx={{ width: 200 }}
                key={receiver.workspaceParticipantId}
                onClick={() => handleReceiverClick(receiver)}
              >
                <Avatar src={receiver.imageUrl || TEST_IMAGE_URL} />
                <Typography>{receiver.name}</Typography>
                <Typography>{receiver.email}</Typography>
              </MenuItem>
            ))}
        </Box>
      </Menu>
    </Box>
  )
}

export default SelectReceiverButton
