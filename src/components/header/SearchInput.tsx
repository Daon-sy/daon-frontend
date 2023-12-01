import * as React from "react"
import {
  ClickAwayListener,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import TuneIcon from "@mui/icons-material/Tune"

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "auto",
  marginRight: "auto",
}))

const FilterIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  pointerEvents: "auto",
  cursor: "pointer",
}))

const SearchInput: React.FC = () => {
  const [isFilterBoxOpen, setIsFilterBoxOpen] = React.useState(false)
  const [workspaceFilter, setWorkspaceFilter] = React.useState(false)
  const [projectFilter, setProjectFilter] = React.useState(false)
  const [taskFilter, setTaskFilter] = React.useState(false)

  return (
    <Box>
      <Search
        sx={{
          marginTop: "11px",
          borderStyle: "solid",
          borderWidth: 1,
          backgroundColor: "primary",
        }}
      >
        <Box p={1} display="flex" alignItems="center">
          <TextField
            fullWidth
            autoComplete="off"
            size="small"
            placeholder="검색"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { fontSize: 14, height: 30 },
              disableUnderline: true,
            }}
          />
          <FilterIconWrapper
            onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
          >
            <TuneIcon />
          </FilterIconWrapper>
        </Box>
        {isFilterBoxOpen ? (
          <>
            <Divider />
            <Box
              bgcolor="background.default"
              width="100%"
              zIndex={1000}
              borderRadius={1}
            >
              <ClickAwayListener onClickAway={() => setIsFilterBoxOpen(false)}>
                <Box sx={{ width: "inherit", padding: "0.5rem" }}>
                  <Typography> 카테고리 </Typography>
                  <Stack direction="row" spacing={2} my={1}>
                    <Button
                      color={workspaceFilter ? "secondary" : "primary"}
                      variant={workspaceFilter ? "contained" : "outlined"}
                      onClick={() => setWorkspaceFilter(!workspaceFilter)}
                    >
                      워크스페이스
                    </Button>
                    <Button
                      color={projectFilter ? "secondary" : "primary"}
                      variant={projectFilter ? "contained" : "outlined"}
                      onClick={() => setProjectFilter(!projectFilter)}
                    >
                      프로젝트
                    </Button>
                    <Button
                      color={taskFilter ? "secondary" : "primary"}
                      variant={taskFilter ? "contained" : "outlined"}
                      onClick={() => setTaskFilter(!taskFilter)}
                    >
                      할일
                    </Button>
                  </Stack>
                </Box>
              </ClickAwayListener>
            </Box>
          </>
        ) : null}
      </Search>
    </Box>
  )
}

export default SearchInput
