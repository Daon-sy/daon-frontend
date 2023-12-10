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
    <Box>
      <Box width="100%" mb={1}>
        <TextField
          fullWidth
          autoComplete="off"
          size="small"
          sx={{
            boxSizing: "border-box",
            mx: 2,
            fontSize: 14,
            height: 40,
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
        <Button onClick={handleSearch}>검색</Button>
      </Box>
      {workspaceNotices.map(workspaceNotice => (
        <WorkspaceNoticeCard
          key={workspaceNotice.noticeId}
          workspaceNotice={workspaceNotice}
          onClick={() => onNoticeClick(workspaceNotice.noticeId)}
        />
      ))}
      <Pagination
        count={paginationInfo.totalPage}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  )
}

export default WorkspaceNoticeList
