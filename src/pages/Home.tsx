import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "components/header/Header"
import TitleWrapper from "components/common/TitleWrapper"
import { Box } from "@mui/material"
import WorkspaceCard from "components/workspace/list/WorkspaceCard"
import { Workspace } from "_types/workspace"
import { workspaceListApi } from "api/workspace"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getTokenStore } from "../store/tokenStore"

const DefaultLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Home: React.FC = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const { setToken } = getTokenStore()

  React.useEffect(() => {
    const testToken = searchParams.get("testToken")
    if (testToken) {
      setToken(testToken)
      navigate("/")
    }
  }, [])

  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await workspaceListApi()
        setWorkspaces(response.data.workspaces)
      } catch (error) {
        console.error("Error fetching workspaces:", error)
      }
    }
    fetchData()
  }, [])

  const uniqueDivisions = Array.from(
    new Set(workspaces.map(item => item.division)),
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
              {workspaces
                .filter(item => item.division === division)
                .map(workspace => (
                  <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
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
