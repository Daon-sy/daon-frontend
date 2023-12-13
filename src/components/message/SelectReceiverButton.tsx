import React from "react"
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { MessageSender, WorkspaceParticipant } from "_types/workspace"
import { workspaceParticipantListApi } from "api/workspace"
import { TEST_IMAGE_URL } from "env"
import SearchIcon from "@mui/icons-material/Search"
import ColorAvatar from "components/common/ColorAvatar"
import NoData from "components/common/NoData"

interface SelectReceiverButtonProps {
  workspaceId: number | undefined
  messageSender: MessageSender | null
  messageReceiver: WorkspaceParticipant | undefined | null
  onReceiverClick: (workspaceParticipantId: number) => void
}

const SelectReceiverButton = ({
  workspaceId,
  messageSender,
  messageReceiver,
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
    } else if (messageReceiver) {
      setSelectedReceiver({
        workspaceParticipantId: messageReceiver.workspaceParticipantId,
        name: messageReceiver.name,
        email: messageReceiver.email,
        imageUrl: messageReceiver.imageUrl,
        role: messageReceiver.role,
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
      <Button
        sx={{
          height: 40,
          width: "100%",
          border: 1,
          borderColor: "lightGray",
          display: "flex",
          justifyContent: "start",
        }}
        onClick={handleClick}
      >
        {selectedReceiver ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{ width: 35, height: 35 }}
              src={selectedReceiver?.imageUrl || TEST_IMAGE_URL}
            />
            <Typography sx={{ ml: 0.5 }}>{selectedReceiver?.name}</Typography>
            <Typography sx={{ ml: 1, fontSize: 14, color: "lightGray" }}>
              {selectedReceiver?.email}
            </Typography>
          </Box>
        ) : null}
      </Button>
      <Menu
        sx={{ height: 400 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ m: 1 }}>
          <TextField
            sx={{ width: "100%" }}
            size="small"
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
              <Tooltip title={receiver.name} disableInteractive>
                <MenuItem
                  sx={{ m: 1, p: 0 }}
                  key={receiver.workspaceParticipantId}
                  onClick={() => handleReceiverClick(receiver)}
                >
                  <Box width="15%">
                    <ColorAvatar
                      sx={{ width: 27, height: 27 }}
                      src={receiver?.imageUrl}
                      id={receiver?.workspaceParticipantId}
                    />
                  </Box>
                  <Box width="40%">
                    <Typography
                      sx={{ fontSize: 15 }}
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {receiver.name}
                    </Typography>
                  </Box>
                  <Box width="45%">
                    <Typography
                      sx={{ pl: 0.5, fontSize: 14, color: "lightGray" }}
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {receiver.email}
                    </Typography>
                  </Box>
                </MenuItem>
              </Tooltip>
            ))}
          {receivers.filter(receiver =>
            receiver.name.toLowerCase().includes(searchValue.toLowerCase()),
          ).length === 0 && (
            <NoData
              content="검색 결과가 없어요"
              width="286.75px"
              height="143.375px"
            />
          )}
        </Box>
      </Menu>
    </Box>
  )
}

export default SelectReceiverButton
