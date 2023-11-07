import React from "react"
import { Outlet } from "react-router-dom"
import Header from "components/header/Header"
import Sidebar from "components/sidebar/Sidebar"
import styled from "styled-components"

const DefaultLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const SideBarWrapper = styled.div`
  width: 15%;
  min-width: 256px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
const Page = styled.div`
  width: 85%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding-left: 32px;
`

const UserLayout = () => {
  return (
    <DefaultLayout>
      <Header />
      <Main>
        <SideBarWrapper>
          <Sidebar />
        </SideBarWrapper>
        <Page>
          <Outlet />
        </Page>
      </Main>
    </DefaultLayout>
  )
}
export default UserLayout