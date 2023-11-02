import * as React from "react"
import "./Title.css"

const Title = (props: { title: string; subtitle: string }) => {
  const { title, subtitle } = props

  return (
    <div className="title_box">
      <p className="sub_title">{subtitle}</p>
      <h2 className="main_title">{title}</h2>
    </div>
  )
}

export default Title
