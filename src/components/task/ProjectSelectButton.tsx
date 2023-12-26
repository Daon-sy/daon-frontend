/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import {
  Box,
  Button,
  Divider,
  Fade,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DvrIcon from "@mui/icons-material/Dvr"
import { getProjectsStore, getWorkspaceStore } from "store/userStore"
import { Project } from "_types/project"
import { useTitleDialog } from "components/common/TitleDialog"
import CreateProject from "components/project/CreateProject"
import SearchIcon from "@mui/icons-material/Search"
import useCreateProject from "hooks/project/useCreateProject"
import useFetchProjectList from "hooks/project/useFetchProjectList"

interface Props {
  currentProjectId?: number
  handleProjectSelect: (project?: Project) => void
}

const ProjectSelectButton: React.FC<Props> = ({
  handleProjectSelect,
  currentProjectId,
}: Props) => {
  const { projects } = getProjectsStore()

  const [selectedProject, setSelectedProject] = React.useState<
    Project | undefined
  >(projects.find(p => p.projectId === currentProjectId))
  React.useEffect(() => {
    handleProjectSelect(selectedProject)
  }, [selectedProject])

  const {
    TitleDialog,
    open: openCreateProjectDialog,
    close: closeCreateProjectDialog,
  } = useTitleDialog()

  const pjSearchFieldRef = React.useRef<HTMLInputElement | null>(null)
  const [pjFilterKeyword, setPjFilterKeyword] = React.useState("")

  const { workspace } = getWorkspaceStore()
  const { fetchProjectList } = useFetchProjectList(
    workspace?.workspaceId || 0,
    true,
  )
  const { fetch: createProject } = useCreateProject({
    workspaceId: workspace?.workspaceId || 0,
    navigateOnCreateSuccess: false,
  })
  const [projectAddField, setProjectAddField] = React.useState(false)
  const [projectNameToAdd, setProjectNameToAdd] = React.useState("")

  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    if (btnRef) setAnchorEl(btnRef.current)
  }, [btnRef])

  const open = () => setIsMenuOpen(true)
  const close = () => setIsMenuOpen(false)
  React.useEffect(() => {
    if (!isMenuOpen) {
      setProjectNameToAdd("")
      setProjectAddField(false)
      setPjFilterKeyword("")
    }
  }, [isMenuOpen])

  React.useEffect(() => {
    if (anchorEl && pjSearchFieldRef) {
      pjSearchFieldRef.current?.click()
    }
  }, [anchorEl, pjSearchFieldRef])

  return (
    <Box width="100%" position="relative">
      <Button
        ref={btnRef}
        fullWidth
        aria-controls={isMenuOpen ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={open}
        // variant="contained"
        variant="outlined"
        disableElevation
        color="primary"
        sx={{
          px: 1,
          display: "flex",
          alignItems: "center",
          borderColor: "#bdbdbd",
        }}
        size="medium"
      >
        <Box display="flex" alignItems="center" width={90}>
          <DvrIcon />
          <Typography ml={1} fontSize={14} fontWeight={500}>
            프로젝트
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 6 / 4, borderColor: "#bdbdbd", borderWidth: 1 / 2 }}
        />
        <Typography
          flexGrow={1}
          fontSize={14}
          fontWeight={500}
          textAlign="start"
          sx={{ color: selectedProject ? "primary" : "#bdbdbd" }}
        >
          {selectedProject ? selectedProject.title : "선택"}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
        open={isMenuOpen}
        onClose={close}
        TransitionComponent={Fade}
        sx={{ left: -1 }}
        slotProps={{
          paper: {
            sx: {
              width: anchorEl && anchorEl.offsetWidth + 1,
              mt: 0.5,
              maxHeight: 350,
              p: 0,
              "& .MuiList-root": { p: 0 },
            },
          },
        }}
      >
        <Box position="sticky" top={0} bgcolor="white" zIndex={1}>
          <Box px={1} pt={1}>
            <TextField
              fullWidth
              autoFocus
              autoComplete="off"
              size="small"
              sx={{
                fontSize: 14,
                height: 40,
              }}
              placeholder="프로젝트 검색"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPjFilterKeyword(e.target.value)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                ref: pjSearchFieldRef,
                style: { fontSize: 14 },
              }}
            />
          </Box>
        </Box>
        <Box>
          {projects
            .filter(pj =>
              pj.title.toUpperCase().includes(pjFilterKeyword.toUpperCase()),
            )
            .map(item => (
              <MenuItem
                key={item.projectId}
                dense
                onClick={() => {
                  setSelectedProject(item)
                  close()
                }}
                disabled={item.projectId === selectedProject?.projectId}
              >
                <Box display="flex" alignItems="center" overflow="hidden">
                  <Typography
                    variant="button"
                    fontSize={14}
                    textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.title}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          {projects.filter(pj =>
            pj.title.toUpperCase().includes(pjFilterKeyword.toUpperCase()),
          ).length <= 0 ? (
            <MenuItem dense disabled>
              <Box display="flex" alignItems="center" overflow="hidden">
                <Typography
                  variant="button"
                  fontSize={14}
                  textAlign="center"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  프로젝트가 없습니다
                </Typography>
              </Box>
            </MenuItem>
          ) : null}
        </Box>
        {/* <Box p={1}> */}
        {/*  {projectAddField ? ( */}
        {/*    <TextField */}
        {/*      fullWidth */}
        {/*      autoFocus */}
        {/*      value={projectNameToAdd} */}
        {/*      autoComplete="off" */}
        {/*      size="small" */}
        {/*      sx={{ */}
        {/*        fontSize: 14, */}
        {/*        height: 40, */}
        {/*      }} */}
        {/*      placeholder="Enter 입력시 등록" */}
        {/*      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { */}
        {/*        setProjectNameToAdd(e.target.value) */}
        {/*      }} */}
        {/*      InputProps={{ */}
        {/*        style: { fontSize: 14 }, */}
        {/*      }} */}
        {/*      onKeyDown={e => { */}
        {/*        if (e.key === "Enter") { */}
        {/*          createProject({ title: projectNameToAdd }) */}
        {/*          setProjectAddField(false) */}
        {/*          setProjectNameToAdd("") */}
        {/*        } */}
        {/*      }} */}
        {/*    /> */}
        {/*  ) : ( */}
        {/*    <Button */}
        {/*      fullWidth */}
        {/*      variant="outlined" */}
        {/*      size="small" */}
        {/*      sx={{ fontSize: 14 }} */}
        {/*      onClick={() => { */}
        {/*        setProjectAddField(true) */}
        {/*      }} */}
        {/*    > */}
        {/*      프로젝트 추가 */}
        {/*    </Button> */}
        {/*  )} */}
        {/* </Box> */}
      </Menu>
      <TitleDialog title="프로젝트 생성" maxWidth="sm">
        <CreateProject onCancelButtonClick={closeCreateProjectDialog} />
      </TitleDialog>
    </Box>
  )
}

export default ProjectSelectButton
