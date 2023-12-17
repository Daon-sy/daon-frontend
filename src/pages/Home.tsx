import React from "react"
import { useNavigate } from "react-router-dom"
import {
  getLastWorkspaceStore,
  getMyMemberDetailStore,
  getMyWorkspaceIdStore,
  getProjectsStore,
  getWorkspaceStore,
} from "store/userStore"
import useFetchWorkspaceList from "hooks/workspace/useFetchWorkspaceList"
import { Box, CircularProgress } from "@mui/material"

const Home: React.FC = () => {
  const navigate = useNavigate()

  const { clear: clearWorkspaceStore } = getWorkspaceStore()
  const { clear: clearProjectsStore } = getProjectsStore()

  React.useLayoutEffect(() => {
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

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <CircularProgress color="primary" />
    </Box>
  )
}

export default Home
