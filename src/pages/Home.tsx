import React from "react"
import Title from "components/common/Title"
import { TEST_IMAGE_URL } from "env"
import styled from "styled-components"
import Header from "components/header/Header"

const DefaultLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const WorkspaceInfoWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  margin: 8px;
`

const WorkspaceTitle = styled.h3`
  width: 60%;
  height: 20%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
`

const WorkspaceImg = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  border: 1px solid black;
  text-align: center;
  font-size: 80px;
  margin: 0 8px;
`

const WorkpaceDivision = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  margin: 4px;
  background-color: rgba(0, 0, 0, 0.5);
`

const WorkspaceListWrapper = styled.ul`
  display: flex;
`

interface WorkspaceData {
  workspaceId: number
  title: string
  imgUrl: string
  division: string
}

interface WorkspaceItemProps {
  title: string
  imgUrl: string
  division: string
}

const dummyData: WorkspaceData[] = [
  {
    workspaceId: 1,
    title: "워크스페이스 1",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "개인",
  },
  {
    workspaceId: 2,
    title: "워크스페이스 2",
    imgUrl: `${TEST_IMAGE_URL}`,
    division: "그룹",
  },
]

const WorkspaceItem: React.FC<WorkspaceItemProps> = ({
  title,
  imgUrl,
  division,
}) => {
  return (
    <WorkspaceInfoWrapper>
      <WorkspaceImg src={imgUrl} alt={title} />
      <WorkspaceTitle className="ws_title">{title}</WorkspaceTitle>
      <WorkpaceDivision>{division}</WorkpaceDivision>
    </WorkspaceInfoWrapper>
  )
}

const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <Header />
      <Title title="HOME" subtitle="워크스페이스 목록" />
      <section>
        <WorkspaceListWrapper>
          {dummyData.map(workspace => (
            <li>
              <WorkspaceItem
                key={workspace.workspaceId}
                title={workspace.title}
                imgUrl={workspace.imgUrl}
                division={workspace.division}
              />
            </li>
          ))}
        </WorkspaceListWrapper>
      </section>
    </DefaultLayout>
  )
}
export default Home
