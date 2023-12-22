import React from "react"
import {
  Box,
  InputAdornment,
  TextField,
  Pagination,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import useFetchWorkspaceNoticeList from "hooks/workspace/useFetchWorkspaceNoticeList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNoteSticky, faBullhorn } from "@fortawesome/free-solid-svg-icons"
import { getWorkspaceNoticesStore, getWorkspaceStore } from "store/userStore"
import WorkspaceNoticeCard from "./WorkspaceNoticeCard"

interface Props {
  workspaceId: number
  onNoticeClick: (noticeId: number) => void
}

const WorkspaceNoticeList: React.FC<Props> = ({
  workspaceId,
  onNoticeClick,
}: Props) => {
  const { workspace } = getWorkspaceStore()
  const { workspaceNotices, fetchWorkspaceNoticeList } =
    useFetchWorkspaceNoticeList(workspaceId)
  const { totalPage } = getWorkspaceNoticesStore()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchKeyword, setSearchKeyword] = React.useState("")
  const [selectedNoticeId, setSelectedNoticeId] = React.useState<number | null>(
    null,
  )

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page)
    fetchWorkspaceNoticeList(page - 1, searchKeyword)
  }

  const handleSearch = () => {
    fetchWorkspaceNoticeList(0, searchKeyword)
  }

  const handleNoticeClick = (noticeId: number) => {
    onNoticeClick(noticeId)
    setSelectedNoticeId(noticeId)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
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
        sx={{ display: "flex", justifyContent: "space-evenly" }}
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
          onKeyDown={handleKeyDown}
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
      {workspaceNotices.length === 0 ? (
        <Box
          flexGrow={1}
          mb={1}
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {workspace?.division === "PERSONAL" ? (
            <>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  width: "58px",
                  height: "58px",
                  fontSize: "24px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(226,88,96,0.6)",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <FontAwesomeIcon icon={faNoteSticky} color="#ffffff" />
              </Box>
              <Typography>메모장이 없습니다</Typography>
            </>
          ) : (
            <>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  width: "58px",
                  height: "58px",
                  fontSize: "24px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(226,88,96,0.6)",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <FontAwesomeIcon icon={faBullhorn} color="#ffffff" />
              </Box>
              <Typography>공지사항이 없습니다</Typography>
            </>
          )}
        </Box>
      ) : (
        <Box
          flexGrow={1}
          mb={1}
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {workspaceNotices.map(workspaceNotice => (
            <WorkspaceNoticeCard
              key={workspaceNotice.noticeId}
              workspaceNotice={workspaceNotice}
              onClick={() => handleNoticeClick(workspaceNotice.noticeId)}
              isSelected={selectedNoticeId === workspaceNotice.noticeId}
            />
          ))}
        </Box>
      )}
      {totalPage === 0 ? null : (
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Box>
  )
}

export default WorkspaceNoticeList
