import React from "react"
import Header from "components/Header/Header"
import { Outlet } from "react-router-dom"
import "./Layout.css"
import Sidebar from "components/Sidebar/Sidebar"

const UserLayout = () => {
  return (
    <div className="default_layout">
      <Header />
      <main className="main">
        <div className="side_bar">
          <Sidebar />
        </div>
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
export default UserLayout
