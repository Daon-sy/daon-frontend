import React from "react"
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { SearchResponseBody } from "api/search"
import WorkspaceSearchResult from "components/search/result/WorkspaceSearchResult"
import ProjectSearchResult from "components/search/result/ProjectSearchResult"
import TaskSearchResult from "components/search/result/TaskSearchResult"

const StyledMoreButton = styled(Button)<ButtonProps>(() => ({
  p: 0,
  marginLeft: 10,
  fontSize: 12,
  minWidth: 50,
  height: 20,
}))

const MoreButton = ({ onClick }: { onClick: () => void }) => (
  <StyledMoreButton
    disableElevation
    size="small"
    variant="contained"
    onClick={onClick}
    sx={{ fontWeight: 500 }}
  >
    더보기
  </StyledMoreButton>
)

interface Props {
  searchResult: SearchResponseBody
  setPage: (page: number) => void
}

const SearchResultWrapper: React.FC<Props> = ({ searchResult, setPage }) => {
  const setWorkspaceSearchPage = () => setPage(1)
  const setProjectSearchPage = () => setPage(2)
  const setTaskSearchPage = () => setPage(3)

  return (
    <Box>
      {!searchResult ||
      (searchResult.workspaces.totalCount === 0 &&
        searchResult.projects.totalCount === 0 &&
        searchResult.tasks.totalCount === 0) ? (
        <Box>
          <Typography fontSize={14}>검색 결과가 없습니다.</Typography>
        </Box>
      ) : (
        <Stack spacing={1} divider={<Divider />}>
          <Box>
            {searchResult.workspaces.totalCount === 0 ? (
              <Typography fontSize={14}>워크스페이스 검색 결과 없음</Typography>
            ) : (
              <>
                <Box display="flex" alignItems="center">
                  <Typography
                    fontSize={15}
                    color="primary"
                    fontWeight={500}
                    flexGrow={1}
                  >
                    워크스페이스
                  </Typography>
                  {!searchResult.workspaces.last ? (
                    <MoreButton onClick={setWorkspaceSearchPage} />
                  ) : null}
                </Box>
                <Stack mt={1} spacing={1 / 2}>
                  {searchResult.workspaces.content.map(workspace => (
                    <WorkspaceSearchResult workspace={workspace} />
                  ))}
                </Stack>
              </>
            )}
          </Box>
          <Box>
            {searchResult.projects.totalCount === 0 ? (
              <Typography fontSize={14}>프로젝트 검색 결과 없음</Typography>
            ) : (
              <>
                <Box display="flex" alignItems="center">
                  <Typography
                    fontSize={15}
                    color="primary"
                    fontWeight={500}
                    flexGrow={1}
                  >
                    프로젝트
                  </Typography>
                  {!searchResult.projects.last ? (
                    <MoreButton onClick={setProjectSearchPage} />
                  ) : null}
                </Box>
                <Stack spacing={1 / 2}>
                  {searchResult.projects.content.map(project => (
                    <ProjectSearchResult project={project} />
                  ))}
                </Stack>
              </>
            )}
          </Box>
          <Box>
            {searchResult.tasks.totalCount === 0 ? (
              <Typography fontSize={14}>할 일 검색 결과 없음</Typography>
            ) : (
              <>
                <Box display="flex" alignItems="center">
                  <Typography
                    fontSize={15}
                    color="primary"
                    fontWeight={500}
                    flexGrow={1}
                  >
                    할 일
                  </Typography>
                  {!searchResult.tasks.last ? (
                    <MoreButton onClick={setTaskSearchPage} />
                  ) : null}
                </Box>
                <Stack spacing={1 / 2}>
                  {searchResult.tasks.content.map(task => (
                    <TaskSearchResult task={task} />
                  ))}
                </Stack>
              </>
            )}
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default SearchResultWrapper
