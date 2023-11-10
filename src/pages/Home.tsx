import React from "react"
import { TEST_IMAGE_URL } from "env"
import styled from "styled-components"
import Header from "components/header/Header"
import TitleWrapper from "components/workspace/list/TitleWrapper"
import { Box } from "@mui/material"
import WorkspaceCard from "components/workspace/list/WorkspaceCard"

const DefaultLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
interface WorkspaceData {
  workspaceId: number
  title: string
  imgUrl: string
  division: string
}

const dummyData: WorkspaceData[] = [
  {
    workspaceId: 1,
    title: "워크스페이스 1",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "개인",
  },
  {
    workspaceId: 2,
    title: "워크스페이스 2",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "그룹",
  },
  {
    workspaceId: 3,
    title: "워크스페이스 3",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "그룹",
  },
  {
    workspaceId: 4,
    title: "워크스페이스 4",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "그룹",
  },
  {
    workspaceId: 5,
    title: "워크스페이스 5",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "그룹",
  },
  {
    workspaceId: 6,
    title: "워크스페이스 6",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "그룹",
  },
]

const Home: React.FC = () => {
  const uniqueDivisions = Array.from(
    new Set(dummyData.map(item => item.division)),
  )

  return (
    <DefaultLayout>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Box>
          <Box
            component="div"
            sx={{
              fontSize: "32px",
            }}
          >
            워크스페이스 목록
          </Box>

          {uniqueDivisions.map(division => (
            <TitleWrapper key={division} title={division}>
              {dummyData
                .filter(item => item.division === division)
                .map(workspace => (
                  <WorkspaceCard
                    key={workspace.workspaceId}
                    wsTitle={workspace.title}
                    imgUrl={workspace.imgUrl}
                    division={workspace.division}
                    to={`/workspace/${String(workspace.workspaceId)}`}
                  />
                ))}
            </TitleWrapper>
          ))}
        </Box>
      </Box>
    </DefaultLayout>
  )
}

export default Home
