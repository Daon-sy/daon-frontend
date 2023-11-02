import React from "react"
import Title from "components/Common/Title/Title"
import { TEST_IMAGE_URL } from "env"
import "./Home.css"

interface WorkspaceData {
  id: number
  title: string
  image: string
}

interface WorkspaceItemProps {
  title: string
  image: string
}

const dummyData: WorkspaceData[] = [
  {
    id: 1,
    title: "워크스페이스 1",
    image: `${TEST_IMAGE_URL}`,
  },
  {
    id: 2,
    title: "워크스페이스 2",
    image: `${TEST_IMAGE_URL}`,
  },
]

const WorkspaceItem: React.FC<WorkspaceItemProps> = ({ title, image }) => {
  return (
    <div className="ws_info_box">
      <img className="ws_img" src={image} alt={title} />
      <h3 className="ws_title">{title}</h3>
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
                key={workspace.id}
                title={workspace.title}
                image={workspace.image}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
export default Home
