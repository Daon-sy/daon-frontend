import React from "react"
import {
  ClickAwayListener,
  Divider,
  InputAdornment,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import useSearch from "hooks/search/useSearch"
import useSearchWorkspaces from "hooks/search/useSearchWorkspaces"
import useSearchProjects from "hooks/search/useSearchProjects"
import useSearchTasks from "hooks/search/useSearchTasks"
import SearchResultNav from "components/search/SearchResultNav"
import SearchResultWrapper from "components/search/SearchResultWrapper"
import WorkspaceSearchResultWrapper from "components/search/WorkspaceSearchResultWrapper"
import ProjectSearchResultWrapper from "components/search/ProjectSearchResultWrapper"
import TaskSearchResultWrapper from "components/search/TaskSearchResultWrapper"

const SearchInput: React.FC = () => {
  const [keyword, setKeyword] = React.useState("")
  const [isFilterBoxOpen, setIsFilterBoxOpen] = React.useState(false)

  const { searchResult, fetch: search, isFetching: searching } = useSearch()
  const {
    pageInfo: wsPageInfo,
    resultContent: wsResultContent,
    fetch: wsFetch,
    clear: wsClear,
  } = useSearchWorkspaces()
  const {
    pageInfo: pjPageInfo,
    resultContent: pjResultContent,
    fetch: pjFetch,
    clear: pjClear,
  } = useSearchProjects()
  const {
    pageInfo: tskPageInfo,
    resultContent: tskResultContent,
    fetch: tskFetch,
    clear: tskClear,
  } = useSearchTasks()

  const [pageNum, setPageNum] = React.useState(0)
  const prevPage = () => setPageNum(0)
  const renderPage = () => {
    switch (pageNum) {
      case 1: {
        return (
          <SearchResultNav
            title="워크스페이스 검색"
            onBackButtonClick={prevPage}
          >
            <WorkspaceSearchResultWrapper
              pageInfo={wsPageInfo}
              resultContent={wsResultContent}
              onPageChange={page => {
                wsFetch({
                  keyword,
                  pageParams: { page, size: wsPageInfo?.pageSize || 5 },
                })
              }}
            />
          </SearchResultNav>
        )
      }
      case 2: {
        return (
          <SearchResultNav title="프로젝트 검색" onBackButtonClick={prevPage}>
            <ProjectSearchResultWrapper
              pageInfo={pjPageInfo}
              resultContent={pjResultContent}
              onPageChange={page => {
                pjFetch({
                  keyword,
                  pageParams: { page, size: pjPageInfo?.pageSize || 5 },
                })
              }}
            />
          </SearchResultNav>
        )
      }
      case 3: {
        return (
          <SearchResultNav title="할 일 검색" onBackButtonClick={prevPage}>
            <TaskSearchResultWrapper
              pageInfo={tskPageInfo}
              resultContent={tskResultContent}
              onPageChange={page => {
                tskFetch({
                  keyword,
                  pageParams: { page, size: tskPageInfo?.pageSize || 5 },
                })
              }}
            />
          </SearchResultNav>
        )
      }
      default:
        return searchResult ? (
          <SearchResultWrapper
            searchResult={searchResult}
            setPage={setPageNum}
          />
        ) : null
    }
  }

  const closeSearch = () => {
    setIsFilterBoxOpen(false)
  }

  React.useEffect(() => {
    if (searchResult) {
      setIsFilterBoxOpen(true)
    }
  }, [searchResult])

  const searchKeyword = () => {
    wsClear()
    pjClear()
    tskClear()
    search(keyword)
  }
  return (
    <Box>
      <ClickAwayListener onClickAway={closeSearch}>
        <Box
          sx={{
            marginTop: "11px",
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 1,
            borderColor: "#e0e0e0",
            position: "relative",
            zIndex: 100,
            width: 500,
          }}
        >
          <Box p={1} display="flex" alignItems="center">
            <TextField
              fullWidth
              autoComplete="off"
              size="small"
              placeholder="검색"
              variant="standard"
              onClick={() =>
                keyword && searchResult && setIsFilterBoxOpen(true)
              }
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && searchKeyword()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: 14,
                  ".MuiInputBase-input": { padding: 0 },
                },
                disableUnderline: true,
                endAdornment: (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      searchKeyword()
                    }}
                    sx={{ ml: 1 }}
                  >
                    검색
                  </Button>
                ),
              }}
            />
          </Box>
          {isFilterBoxOpen ? (
            <Box bgcolor="#FFFFFF" width="inherit" borderRadius={1}>
              {searching ? (
                <CircularProgress />
              ) : (
                <>
                  <Divider />
                  <Box
                    sx={{
                      p: 1,
                      maxHeight: 450,
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    {renderPage()}
                  </Box>
                </>
              )}
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Box>
  )
}

export default SearchInput
