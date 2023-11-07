import * as React from "react"
import styled from "styled-components"

const MytaskWrapper = styled.section`
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid black;
  padding: 16px 0;
  position: relative;
`

const MytaskTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`

const MytaskListWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const MytaskList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const MytaskIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: black;
`

const MytaskName = styled.p`
  margin-top: 4px;
  font-size: 12px;
`

const Mytask: React.FC = () => {
  return (
    <MytaskWrapper>
      <MytaskTitle>나의 할 일 모음</MytaskTitle>
      <MytaskListWrapper>
        <MytaskList>
          <MytaskIcon />
          <MytaskName>즐겨찾기</MytaskName>
        </MytaskList>
        <MytaskList>
          <MytaskIcon />
          <MytaskName>진행상태</MytaskName>
        </MytaskList>
      </MytaskListWrapper>
    </MytaskWrapper>
  )
}

export default Mytask
