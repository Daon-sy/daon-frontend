import React from "react"
import StarIcon from "@mui/icons-material/Star"
import AssignmentIcon from "@mui/icons-material/Assignment"
import Menu from "components/common/Menu"

const SidebarMenu: React.FC = () => {
  const menus = [
    {
      title: "내 할일 모아보기",
      list: [
        {
          link: "/workspace/1/task/bookmark",
          listValue: "즐겨찾기",
          icon: StarIcon,
        },
        {
          link: "/workspace/1/task/my",
          listValue: "내 할일",
          icon: AssignmentIcon,
        },
      ],
    },
    {
      title: "프로젝트 목록",
      isProjectCreated: true,
      list: [
        {
          link: "/workspace/1/project/1",
          listValue: "프로젝트1",
        },
        {
          link: "/workspace/1/project/2",
          listValue: "프로젝트2",
        },
        {
          link: "/workspace/1/project/3",
          listValue: "프로젝트3",
        },
      ],
    },
  ]

  return (
    <>
      {menus.map(menu => (
        <Menu
          key={menu.title}
          list={menu.list}
          isProjectCreated={menu.isProjectCreated}
          title={menu.title}
        />
      ))}
    </>
  )
}

export default SidebarMenu
