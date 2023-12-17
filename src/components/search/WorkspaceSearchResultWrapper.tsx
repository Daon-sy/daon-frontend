import React from "react"
import { Box, Typography, Pagination } from "@mui/material"
import { PageInfo } from "api"
import { SearchWorkspaceResult } from "api/search"
import WorkspaceSearchResult from "components/search/result/WorkspaceSearchResult"

interface Props {
  pageInfo?: PageInfo
  resultContent?: SearchWorkspaceResult[]
  onPageChange: (page: number) => void
}

const WorkspaceSearchResultWrapper: React.FC<Props> = ({
  pageInfo,
  resultContent,
  onPageChange,
}) => {
  React.useEffect(() => {
    if (!resultContent) onPageChange(0)
  }, [])

  return (
    <Box>
      <Box>
        {resultContent && resultContent.length > 0 ? null : (
          <Typography fontSize={14}>검색 결과가 없습니다.</Typography>
        )}
        {resultContent?.map(workspaceResult => (
          <WorkspaceSearchResult workspace={workspaceResult} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center" mt={1 / 4}>
        <Pagination
          count={pageInfo?.totalPage || 1}
          size="small"
          page={(pageInfo?.pageNumber || 0) + 1}
          onChange={(e, value) => onPageChange(value - 1)}
        />
      </Box>
    </Box>
  )
}

export default WorkspaceSearchResultWrapper
