import React from "react"
import { Outlet } from "react-router-dom"
import Header from "components/header/Header"
import styled from "styled-components"

const DefaultLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f6f7f9;
`

const Main = styled.div`
  background-color: #f6f7f9;
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  box-sizing: border-box;
`

const MemberDefaultHeaderLayout = () => {
  return (
    <DefaultLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </DefaultLayout>
  )
}

export default MemberDefaultHeaderLayout
