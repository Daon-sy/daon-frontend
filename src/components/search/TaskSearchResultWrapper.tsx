import React from "react"
import { Box, Typography, Pagination } from "@mui/material"
import { PageInfo } from "api"
import { SearchTaskResult } from "api/search"
import TaskSearchResult from "components/search/result/TaskSearchResult"

interface Props {
  pageInfo?: PageInfo
  resultContent?: SearchTaskResult[]
  onPageChange: (page: number) => void
}

const TaskSearchResultWrapper: React.FC<Props> = ({
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
        {resultContent?.map(taskResult => (
          <TaskSearchResult task={taskResult} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
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

export default TaskSearchResultWrapper
