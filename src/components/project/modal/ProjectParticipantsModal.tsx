import React from "react"
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material"
import { ProjectParticipant } from "_types/project"
import {
  myProjectParticipantDetailApi,
  projectParticipantListApi,
} from "api/project"
import ColorAvatar from "components/common/ColorAvatar"
import TitleDialog from "components/common/TitleDialog"

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
  title?: string
  workspaceId: number
  projectId: number
  open: boolean
  handleClose: () => void
  handleItemClick: (participant?: ProjectParticipant | undefined) => void
}

const ProjectParticipantsModal = ({
  title = "프로젝트 참여자 목록",
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

  const [myProjectProfile, setMyProjectProfile] =
    React.useState<ProjectParticipant>()

  React.useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const { data: myProjectParticipantDetail } =
          await myProjectParticipantDetailApi(workspaceId, projectId)
        setMyProjectProfile({ ...myProjectParticipantDetail })

        const { data } = await projectParticipantListApi(workspaceId, projectId)
        const { projectParticipants: participants } = data
        setProjectParticipants(
          participants.filter(
            p =>
              p.projectParticipantId !==
              myProjectParticipantDetail.projectParticipantId,
          ),
        )
      }
      fetchData()
    }
  }, [open])

  const cleanUp = () => {
    setFilter("name")
    setFilterText("")
    setProjectParticipants(undefined)
  }

  const modalClose = () => {
    cleanUp()
    handleClose()
  }

  return (
    <TitleDialog
      open={open}
      handleClose={modalClose}
      title={title}
      maxWidth={480}
      height={450}
    >
      <Box
        sx={{
          margin: 1,
          marginTop: 0,
          // height: "100%",
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} justifyContent="end">
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                handleItemClick()
                handleClose()
              }}
            >
              담당자 없음
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                handleItemClick(myProjectProfile)
                handleClose()
              }}
            >
              나에게 할당
            </Button>
          </Stack>
          <Stack mt={1} direction="row" spacing={0.5}>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={filter}
                onChange={(e: SelectChangeEvent) =>
                  setFilter(e.target.value as Filter)
                }
                sx={{ fontSize: 14 }}
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
              inputProps={{ style: { fontSize: 14 } }}
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
            scrollbarWidth: "thin",
          }}
        >
          <Box
            sx={{
              borderStyle: "solid",
              borderColor: "rgb(200,200,200)",
              borderWidth: 1,
              borderRadius: 2,
            }}
          >
            <List sx={{ paddingY: 0 }}>
              {projectParticipants
                ?.filter(participant =>
                  participant[filter]
                    .toUpperCase()
                    .includes(filterText.toUpperCase()),
                )
                .map((participant, index) => (
                  <ListItem
                    divider={index < projectParticipants.length - 1}
                    secondaryAction={
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleItemClick(participant)
                          handleClose()
                        }}
                      >
                        할당하기
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <ColorAvatar
                        id={participant.projectParticipantId}
                        src={participant.imageUrl}
                        sx={{ width: 36, height: 36 }}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Box>
                        <Typography
                          fontSize={14}
                          color="primary"
                          fontWeight={600}
                        >
                          {participant.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography fontSize={12} color="gray">
                          {participant.email}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))}
              {projectParticipants?.length === 0 ? (
                <Typography fontSize={14} p={1}>
                  참여자들이 존재하지 않습니다.
                </Typography>
              ) : null}
              {projectParticipants &&
              projectParticipants.length > 0 &&
              filterText &&
              projectParticipants?.filter(participant =>
                participant[filter]
                  .toUpperCase()
                  .includes(filterText.toUpperCase()),
              ).length === 0 ? (
                <Typography fontSize={14} p={1}>
                  검색 결과가 없습니다.
                </Typography>
              ) : null}
            </List>
          </Box>

          {/* {projectParticipants */}
          {/*  ?.filter(item => */}
          {/*    item[filter].toUpperCase().includes(filterText.toUpperCase()), */}
          {/*  ) */}
          {/*  .map(participant => ( */}
          {/*    <Box */}
          {/*      sx={{ */}
          {/*        display: "flex", */}
          {/*        alignItems: "center", */}
          {/*        borderRadius: 1, */}
          {/*        padding: 1, */}
          {/*        "&:hover": { */}
          {/*          backgroundColor: "rgb(242,242,242)", */}
          {/*        }, */}
          {/*      }} */}
          {/*      onClick={() => { */}
          {/*        handleItemClick(participant) */}
          {/*        handleClose() */}
          {/*      }} */}
          {/*    > */}
          {/*      <Stack */}
          {/*        direction="row" */}
          {/*        spacing={0.5} */}
          {/*        sx={{ display: "flex", alignItems: "center" }} */}
          {/*      > */}
          {/*        <Box> */}
          {/*          <ColorAvatar */}
          {/*            id={participant.projectParticipantId} */}
          {/*            src={participant.imageUrl} */}
          {/*            sx={{ */}
          {/*              width: 36, */}
          {/*              height: 36, */}
          {/*            }} */}
          {/*          /> */}
          {/*        </Box> */}
          {/*        <Box ml={0.5}> */}
          {/*          <Typography fontSize={14} fontWeight={600}> */}
          {/*            {participant.name} */}
          {/*          </Typography> */}
          {/*          <Typography fontSize={12} color="gray"> */}
          {/*            {participant.email} */}
          {/*          </Typography> */}
          {/*        </Box> */}
          {/*      </Stack> */}
          {/*    </Box> */}
          {/*  ))} */}
        </Box>
      </Box>
    </TitleDialog>
  )
}

export default ProjectParticipantsModal
