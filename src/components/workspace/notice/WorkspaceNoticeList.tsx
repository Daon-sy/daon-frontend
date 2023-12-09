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
  const [workspaceNoticeFilterKeyword, setWorkspaceNoticeFilterKeyword] =
    React.useState("")

  const searchWorkspaceNotices = workspaceNotices.map(workspaceNotice => ({
    workspaceNotice,
    listValue: workspaceNotice.title,
  }))
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkspaceNoticeFilterKeyword(e.target.value)
          }
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
      {searchWorkspaceNotices
        .filter(workspaceNotice =>
          workspaceNotice.listValue.includes(workspaceNoticeFilterKeyword),
        )
        .map(list => (
          <WorkspaceNoticeCard
            key={list.workspaceNotice.noticeId}
            workspaceNotice={list.workspaceNotice}
            onClick={() => onNoticeClick(list.workspaceNotice.noticeId)}
          />
        ))}
    </Box>
  )
}

export default WorkspaceNoticeList
