import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "components/sidebar/Sidebar"
import styled from "styled-components"
import TaskDetailModal from "components/task/modal/TaskDetailModal"
import { getTaskDetailViewStore } from "store/taskStore"

const SideBarWrapper = styled.div`
  background-color: white;
  box-sizing: border-box;
  width: 15%;
  min-width: 256px;
  height: 100%;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  top: -10px;
  height: calc(100vh - 70px);
`
const Page = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 90px);
  margin-left: 32px;
  margin-right: 32px;
  background-color: #f6f7f9;
  box-sizing: border-box;
  padding-top: 12px;
`

const MemberSidebarLayout = () => {
  const { taskDetailParam, setTaskDetailParam, clear } =
    getTaskDetailViewStore()
  const { state: locSate } = useLocation()
  React.useLayoutEffect(() => {
    if (locSate && locSate.task) {
      const { workspaceId, projectId, boardId, taskId } = locSate.task
      setTaskDetailParam({
        workspaceId,
        projectId,
        boardId,
        taskId,
      })
    }
  }, [locSate])

  return (
    <>
      <SideBarWrapper>
        <Sidebar />
      </SideBarWrapper>
      <Page>
        <Outlet />
        {taskDetailParam ? (
          <TaskDetailModal
            workspaceId={taskDetailParam.workspaceId}
            projectId={taskDetailParam.projectId}
            boardId={taskDetailParam.boardId}
            taskId={taskDetailParam.taskId}
            open={!!taskDetailParam}
            handleClose={clear}
          />
        ) : null}
      </Page>
    </>
  )
}

export default MemberSidebarLayout
