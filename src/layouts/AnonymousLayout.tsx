import React from "react"
import { Outlet } from "react-router-dom"
import AnonymousHeader from "components/header/AnonymousHeader"
import styled from "styled-components"

const DefaultLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Main = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  overflow: auto;
  box-sizing: border-box;
`
const AnonymousPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  top: 0;
`

const AnonymousLayout = () => {
  return (
    <DefaultLayout>
      <AnonymousHeader />
      <Main>
        <AnonymousPage>
          <Outlet />
        </AnonymousPage>
      </Main>
    </DefaultLayout>
  )
}
export default AnonymousLayout
