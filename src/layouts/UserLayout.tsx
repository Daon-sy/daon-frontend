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
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  box-sizing: border-box;
  border: 3px solid red;
`

const SideBarWrapper = styled.div`
  box-sizing: border-box;
  width: 15%;
  min-width: 256px;
  height: 100%;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
`
const Page = styled.div`
  width: 85%;
  height: 100%;
  padding-left: 32px;
  padding-right: 32px;
  min-width: 1184px;
  background-color: #f6f7f9;
  margin-top: 6px;
  padding-top: 18px;
  box-sizing: border-box;
`

const UserLayout = () => {
  return (
    <DefaultLayout>
      <Header />
      <Main>
        <SideBarWrapper>
          <Sidebar />
        </SideBarWrapper>
        {/* <Page>
          <Outlet />
        </Page> */}
      </Main>
    </DefaultLayout>
  )
}
export default UserLayout
