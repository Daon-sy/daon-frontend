import React from "react"
import Header from "components/Header/Header"
import { Outlet } from "react-router-dom"
import "./Layout.css"

const UserLayout = () => {
  return (
    <div className="default-layout">
      <Header />
      <main className="main">
        <div className="side-nav" />
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
export default UserLayout
