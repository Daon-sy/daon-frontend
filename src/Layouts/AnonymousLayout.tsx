import React from "react"
import { Outlet } from "react-router-dom"
import "Layouts/Layout.css"
import AnonymousHeader from "components/Header/AnonymousHeader"

const AnonymousLayout = () => {
  return (
    <div className="default_layout">
      <AnonymousHeader />
      <main className="main">
        <div className="anonymous_page">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
export default AnonymousLayout
