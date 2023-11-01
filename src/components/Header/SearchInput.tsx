import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import SettingsIcon from "@mui/icons-material/Settings"
import Menu from "@mui/material/Menu"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const SearchIconWrapper2 = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  right: 0,
  top: 0,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
  width: "95%",
}))

const SearchInput = () => {
  const [anchorElSearch, setAnchorElSearch] =
    React.useState<null | HTMLElement>(null)

  const handleOpenSearchMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSearch(event.currentTarget.parentElement)
  }

  const handleCloseSearchMenu = () => {
    setAnchorElSearch(null)
  }

  // 검색
  const [state, setState] = React.useState({
    title: false,
    startDate: false,
    endDate: false,
    responsibility: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
  }

  const { title, startDate, endDate, responsibility } = state

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
        <SearchIconWrapper2 onClick={handleOpenSearchMenu}>
          <SettingsIcon />
        </SearchIconWrapper2>
        <Menu
          sx={{
            mt: "40px",
            width: "inherit",
          }}
          id="menu-appbar"
          anchorEl={anchorElSearch}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={Boolean(anchorElSearch)}
          onClose={handleCloseSearchMenu}
        >
          <Box sx={{ width: "inherit", margin: "0.5rem" }}>
            <Typography> 카테고리 </Typography>
            <Stack direction="row" spacing={2} my={1}>
              <Button variant="outlined">워크스페이스</Button>
              <Button variant="outlined">프로젝트</Button>
              <Button variant="outlined">할일</Button>
            </Stack>
            <FormControl sx={{ mt: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">검색옵션</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={title}
                      onChange={handleChange}
                      name="title"
                    />
                  }
                  label="제목"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={startDate}
                      onChange={handleChange}
                      name="startDate"
                    />
                  }
                  label="시작일"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={endDate}
                      onChange={handleChange}
                      name="endDate"
                    />
                  }
                  label="마감일"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={responsibility}
                      onChange={handleChange}
                      name="responsibility"
                    />
                  }
                  label="담당자"
                />
              </FormGroup>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                py: 2,
              }}
            >
              <Button variant="outlined">취소</Button>
              <Button variant="outlined">검색</Button>
            </Box>
          </Box>
        </Menu>
      </Search>
    </Box>
  )
}

export default SearchInput
