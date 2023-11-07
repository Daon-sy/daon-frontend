import React from "react"
import { Outlet } from "react-router-dom"
import AnonymousHeader from "components/header/AnonymousHeader"
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
const AnonymousPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
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
