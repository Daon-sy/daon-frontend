import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Box } from "@mui/material"
import {
  getLastWorkspaceStore,
  getMyMemberDetailStore,
  getMyWorkspaceIdStore,
  getProjectsStore,
  getWorkspaceStore,
} from "store/userStore"
import TitleWrapper from "components/common/TitleWrapper"
import Header from "components/header/Header"
import WorkspaceCard from "components/workspace/list/WorkspaceCard"
import useFetchWorkspaceList from "hooks/workspace/useFetchWorkspaceList"
import { getBackdropStore } from "store/backdropStore"

const DefaultLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Home: React.FC = () => {
  const navigate = useNavigate()

  const { clear: clearWorkspaceStore } = getWorkspaceStore()
  const { clear: clearProjectsStore } = getProjectsStore()

  const { backdropOpen, handleBackdropOpen } = getBackdropStore()

  React.useLayoutEffect(() => {
    if (!backdropOpen) handleBackdropOpen()
    clearWorkspaceStore()
    clearProjectsStore()
  }, [])

  const { workspaces } = useFetchWorkspaceList()
  const { myDetail } = getMyMemberDetailStore()
  const { lastConnectedWs } = getLastWorkspaceStore()
  const { myWorkspaceId } = getMyWorkspaceIdStore()

  React.useLayoutEffect(() => {
    if (workspaces.length > 0 && myWorkspaceId) {
      if (!lastConnectedWs || myDetail?.memberId !== lastConnectedWs.memberId) {
        navigate(`/workspace/${myWorkspaceId}`)
        return
      }

      if (
        workspaces
          .map(ws => ws.workspaceId)
          .includes(lastConnectedWs.lastConnectedWsId)
      ) {
        navigate(`/workspace/${lastConnectedWs.lastConnectedWsId}`)
      } else {
        navigate(`/workspace/${myWorkspaceId}`)
      }
    }
  }, [myWorkspaceId, workspaces, lastConnectedWs])

  const uniqueDivisions = Array.from(
    new Set(workspaces.map(item => item.division)),
  )

  if (backdropOpen) return null

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
