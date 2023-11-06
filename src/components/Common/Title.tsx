import * as React from "react"
import styled from "styled-components"

const TitleBox = styled.div`
  margin: 32px 0 32px 0;
`

const MainTitle = styled.p`
  font-size: 36px;
  font-weight: bold;
`

const SubTitle = styled.h2`
  font-size: 20px;
`

const Title = (props: { title: string; subtitle: string }) => {
  const { title, subtitle } = props

  return (
    <TitleBox className="title_box">
      <MainTitle className="sub_title">{subtitle}</MainTitle>
      <SubTitle className="main_title">{title}</SubTitle>
    </TitleBox>
  )
}

export default Title
