import React from "react"
import { Box, Typography, Pagination } from "@mui/material"
import { PageInfo } from "api"
import { SearchProjectResult } from "api/search"
import ProjectSearchResult from "components/search/result/ProjectSearchResult"

interface Props {
  pageInfo?: PageInfo
  resultContent?: SearchProjectResult[]
  onPageChange: (page: number) => void
}

const ProjectSearchResultWrapper: React.FC<Props> = ({
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
        {resultContent?.map(projectResult => (
          <ProjectSearchResult project={projectResult} />
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

export default ProjectSearchResultWrapper
