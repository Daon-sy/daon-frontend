import React from "react"
import { Outlet } from "react-router-dom"
import Header from "components/header/Header"
import Sidebar from "components/sidebar/Sidebar"
import styled from "styled-components"

const DefaultLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const Main = styled.div`
  background-color: #f6f7f9;
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  box-sizing: border-box;
`

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
  padding-right: 32px;
  min-width: 1184px;
  background-color: #f6f7f9;
  box-sizing: border-box;
  padding-top: 12px;
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
