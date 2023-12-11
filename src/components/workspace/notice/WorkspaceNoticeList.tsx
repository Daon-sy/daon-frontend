// WorkspaceNoticeList.tsx
import React from "react"
import {
  Box,
  InputAdornment,
  TextField,
  Pagination,
  Button,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import useFetchWorkspaceNoticeList from "hooks/workspace/useFetchWorkspaceNoticeList"
import WorkspaceNoticeCard from "./WorkspaceNoticeCard"

interface Props {
  workspaceId: number
  onNoticeClick: (noticeId: number) => void
}

const WorkspaceNoticeList: React.FC<Props> = ({
  workspaceId,
  onNoticeClick,
}: Props) => {
  const { workspaceNotices, paginationInfo, fetchWorkspaceNoticeList } =
    useFetchWorkspaceNoticeList(workspaceId)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchKeyword, setSearchKeyword] = React.useState("")

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page)
    fetchWorkspaceNoticeList(page - 1, searchKeyword)
  }

  const handleSearch = () => {
    fetchWorkspaceNoticeList(currentPage - 1, searchKeyword)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        pr: 1.5,
      }}
    >
      <Box
        width="100%"
        mb={1}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          fullWidth
          autoComplete="off"
          size="small"
          sx={{
            width: "80%",
            boxSizing: "border-box",
            fontSize: 14,
            height: 40,
            bgcolor: "#f6f7f9",
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              border: "none",
            },
          }}
          placeholder="공지사항 검색"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            style: { fontSize: 15 },
          }}
        />
        <Box
          component="button"
          onClick={handleSearch}
          sx={{
            border: "1px solid #838383",
            width: "15%",
            height: "38px",
            cursor: "pointer",
            bgcolor: "white",
            color: "#838383",
            borderRadius: 1,
          }}
        >
          검색
        </Box>
      </Box>
      <Box border={1} flexGrow={1} mb={1} width="100%">
        {workspaceNotices.map(workspaceNotice => (
          <WorkspaceNoticeCard
            key={workspaceNotice.noticeId}
            workspaceNotice={workspaceNotice}
            onClick={() => onNoticeClick(workspaceNotice.noticeId)}
          />
        ))}
      </Box>
      <Pagination
        count={paginationInfo.totalPage}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  )
}

export default WorkspaceNoticeList
