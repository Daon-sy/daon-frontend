import React from "react"
import { Box, InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"
import WorkspaceNoticeCard from "./WorkspaceNoticeCard"

interface Props {
  workspaceNotices: WorkspaceNoticeDetail[]
  onNoticeClick: (noticeId: number) => void
}

const WorkspaceNoticeList: React.FC<Props> = ({
  workspaceNotices,
  onNoticeClick,
}: Props) => {
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            style: { fontSize: 15 },
          }}
        />
      </Box>
      {workspaceNotices.map(workspaceNotice => (
        <WorkspaceNoticeCard
          key={workspaceNotice.noticeId}
          workspaceNotice={workspaceNotice}
          onClick={() => onNoticeClick(workspaceNotice.noticeId)}
        />
      ))}
    </Box>
  )
}

export default WorkspaceNoticeList
