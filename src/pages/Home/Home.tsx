import React from "react"
import Title from "components/Common/Title/Title"
import { TEST_IMAGE_URL } from "env"
import "./Home.css"

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
    <div className="ws_info_box">
      <img className="ws_img" src={imgUrl} alt={title} />
      <h3 className="ws_title">{title}</h3>
      <p className="ws_division">{division}</p>
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <Title title="HOME" subtitle="워크스페이스 목록" />
      <section>
        <ul className="ws_list_wrapper">
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
        </ul>
      </section>
    </>
  )
}
export default Home
